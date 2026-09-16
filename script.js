document.getElementById('year').textContent = new Date().getFullYear();

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 }) : null;

document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el));

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

const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
const mobile = matchMedia('(max-width: 700px)');
function closeMenu(returnFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  if (returnFocus) menu.focus();
  nav.hidden = mobile.matches;
}
function syncMenu() {
  const focusInside = nav.contains(document.activeElement);
  menu.hidden = !mobile.matches;
  closeMenu(mobile.matches && focusInside);
}
menu.addEventListener('click', () => {
  const opening = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(opening));
  nav.hidden = !opening;
  if (opening) nav.querySelector('a').focus();
});
siteHeader.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    closeMenu(true);
  }
});
siteHeader.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (!siteHeader.contains(document.activeElement)) closeMenu();
  });
});
document.addEventListener('click', (event) => {
  if (!siteHeader.contains(event.target)) closeMenu();
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobile.matches) closeMenu(true);
});
mobile.addEventListener('change', syncMenu);
syncMenu();
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

if ('IntersectionObserver' in window) {
  const sections = [...document.querySelectorAll('#work, #research, #about, #contact')];
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  let spy;
  function observeSections() {
    spy?.disconnect();
    spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        } else if (entry.boundingClientRect.top > siteHeader.offsetHeight) {
          links.filter((link) => link.hash === '#' + entry.target.id).forEach((link) => link.removeAttribute('aria-current'));
        }
      });
    }, { rootMargin: '-' + siteHeader.offsetHeight + 'px 0px -' + Math.max(0, innerHeight - siteHeader.offsetHeight - 100) + 'px 0px', threshold: 0 });
    sections.forEach((section) => spy.observe(section));
  }
  window.addEventListener('resize', observeSections);
  observeSections();
}
