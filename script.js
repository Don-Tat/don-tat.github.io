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

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const portrait = document.querySelector('.hero-visual');
  const overlay = document.querySelector('.portrait-overlay');
  portrait?.addEventListener('pointermove', (event) => {
    const box = portrait.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    overlay.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  });
  portrait?.addEventListener('pointerleave', () => { overlay.style.transform = ''; });
}
