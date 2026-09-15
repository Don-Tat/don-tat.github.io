document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const siteHeader = document.querySelector('.site-header');
const backToTop = document.querySelector('.back-to-top');

const updateScrollControls = () => {
  const hasScrolled = window.scrollY > 24;
  const showBackToTop = window.scrollY > Math.min(window.innerHeight * 0.75, 640);

  siteHeader.classList.toggle('is-scrolled', hasScrolled);
  backToTop.classList.toggle('is-visible', showBackToTop);
};

updateScrollControls();
window.addEventListener('scroll', updateScrollControls, { passive: true });
