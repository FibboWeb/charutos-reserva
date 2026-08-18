(function () {
  const header = document.querySelector('[id^="shopify-section-"][id*="header"]');
  const openPopup = document.querySelector('.konfidency-reviews-summary');

  if (!openPopup) {
    return;
  }

  const hideHeader = () => {
    if (header) header.style.display = 'none';
  };

  const showHeader = () => {
    if (header) header.style.display = '';
  };

  const closeModal = () => {
    showHeader();
  };

  const openModal = () => {
    hideHeader();

    const btnCloseReview = document.querySelector('.modal-review .btn-close[data-v-217ad106]');
    const btnCloseQuestion = document.querySelector('.modal-question .btn-close');
    const overlay = document.querySelector('.overlay');

    if (btnCloseReview) btnCloseReview.addEventListener('click', closeModal, { once: true });
    if (btnCloseQuestion) btnCloseQuestion.addEventListener('click', closeModal, { once: true });
    if (overlay) overlay.addEventListener('click', closeModal, { once: true });
  };

  const attachDetailButtons = () => {
    const detailButtons = document.querySelectorAll('.konfidency-reviews-details button');

    if (detailButtons.length === 0) {
      return;
    }

    detailButtons.forEach((button) => {
      button.addEventListener('click', openModal);
    });
  };

  openPopup.addEventListener('click', openModal);

  const buttonCheckInterval = setInterval(() => {
    const detailButtons = document.querySelectorAll('.konfidency-reviews-details button');
    if (detailButtons.length > 0) {
      attachDetailButtons();
      clearInterval(buttonCheckInterval);
    }
  }, 100);

  setTimeout(() => clearInterval(buttonCheckInterval), 15000);
})();
