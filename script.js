const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
    menu.setAttribute(
      'aria-label',
      nav.classList.contains('open') ? 'Close menu' : 'Open menu'
    );
  });
}

document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}


/* Portfolio category filters */

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    portfolioCards.forEach(card => {
      const matches =
        filter === 'all' || card.dataset.category === filter;

      card.classList.toggle('is-hidden', !matches);
    });
  });
});


/* Portfolio image preview */

const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalService = document.getElementById('modalService');

function closePortfolioModal() {
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (modalImage) {
    modalImage.removeAttribute('src');
  }
}


document.querySelectorAll('.portfolio-open').forEach(button => {

  button.addEventListener('click', () => {

    if (!modal || !modalImage) return;

    const imagePath = button.dataset.image;

    /*
      Convert the relative image path into a complete URL.
      This makes the portfolio preview more reliable
      across GitHub Pages, Cloudflare and custom domains.
    */
    const imageURL = new URL(imagePath, window.location.href).href;

    modalImage.src = imageURL;
    modalImage.alt = button.dataset.title || 'Portfolio project';

    if (modalTitle) {
      modalTitle.textContent = button.dataset.title || '';
    }

    if (modalService) {
      modalService.textContent = button.dataset.service || '';
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

  });

});


/* Close modal */

document.querySelectorAll('[data-close-modal]').forEach(element => {

  element.addEventListener('click', closePortfolioModal);

});


/* Escape key */

document.addEventListener('keydown', event => {

  if (event.key === 'Escape') {
    closePortfolioModal();
  }

});





