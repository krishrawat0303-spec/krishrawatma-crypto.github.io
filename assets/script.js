// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// KPI count-up animation, triggered when the hero panel scrolls into view
const counters = document.querySelectorAll('.kpi-value');

function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const duration = 900;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(animateCount);
      observer.disconnect();
    }
  });
}, { threshold: 0.4 });

const panel = document.querySelector('.hero__panel');
if (panel) observer.observe(panel);
