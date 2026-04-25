// ====================== ARTIST IMAGES (defined first – used by preloader) ======================
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
  loadingBar.style.width  = `${percent}%`;
  loadingText.textContent = `Loading... ${percent}%`;
}

// Cache of preloaded Image objects — keeps them in memory so panel swaps are instant
const imageCache = new Map();

function preloadImage(src) {
  return new Promise(resolve => {
    if (!src) { resolve(); return; }
    const img   = new Image();
    img.onload  = () => { imageCache.set(src, img); loadedCount++; updateProgress(); resolve(); };
    img.onerror = () => { console.warn('Image failed to load:', src); loadedCount++; updateProgress(); resolve(); };
    img.src     = src;
  });
}

async function startPreloading() {
  const imageSources = new Set();

  // Collect all img[src] that live under our asset folders
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && (src.includes('images/') || src.includes('artist icon/'))) {
      imageSources.add(src);
    }
  });

  // Background pattern (both encoded and plain form)
  imageSources.add('images/pc%20pattern.png');
  imageSources.add('images/pc pattern.png');

  // Extra images used only inside panels / after interaction
  const extraImages = [
    ...artistImages,
    "images/ticket.png",
    "images/Khong_Co_Tieu_e577.png",
    "images/HOA.png",
    "images/aia.png",
    "images/HOA1.png",
    // Panel gift images – preload so clicking a card is instant
    ...Object.values(imageMap)
  ];
  extraImages.forEach(src => imageSources.add(src));

  totalCount = imageSources.size;
  console.log(`Preloading ${totalCount} images…`);

  if (totalCount === 0) { finishLoading(); return; }

  updateProgress(); // show 0 %

  await Promise.all(Array.from(imageSources).map(src => preloadImage(src)));
  finishLoading();
}

function finishLoading() {
  loadingBar.style.width  = '100%';
  loadingText.textContent = 'Loading... 100%';
  setTimeout(() => loader.classList.add('hidden'), 400);
}

// ====================== INTRO SEQUENCE ======================
const intro        = document.querySelector('.intro');
const page         = document.querySelector('.page');
const logoSpans    = document.querySelectorAll('.logo-parts');
const logoImage    = document.querySelector('.logo-image');
const dividerImage = document.querySelector('.divider-img');

// Always start at top on reload
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
document.body.style.overflow = 'hidden';
setTimeout(() => { document.body.style.overflow = ''; }, 4600);

// ====================== PANEL DATA ======================
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

// ====================== SINGLE DOMContentLoaded ======================
document.addEventListener('DOMContentLoaded', () => {

  // --- Intro animation ---
  setTimeout(() => {
    logoImage.classList.add('active');
    dividerImage.classList.add('active');
  }, 300);

  logoSpans.forEach((span, i) => {
    setTimeout(() => span.classList.add('active'), (i + 1) * 50);
  });

  setTimeout(() => {
    logoSpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.remove('active');
        span.classList.add('fade');
      }, i * 50);
    });
    logoImage.classList.remove('active');
    logoImage.classList.add('fade');
    dividerImage.classList.remove('active');
    dividerImage.classList.add('fade');
  }, 10000);

  setTimeout(() => { intro.style.top = '-100vh'; },          3600);
  setTimeout(() => { page.classList.remove('hidden'); },      4400);
  setTimeout(() => { document.querySelector('.site-header').classList.add('show'); }, 4700);

  // --- Panel logic ---
  const overlay    = document.getElementById('overlay');
  const panel      = document.getElementById('panel');
  const closeBtn   = document.getElementById('closeBtn');
  const panelImage = document.getElementById('panelImage');

  function closePanel() {
    overlay.classList.remove('active');
    document.body.classList.remove('panel-open');
  }

  // Use event delegation – one listener instead of one per card
  document.getElementById('characters').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;

    const id        = card.dataset.id;
    const imgSrc    = imageMap[id] || 'images/gift.png';
    const glowColor = getComputedStyle(card).getPropertyValue('--glow-color').trim();

    // Lazy-set image only when panel opens
    panelImage.src = imgSrc;
    if (glowColor) panel.style.setProperty('--panel-glow', glowColor);

    overlay.classList.add('active');
    document.body.classList.add('panel-open');
  });

  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePanel(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  // --- Image protection (single pass) ---
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', e => e.preventDefault());
  });

  // Global guard for dynamically set panel image
  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });

  console.log('🛡️ Image protection activated');
});

// ====================== SMOOTH SCROLL ======================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id     = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
    const targetY      = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    smoothScrollTo(targetY, 550);
  });
});

function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const diff   = targetY - startY;
  let startTime = null;

  function easeInOutQuart(t) {
    return t < 0.1
      ? 5 * t * t * t * t
      : 1 - Math.pow(-1 * t + 1, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuart(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ====================== ARTIST SLIDER ======================
let artistIndex = 0;
const artistSlide = document.getElementById('artistSlide');
const prevBtn     = document.querySelector('.artist-btn.prev');
const nextBtn     = document.querySelector('.artist-btn.next');

function updateSlide() {
  artistSlide.style.opacity = 0;
  setTimeout(() => {
    artistSlide.src           = artistImages[artistIndex];
    artistSlide.style.opacity = 1;
  }, 200);
}

if (prevBtn && nextBtn && artistSlide) {
  prevBtn.addEventListener('click', () => {
    artistIndex = (artistIndex - 1 + artistImages.length) % artistImages.length;
    updateSlide();
  });
  nextBtn.addEventListener('click', () => {
    artistIndex = (artistIndex + 1) % artistImages.length;
    updateSlide();
  });
}

// ====================== START PRELOADING ======================
window.addEventListener('load', startPreloading);