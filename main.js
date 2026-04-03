/* ============================================
   LUMINARY — main.js
   Interactions: navbar scroll, mobile menu,
   scroll reveal, typewriter, tab switcher
   ============================================ */

// ─── NAVBAR SCROLL ───────────────────────────
const navbar = document.getElementById('navbar');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  // Hide navbar on scroll down, show on scroll up
  if (y > 120) {
    navbar.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastY = y;
}, { passive: true });

// ─── MOBILE MENU ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

// ─── SCROLL REVEAL ───────────────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

// ─── TYPEWRITER EFFECT ───────────────────────
const phrases = [
  'When a PR merges, update Notion & notify Slack',
  'Auto-assign new leads from Gmail to Salesforce',
  'Summarize weekly standups every Friday at 9am',
  'Alert me when server response time exceeds 2s',
];

const twText = document.getElementById('typewriterText');
if (twText) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let paused = false;

  function type() {
    const current = phrases[phraseIndex];

    if (paused) {
      paused = false;
      setTimeout(type, 1400);
      return;
    }

    if (!deleting && charIndex <= current.length) {
      twText.textContent = current.slice(0, charIndex++);
      setTimeout(type, 42);
    } else if (!deleting && charIndex > current.length) {
      deleting = true;
      paused = true;
      type();
    } else if (deleting && charIndex > 0) {
      twText.textContent = current.slice(0, --charIndex);
      setTimeout(type, 22);
    } else {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
    }
  }

  // Start typewriter when step scrolls into view
  const twBox = document.querySelector('.typewriter-box');
  if (twBox) {
    const twObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        type();
        twObserver.disconnect();
      }
    }, { threshold: 0.5 });
    twObserver.observe(twBox);
  }
}

// ─── PRODUCT PREVIEW TABS ────────────────────
const tabs = document.querySelectorAll('.ptab');
const screens = document.querySelectorAll('.preview-screen');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    screens.forEach(s => s.classList.remove('active'));

    tab.classList.add('active');
    screens[idx]?.classList.add('active');
  });
});

// ─── SMOOTH ANCHOR SCROLL ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── METRIC COUNTER ANIMATION ────────────────
const metrics = document.querySelectorAll('.metric-val');

function animateValue(el, start, end, suffix, duration = 1600) {
  const isFloat = String(end).includes('.');
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const val = start + (end - start) * eased;
    el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString()) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = (isFloat ? end.toFixed(1) : end.toLocaleString()) + suffix;
  }
  requestAnimationFrame(update);
}

const metricConfig = [
  { end: 14000, suffix: '+' },
  { end: 98.9, suffix: '%' },
  { end: 3200000, suffix: '' },
  { end: 11, suffix: 'min' },
];

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      metrics.forEach((el, i) => {
        const cfg = metricConfig[i];
        if (cfg) {
          animateValue(el, 0, cfg.end, cfg.suffix);
        }
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const metricsRow = document.querySelector('.metrics-row');
if (metricsRow) counterObserver.observe(metricsRow);

// ─── PARALLAX HERO ORBS ──────────────────────
const orbs = document.querySelectorAll('.hero-orb');

window.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
}, { passive: true });

// ─── CARD TILT EFFECT ────────────────────────
document.querySelectorAll('.feature-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c◈ Luminary', 'color: #00d4b4; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with care. Ship smarter.', 'color: #8b8fa8; font-size: 12px;');
