$(document).ready(function ($) {
  "use strict";

  /** Menu 3 níveis: painel centralizado no CSS (fixed + margin auto); JS só define --dt-nav-three-top. */
  function syncThreeLevelNavDropdowns() {
    var root = document.documentElement;
    var narrow =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(max-width: 989px)").matches;
    var $panels = $(
      "#header .dt-nav li.dt-sc-nav-three-level > .megamenu_megamenu > .sub-menu-block, sticky-header .dt-nav li.dt-sc-nav-three-level > .megamenu_megamenu > .sub-menu-block"
    );
    $panels.css({
      width: "",
      left: "",
      right: "",
      marginLeft: "",
      marginRight: "",
    });
    if (narrow) {
      root.style.removeProperty("--dt-nav-three-top");
      return;
    }
    var $anchor = $("#shopify-section-headers, sticky-header, #header").filter(":visible").first();
    if (!$anchor.length) {
      $anchor = $("#header");
    }
    var el = $anchor[0];
    if (el) {
      var rect = el.getBoundingClientRect();
      root.style.setProperty("--dt-nav-three-top", Math.round(rect.bottom) + "px");
    }
  }

  function megaMenu() {
    if ($(".default_dropdown").length > 0) {
      if ($("#header .page-full-width").length) {
        var parentRow = $("#header .page-full-width > .row");
        var parentLeft = parseInt(parentRow.css("marginLeft").replace("px", ""));
      } else {
        var parentRow = $("#header .page-width .row");
        var parentLeft = parseInt(parentRow.offset().left);
      }
      var parentWidth = parentRow.width();

      $("#header .dt-nav li:not(.close-nav)").each(function () {
        var thisItem = $(this);
        if (!thisItem.hasClass("menu-item-has-children")) return;
        if (thisItem.hasClass("dt-sc-nav-three-level")) return;
        var thisItemLeft = thisItem.find(".megamenu_megamenu > a").offset().left;
        var menuLeft = parseInt(thisItemLeft - parentLeft);
        thisItem.find(".sub-menu-block").css("width", parentWidth);
      });

      $("sticky-header .dt-nav li:not(.close-nav)").each(function () {
        var thisItem = $(this);
        if (!thisItem.hasClass("menu-item-has-children")) return;
        if (thisItem.hasClass("dt-sc-nav-three-level")) return;
        var thisItemLeft = thisItem.find(".megamenu_megamenu > a").offset().left;
        var menuLeft = parseInt(thisItemLeft - parentLeft);
        thisItem.find(".sub-menu-block").css("width", parentWidth);
      });
      window.setTimeout(function () {
        $(window).trigger("resize");
      }, 800);
    }
    syncThreeLevelNavDropdowns();
  }

  var megaMenuResize = false;
  $(window).bind("resize", function () {
    if (!megaMenuResize) {
      megaMenu();
      megaMenuResize = true;
    } else {
      syncThreeLevelNavDropdowns();
    }
  });
  megaMenu();
  $(window).on("load", syncThreeLevelNavDropdowns);

  var threeLevelTopTimer;
  $(window).on("scroll resize", function () {
    clearTimeout(threeLevelTopTimer);
    threeLevelTopTimer = setTimeout(syncThreeLevelNavDropdowns, 16);
  });
});

$(function () {
  if ($(window).width() >= 1200) {
    $(".deskTabs a").click(function () {
      let id = $(this).attr("href");
      $(".deskTabs li").removeClass("active");
      $(this).parent().addClass("active");
      $(this).parent().parent().parent().parent().addClass("active");
      $(".tabs-content li.dt-sc-menu-tabs").hide();
      $(this).parent().parent().parent().parent().find(id).show();

      return false;
    });
  }
  if ($(window).width() <= 1199) {
    $(".mobileTabs .tabs  li").each(function () {
      $(this).click(function () {
        $(this).next("div").slideToggle(0);
      });
    });
  }
});
$(document).ready(function () {
  $("#category-menu-button").click(function () {
    $(this).toggleClass("open");
    $(".category-wrapper").toggleClass("open");
    $(".category-wrapper").slideToggle(0);
  });
});

