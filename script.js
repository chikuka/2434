// ====================== FIXED PRELOADER ======================
const loader = document.getElementById('loader');
const loadingBar = document.getElementById('loadingBar');
const loadingText = document.getElementById('loadingText');

let loadedCount = 0;
let totalCount = 0;

function updateProgress() {
  if (totalCount === 0) return;
  const percent = Math.min(Math.round((loadedCount / totalCount) * 100), 100);
  loadingBar.style.width = `${percent}%`;
  loadingText.textContent = `Loading... ${percent}%`;
}

function preloadImage(src) {
  return new Promise(resolve => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = () => {
      loadedCount++;
      updateProgress();
      resolve();
    };
    img.onerror = () => {
      console.warn('Image failed to load:', src);
      loadedCount++;
      updateProgress();
      resolve(); // continue anyway
    };
    img.src = src;
  });
}

async function startPreloading() {
  const imageSources = new Set();

  // Collect ALL <img> src from the document
  document.querySelectorAll('img').forEach(img => {
    let src = img.getAttribute('src');
    if (src) {
      // Make sure it's a relative path starting with images/ or artist icon/
      if (src.startsWith('http') || src.includes('images/') || src.includes('artist icon/')) {
        imageSources.add(src);
      }
    }
  });

  // CSS background images (fixed path)
  imageSources.add('images/pc%20pattern.png');
  imageSources.add('images/pc pattern.png'); // fallback

  // Extra images used in panels and slider
  const extraImages = [
    ...artistImages,
    "images/ticket.png",
    "images/Khong_Co_Tieu_e577.png",
    "images/HOA.png",
    "images/aia.png",
    "images/HOA1.png",
    "images/elira.png", "images/feesh.png", "images/millie.png", // add more if needed
    "images/enna.png", "images/petra.png", "images/vox.png"
  ];

  extraImages.forEach(src => {
    if (src) imageSources.add(src);
  });

  totalCount = imageSources.size;
  console.log(`Preloading ${totalCount} images...`); // helpful for debugging

  if (totalCount === 0) {
    finishLoading();
    return;
  }

  updateProgress(); // Show 0%

  // Load all images in parallel
  const promises = Array.from(imageSources).map(src => preloadImage(src));
  await Promise.all(promises);

  finishLoading();
}

function finishLoading() {
  loadingBar.style.width = '100%';
  loadingText.textContent = 'Loading... 100%';

  setTimeout(() => {
    loader.classList.add('hidden');

    setTimeout(() => {
      startIntroSequence();
    }, 600);
  }, 400);
}

// ====================== INTRO SEQUENCE ======================
function startIntroSequence() {
  const intro = document.querySelector(".intro");
  const page = document.querySelector(".page");
  const logoSpans = document.querySelectorAll(".logo-parts");
  const logoImage = document.querySelector(".logo-image");
  const dividerImage = document.querySelector(".divider-img");

  setTimeout(() => {
    logoImage.classList.add("active");
    dividerImage.classList.add("active");
  }, 300);

  logoSpans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("active");
    }, (index + 1) * 50);
  });

  setTimeout(() => {
    logoSpans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.remove("active");
        span.classList.add("fade");
      }, index * 50);
    });

    logoImage.classList.remove("active");
    logoImage.classList.add("fade");
    dividerImage.classList.remove("active");
    dividerImage.classList.add("fade");
  }, 9500);

  setTimeout(() => {
    intro.style.top = "-100vh";
  }, 3600);

  setTimeout(() => {
    page.classList.remove("hidden");
    document.querySelector(".site-header").classList.add("show");
  }, 4400);
}

// ====================== PANEL LOGIC ======================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const panel = document.getElementById("panel");
  const panelContent = document.getElementById("panelContent");
  const closeBtn = document.getElementById("closeBtn");
  
  const contentMap = {
    elira: `
    <h2>ELira Pendora</h2>
    <p>Sample merch.</p>
    <div class="panel-gallery">
      <img src="images/Khong_Co_Tieu_e577.png">
      <img src="images/HOA.png">
    </div>
    `,
    finana: `
    <h2>Finana Ryugu</h2>
    <p>Sample merch.</p>
    <div class="panel-gallery">
      <img src="images/aia.png">
      <img src="images/HOA.png">
    </div>
    `,
    millie: `<h2>ZTM</h2><p>ZTM lore and info here.</p>`,
    enna: `<h2>ZTM</h2><p>ZTM lore and info here.</p>`,
    petra: `<h2>ZTM</h2><p>ZTM lore and info here.</p>`,

    vox: `<h2>ILN</h2><p>ILN group description.</p>`,
    luca: `<h2>ILN</h2><p>ILN group description.</p>`,
    shu: `<h2>ILN</h2><p>ILN group description.</p>`,

    sonny: `<h2>ILN</h2><p>ILN group description.</p>`,
    alban: `<h2>ILN</h2><p>ILN group description.</p>`,
    uki: `<h2>ILN</h2><p>ILN group description.</p>`,

    maria: `<h2>ILN</h2><p>ILN group description.</p>`,
    aia: `<h2>ILN</h2><p>ILN group description.</p>`,
    scarle: `<h2>ILN</h2><p>ILN group description.</p>`,
    ren: `<h2>ILN</h2><p>ILN group description.</p>`,

    ver: `<h2>ILN</h2><p>ILN group description.</p>`,
    doppy: `<h2>ILN</h2><p>ILN group description.</p>`,
    melo: `<h2>ILN</h2><p>ILN group description.</p>`,

    zali: `<h2>ILN</h2><p>ILN group description.</p>`,
    vanta: `<h2>ILN</h2><p>ILN group description.</p>`,
    willy: `<h2>ILN</h2><p>ILN group description.</p>`,
    claude: `<h2>ILN</h2><p>ILN group description.</p>`,

    ronin: `<h2>ILN</h2><p>ILN group description.</p>`,
    klara: `<h2>ILN</h2><p>ILN group description.</p>`,

    zeal: `<h2>ILN</h2><p>ILN group description.</p>`,
    freo: `<h2>ILN</h2><p>ILN group description.</p>`,
    seible: `<h2>ILN</h2><p>ILN group description.</p>`,            
    kaelix: `<h2>BTB</h2>
    <p>BTB information.</p>
    <div class="panel-gallery">
      <img src="images/Khong_Co_Tieu_e577.png">
    </div>`
  };

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      panelContent.innerHTML = contentMap[id] || "<h2>Unknown</h2><p>No content available.</p>";

      const glowColor = getComputedStyle(card).getPropertyValue("--glow-color").trim();
      if (glowColor) {
        panel.style.setProperty("--panel-glow", glowColor);
      }

      overlay.classList.add("active");
      document.body.classList.add("panel-open");
    });
  });

  function closePanel() {
    overlay.classList.remove("active");
    document.body.classList.remove("panel-open");
  }

  closeBtn.addEventListener("click", closePanel);
  overlay.addEventListener("click", e => { if (e.target === overlay) closePanel(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel(); });
});

// ====================== SMOOTH SCROLL ======================
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function easeInOutQuart(t) {
    return t < 0.1 ? 5 * t * t * t * t : 1 - Math.pow(-1 * t + 1, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const time = timestamp - startTime;
    const progress = Math.min(time / duration, 1);

    window.scrollTo(0, startY + diff * easeInOutQuart(progress));

    if (time < duration) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();

    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    smoothScrollTo(targetY, 550);
  });
});

// ====================== ARTIST SLIDER ======================
const artistImages = [
  "artist icon/Ao.png",
  "artist icon/Chúi.png",
  "artist icon/Ebi.png",
  "artist icon/Hana.png",
  "artist icon/mayo.png",
  "artist icon/Minty.png",
  "artist icon/Nhým.png",
  "artist icon/Stugi.png",
  "artist icon/Tảo.png",
  "artist icon/Tegami.png",
  "artist icon/UsaRi.png"
];

let artistIndex = 0;

const artistSlide = document.getElementById("artistSlide");
const prevBtn = document.querySelector(".artist-btn.prev");
const nextBtn = document.querySelector(".artist-btn.next");

function updateSlide() {
  artistSlide.style.opacity = 0;
  setTimeout(() => {
    artistSlide.src = artistImages[artistIndex];
    artistSlide.style.opacity = 1;
  }, 200);
}

if (prevBtn && nextBtn && artistSlide) {
  prevBtn.addEventListener("click", () => {
    artistIndex = (artistIndex - 1 + artistImages.length) % artistImages.length;
    updateSlide();
  });

  nextBtn.addEventListener("click", () => {
    artistIndex = (artistIndex + 1) % artistImages.length;
    updateSlide();
  });
}

// ====================== START THE SITE ======================
window.addEventListener("load", () => {
  startPreloading();
});