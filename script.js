// ====================== PANEL DATA (must be first — used by preloader) ======================
const imageMap = {
  elira:  "images/elira_gift.png",
  finana: "images/feesh_gift.png",
  millie: "images/millie_gift.png",
  enna:   "images/enna_gift.png",
  petra:  "images/petra_gift.png",
  vox:    "images/vox_gift.png",
  luca:   "images/luca_gift.png",
  shu:    "images/shu_gift.png",
  sonny:  "images/sonny_gift.png",
  alban:  "images/alban_gift.png",
  uki:    "images/uki_gift.png",
  maria:  "images/mari_gift.png",
  aia:    "images/aia_gift.png",
  scarle: "images/scale_gift.png",
  ren:    "images/ren_gift.png",
  ver:    "images/ver_gift.png",
  doppy:  "images/doppi_gift.png",
  melo:   "images/melo_gift.png",
  zali:   "images/zali_gift.png",
  vanta:  "images/vanta_gift.png",
  willy:  "images/willy_gift.png",
  claude: "images/claude_gift.png",
  ronin:  "images/ronin_gift.png",
  klara:  "images/klara_gift.png",
  zeal:   "images/zeal_gift.png",
  freo:   "images/freo_gift.png",
  seible: "images/seible_gift.png",
  kaelix: "images/kaelix_gift.png"
};

// ====================== ARTIST IMAGES ======================
const artistImages = [
  "artist icon/Ao.png",
  "artist icon/Ch\u00FAi.png",
  "artist icon/Ebi.png",
  "artist icon/Hana.png",
  "artist icon/mayo.png",
  "artist icon/Minty.png",
  "artist icon/Nh\u00FDm.png",
  "artist icon/Stugi.png",
  "artist icon/T\u1EA3o.png",
  "artist icon/Tegami.png",
  "artist icon/UsaRi.png"
];

// ====================== PRELOADER ======================
const loader      = document.getElementById('loader');
const loadingBar  = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');

let loadedCount = 0;
let totalCount  = 0;

function updateProgress() {
  if (totalCount === 0) return;
  const percent = Math.min(Math.round((loadedCount / totalCount) * 100), 100);
  loadingBar.style.width  = percent + '%';
  loadingText.textContent = 'Loading... ' + percent + '%';
}

const imageCache = new Map();

function preloadImage(src) {
  return new Promise(function(resolve) {
    if (!src) { resolve(); return; }
    const img   = new Image();
    img.onload  = function() { imageCache.set(src, img); loadedCount++; updateProgress(); resolve(); };
    img.onerror = function() { loadedCount++; updateProgress(); resolve(); };
    img.src     = src;
  });
}

async function startPreloading() {
  const imageSources = new Set();

  document.querySelectorAll('img').forEach(function(img) {
    const src = img.getAttribute('src');
    if (src && (src.includes('images/') || src.includes('artist icon/'))) {
      imageSources.add(src);
    }
  });

  imageSources.add('images/pc%20pattern.png');

  artistImages.forEach(function(src) { imageSources.add(src); });
  Object.values(imageMap).forEach(function(src) { imageSources.add(src); });
  ['images/ticket.png','images/HOA.png','images/HOA1.png','images/aia.png'].forEach(function(src) { imageSources.add(src); });

  totalCount = imageSources.size;
  if (totalCount === 0) { finishLoading(); return; }
  updateProgress();

  await Promise.all(Array.from(imageSources).map(preloadImage));
  finishLoading();
}

function finishLoading() {
  loadingBar.style.width  = '100%';
  loadingText.textContent = 'Loading... 100%';
  setTimeout(function() { loader.classList.add('hidden'); }, 400);
}

function animateCards() {
  const delays = [0.0, 0.15, 0.05, 0.25, 0.1];
  document.querySelectorAll('.card').forEach(function(card, i) {
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'fadeUp 0.8s ease ' + delays[i % delays.length] + 's forwards';
  });
}

// ====================== INTRO SEQUENCE ======================
const intro        = document.querySelector('.intro');
const page         = document.querySelector('.page');
const logoSpans    = document.querySelectorAll('.logo-parts');
const logoImage    = document.querySelector('.logo-image');
const dividerImage = document.querySelector('.divider-img');

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
document.body.style.overflow = 'hidden';
setTimeout(function() { document.body.style.overflow = ''; }, 4600);

document.addEventListener('DOMContentLoaded', function() {

  // Intro animation
  setTimeout(function() {
    logoImage.classList.add('active');
    dividerImage.classList.add('active');
  }, 300);

  logoSpans.forEach(function(span, i) {
    setTimeout(function() { span.classList.add('active'); }, (i + 1) * 50);
  });

  setTimeout(function() {
    logoSpans.forEach(function(span, i) {
      setTimeout(function() {
        span.classList.remove('active');
        span.classList.add('fade');
      }, i * 50);
    });
    logoImage.classList.remove('active');  logoImage.classList.add('fade');
    dividerImage.classList.remove('active'); dividerImage.classList.add('fade');
  }, 10000);

  setTimeout(function() { intro.style.top = '-100vh'; },     3600);
  setTimeout(function() {
    page.classList.remove('hidden');
    // Animate cards now that the page is actually visible
    setTimeout(animateCards, 50);
  }, 4400);
  setTimeout(function() { document.querySelector('.site-header').classList.add('show'); }, 4700);

  // Panel logic
  const overlay    = document.getElementById('overlay');
  const panel      = document.getElementById('panel');
  const closeBtn   = document.getElementById('closeBtn');
  const panelImage = document.getElementById('panelImage');

  function closePanel() {
    overlay.classList.remove('active');
    document.body.classList.remove('panel-open');
  }

  document.getElementById('characters').addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    const id        = card.dataset.id;
    const imgSrc    = imageMap[id] || 'images/gift.png';
    const glowColor = getComputedStyle(card).getPropertyValue('--glow-color').trim();
    panelImage.src  = imgSrc;
    if (glowColor) panel.style.setProperty('--panel-glow', glowColor);
    overlay.classList.add('active');
    document.body.classList.add('panel-open');
  });

  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closePanel(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closePanel(); });

  // ====================== IMAGE & DEVTOOLS PROTECTION ======================

  // Block right-click everywhere
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

  // Disable dragging on all images
  document.querySelectorAll('img').forEach(function(img) {
    img.setAttribute('draggable', 'false');
  });

  // Block common DevTools / save / view-source keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    const ctrl = e.ctrlKey || e.metaKey;

    // F12 — DevTools
    if (e.key === 'F12') { e.preventDefault(); return; }

    // Ctrl+Shift+I — DevTools
    // Ctrl+Shift+J — DevTools console
    // Ctrl+Shift+C — Inspect element
    if (ctrl && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return; }

    // Ctrl+U — View source
    if (ctrl && ['U','u'].includes(e.key)) { e.preventDefault(); return; }

    // Ctrl+S — Save page
    if (ctrl && ['S','s'].includes(e.key)) { e.preventDefault(); return; }

    // Ctrl+A — Select all (prevents bulk-selecting & copying)
    if (ctrl && ['A','a'].includes(e.key)) { e.preventDefault(); return; }

    // Ctrl+P — Print (can save as PDF with images)
    if (ctrl && ['P','p'].includes(e.key)) { e.preventDefault(); return; }
  });

  // Detect DevTools open via window size difference (desktop only)
  (function() {
    const threshold = 160;
    setInterval(function() {
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        document.body.style.filter = 'blur(8px)';
      } else {
        document.body.style.filter = '';
      }
    }, 1000);
  })();

  console.log('Shield Image protection activated');
});

// ====================== SMOOTH SCROLL ======================
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const id     = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerHeight = (document.querySelector('.site-header') || {}).offsetHeight || 0;
    const targetY      = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    smoothScrollTo(targetY, 550);
  });
});

function smoothScrollTo(targetY, duration) {
  duration = duration || 500;
  const startY  = window.scrollY;
  const diff    = targetY - startY;
  let startTime = null;

  function ease(t) {
    return t < 0.1 ? 5 * t * t * t * t : 1 - Math.pow(-t + 1, 3) / 2;
  }

  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ====================== ARTIST SLIDER ======================
let artistIndex   = 0;
const artistSlide = document.getElementById('artistSlide');
const prevBtn     = document.querySelector('.artist-btn.prev');
const nextBtn     = document.querySelector('.artist-btn.next');

function updateSlide() {
  artistSlide.style.opacity = 0;
  setTimeout(function() {
    artistSlide.src           = artistImages[artistIndex];
    artistSlide.style.opacity = 1;
  }, 200);
}

if (prevBtn && nextBtn && artistSlide) {
  prevBtn.addEventListener('click', function() {
    artistIndex = (artistIndex - 1 + artistImages.length) % artistImages.length;
    updateSlide();
  });
  nextBtn.addEventListener('click', function() {
    artistIndex = (artistIndex + 1) % artistImages.length;
    updateSlide();
  });
}

// ====================== START PRELOADING ======================
window.addEventListener('load', startPreloading);
