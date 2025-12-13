const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ----------button ngan ni---------- */
const body = document.body;
const modeBtn = $('#mode-toggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    modeBtn.textContent = '☀️';
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    modeBtn.textContent = '🌙';
  }
  try { localStorage.setItem('theme', theme); } catch (e) {}
}

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
})();

modeBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
});

const loading = $('#loading');
window.addEventListener('load', () => {
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 350);
});

$$('nav#menu a').forEach(a => a.addEventListener('click', () => {
  if (body.classList.contains('menu-open')) body.classList.remove('menu-open');
}));

$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const typingEl = $('#typing');
const phrases = [
  "Hello, I'm Mark Vincent Bigyan",
  "A BS INFORMATION TECHNOLOGY Student",
  "Web Developer",
  "Graphic Designer"
];
let typeIndex = 0;
let charIndex = 0;
let typingForward = true;
let typingDelay = 40;
let pauseBetween = 900;

function typeTick() {
  if (!typingEl) return;
  const current = phrases[typeIndex];
  if (typingForward) {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      typingForward = false;
      setTimeout(typeTick, pauseBetween);
      return;
    }
  } else {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      typingForward = true;
      typeIndex = (typeIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeTick, typingDelay);
}

setTimeout(typeTick, 600);

const animItems = $$('.fade-in, .fade-up, .slide-up');

animItems.forEach(el => {
  el.style.opacity = 1;
  el.style.transform = "none";
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.fill');
      fills.forEach(fill => {
        const computedLevel = getComputedStyle(fill).getPropertyValue('--level').trim();
        const fallback = fill.dataset.level || '60%';
        const level = computedLevel || fallback;
        fill.style.width = level;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = $('#skills');
if (skillsSection) skillObserver.observe(skillsSection);

const modal = $('#project-modal');
const modalTitle = $('#modal-title');
const modalDesc = $('#modal-desc');

function openModal(title = '', desc = '', img = '', live = '', github = '') {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

  
    const imgEl = document.getElementById("modal-img");
    imgEl.src = img || "default.jpg"; 

    
    const liveBtn = document.getElementById("modal-live");
    const githubBtn = document.getElementById("modal-github");

    live ? liveBtn.href = live : liveBtn.style.display = "none";
    github ? githubBtn.href = github : githubBtn.style.display = "none";

    modal.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeModal();
  }
});

window.openModal = openModal;
window.closeModal = closeModal;
window.toggleMenu = toggleMenu;

document.addEventListener('focusin', (e) => {
  if (!modal || !modal.classList.contains('open')) return;
  if (!modal.contains(e.target)) {
    const firstFocusable = modal.querySelector('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }
});

console.info('Portfolio script initialized — all features ready.');

function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}



const fadeElements = document.querySelectorAll('.fade-scroll');

function revealOnScroll() {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 100 && rect.bottom > 100) {
            el.classList.add('show');   
        } else {
            el.classList.remove('show'); 
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

function openImage(src) {
    const modal = document.getElementById("image-modal");
    const img = document.getElementById("full-image");
    img.src = src;
    modal.style.display = "flex";
}

function closeImage() {
    document.getElementById("image-modal").style.display = "none";
}
