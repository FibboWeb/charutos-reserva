/**
 * Ordena toda a collection (disponíveis primeiro, esgotados por último) respeitando a paginação.
 * Requer paginação numérica, URL sem filtros e sort_by igual ao padrão da collection.
 */
(function () {
  var running = false;

  function shouldSkip() {
    var grid = document.getElementById('product-grid');
    if (!grid || grid.dataset.availabilitySort !== 'true') return true;
    var q = window.location.search;
    if (q.indexOf('filter.') !== -1 || q.indexOf('filter%') !== -1) return true;
    var params = new URLSearchParams(q);
    var sortBy = params.get('sort_by');
    var defaultSort = grid.dataset.defaultSort || '';
    if (sortBy && sortBy !== defaultSort) return true;
    return false;
  }

  function productAvailable(p) {
    if (!p.variants || !p.variants.length) return false;
    for (var i = 0; i < p.variants.length; i++) {
      if (p.variants[i].available) return true;
    }
    return false;
  }

  function sortByAvailability(products) {
    var avail = [];
    var oos = [];
    for (var i = 0; i < products.length; i++) {
      if (productAvailable(products[i])) avail.push(products[i]);
      else oos.push(products[i]);
    }
    return avail.concat(oos);
  }

  function fetchAllProductsJson(handle) {
    var all = [];
    var page = 1;
    var limit = 250;
    function next() {
      var url =
        window.Shopify &&
        window.Shopify.routes &&
        window.Shopify.routes.root
          ? window.Shopify.routes.root +
            'collections/' +
            encodeURIComponent(handle) +
            '/products.json?limit=' +
            limit +
            '&page=' +
            page
          : '/collections/' + encodeURIComponent(handle) + '/products.json?limit=' + limit + '&page=' + page;
      return fetch(url).then(function (res) {
        if (!res.ok) throw new Error('products.json');
        return res.json();
      });
    }
    function loop() {
      return next().then(function (data) {
        var products = data.products || [];
        for (var i = 0; i < products.length; i++) all.push(products[i]);
        if (products.length < limit || page >= 80) return all;
        page++;
        return loop();
      });
    }
    return loop();
  }

  function parseCardLi(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var li =
      doc.querySelector('li.grid__item[data-product-handle]') ||
      doc.querySelector('li.grid__item');
    return li ? li.cloneNode(true) : null;
  }

  function fetchCardLi(handle) {
    var path =
      window.Shopify && window.Shopify.routes && window.Shopify.routes.root
        ? window.Shopify.routes.root + 'products/' + encodeURIComponent(handle) + '?view=card'
        : '/products/' + encodeURIComponent(handle) + '?view=card';
    return fetch(path).then(function (res) {
      if (!res.ok) return null;
      return res.text().then(parseCardLi);
    });
  }

  function run() {
    if (running) return;
    if (shouldSkip()) return;

    var grid = document.getElementById('product-grid');
    var handle = grid.dataset.collectionHandle;
    var perPage = parseInt(grid.dataset.productsPerPage || '16', 10);
    if (!handle || !perPage) return;

    var params = new URLSearchParams(window.location.search);
    var pageNum = Math.max(1, parseInt(params.get('page') || '1', 10));
    var sortBy = params.get('sort_by');
    var defaultSort = grid.dataset.defaultSort || '';
    var sortKey = sortBy || defaultSort || '';
    var stateKey = handle + '|' + pageNum + '|' + perPage + '|' + sortKey;
    if (grid.dataset.availabilitySorted === stateKey) return;

    running = true;
    var container = document.getElementById('ProductGridContainer');
    if (container && container.querySelector('.collection')) {
      container.querySelector('.collection').classList.add('loading');
    }

    fetchAllProductsJson(handle)
      .then(function (jsonProducts) {
        var sorted = sortByAvailability(jsonProducts);
        var start = (pageNum - 1) * perPage;
        var slice = sorted.slice(start, start + perPage);
        if (!slice.length) return;

        var pool = new Map();
        grid.querySelectorAll(':scope > li.grid__item').forEach(function (li) {
          var h = li.dataset.productHandle;
          if (h) pool.set(h, li);
        });

        var missing = [];
        for (var i = 0; i < slice.length; i++) {
          if (!pool.has(slice[i].handle)) missing.push(slice[i].handle);
        }

        return Promise.all(missing.map(fetchCardLi)).then(function (fetched) {
          var fetchMap = new Map();
          for (var j = 0; j < missing.length; j++) {
            if (fetched[j]) fetchMap.set(missing[j], fetched[j]);
          }

          var fragment = document.createDocumentFragment();
          for (var k = 0; k < slice.length; k++) {
            var p = slice[k];
            var li = pool.get(p.handle) || fetchMap.get(p.handle);
            if (li) fragment.appendChild(li);
          }
          grid.replaceChildren(fragment);
          grid.dataset.availabilitySorted = stateKey;
        });
      })
      .catch(function () {})
      .finally(function () {
        running = false;
        if (container && container.querySelector('.collection')) {
          container.querySelector('.collection').classList.remove('loading');
        }
      });
  }

  window.__initCollectionAvailabilitySort = run;
})();
