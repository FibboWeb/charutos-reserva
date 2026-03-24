// Captura o header
const header = document.getElementById('shopify-section-sections--17311148474548__header');

// Captura a div para abrir o modal
const openPopup = document.querySelector('.konfidency-reviews-summary');

// Função para ocultar o header
const hideHeader = () => {
  header.style.display = 'none'; // Oculta o header
};

// Função para mostrar o header
const showHeader = () => {
  header.style.display = 'block'; // Restaura o display do header
};

// Função para abrir o modal
const openModal = () => {
  hideHeader(); // Oculta o header ao abrir o modal

  // Captura os elementos de fechamento do modal ao abrir
  const btnCloseReview = document.querySelector('.modal-review .btn-close[data-v-217ad106]');
  const btnCloseQuestion = document.querySelector('.modal-question .btn-close');
  const overlay = document.querySelector('.overlay');

  // Adiciona os event listeners para fechar o modal e mostrar o header
  if (btnCloseReview) {
    btnCloseReview.addEventListener('click', closeModal);
  }
  if (btnCloseQuestion) {
    btnCloseQuestion.addEventListener('click', closeModal);
  }
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
};

// Função para fechar o modal e mostrar o header
const closeModal = () => {
  showHeader(); // Mostra o header ao fechar o modal
};

// Função para capturar botões dentro da div .konfidency-reviews-details
const captureDetailButtons = () => {
  const detailButtons = document.querySelectorAll('.konfidency-reviews-details button');

  // Verifica se existem botões, se não, tenta novamente após 100ms
  if (detailButtons.length > 0) {
    // Adiciona o event listener para os botões
    detailButtons.forEach(button => {
      button.addEventListener('click', openModal); // Apenas abre o modal
    });
    clearInterval(buttonCheckInterval); // Limpa o intervalo quando os botões são encontrados
  }
};

// Inicia a verificação de botões
const buttonCheckInterval = setInterval(captureDetailButtons, 100);

// Adiciona o event listener para abrir o modal ao clicar na div
openPopup.addEventListener('click', openModal);
