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
  const map = document.querySelector('.orbit-map');
  const nodes = document.querySelectorAll('.node');
  map?.addEventListener('pointermove', (event) => {
    const box = map.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    nodes.forEach((node, index) => {
      const depth = (index + 1) * 1.7;
      node.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
  map?.addEventListener('pointerleave', () => nodes.forEach((node) => node.style.transform = ''));
}
