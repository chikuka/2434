const intro = document.querySelector(".intro");
const page = document.querySelector(".page");

const logoSpans = document.querySelectorAll(".logo-parts");
const logoImage = document.querySelector(".logo-image");
const dividerImage = document.querySelector(".divider-img");

// ===== LOADER (ADD THIS AT THE VERY TOP) =====
const loader = document.getElementById("loader");
const loadText = document.getElementById("loadText");

const images = Array.from(document.querySelectorAll("img"));

let loaded = 0;
let total = images.length;

let fakeProgress = 0;
let realDone = false;

document.body.style.overflow = "hidden";

// Fake progress 0 → 90
const fakeInterval = setInterval(() => {
  if (fakeProgress < 90) {
    fakeProgress += Math.random() * 3 + 1;
    fakeProgress = Math.min(fakeProgress, 90);
    updateText(Math.floor(fakeProgress));
  } else {
    clearInterval(fakeInterval);
  }
}, 120);

// Real loading
function imageLoaded() {
  loaded++;
  if (loaded >= total) {
    realDone = true;
    finishLoading();
  }
}

// Attach listeners
images.forEach(img => {
  if (!img.src) {
    imageLoaded();
    return;
  }

  if (img.complete && img.naturalWidth !== 0) {
    imageLoaded();
  } else {
    img.addEventListener("load", imageLoaded, { once: true });
    img.addEventListener("error", imageLoaded, { once: true });
  }
});

// Safety fallback
setTimeout(() => {
  realDone = true;
  finishLoading();
}, 8000);

// UI update
function updateText(value) {
  loadText.textContent = value + "%";
}

// Finish
function finishLoading() {
  const waitFake = setInterval(() => {
    if (fakeProgress >= 85 && realDone) {
      clearInterval(waitFake);

      updateText(100);

      setTimeout(() => {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
        startIntro(); // 👈 THIS is important
      }, 400);
    }
  }, 50);
}

// Always start at top on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.body.style.overflow = "hidden";

const loader = document.getElementById("loader");
const loadText = document.getElementById("loadText");

const images = Array.from(document.images);
let loaded = 0;
const total = images.length;

// Prevent scroll during load
document.body.style.overflow = "hidden";

function updateProgress() {
  const percent = Math.round((loaded / total) * 100);
  loadText.textContent = percent + "%";
}

function imageLoaded() {
  loaded++;
  updateProgress();

  if (loaded === total) {
    allLoaded();
  }
}

// Handle images
if (total === 0) {
  allLoaded();
} else {
  images.forEach(img => {
    if (img.complete) {
      imageLoaded();
    } else {
      img.addEventListener("load", imageLoaded);
      img.addEventListener("error", imageLoaded);
    }
  });
}

function allLoaded() {
  // small delay so 100% is visible
  setTimeout(() => {
    loader.classList.add("hidden");

    // allow scroll again
    // document.body.style.overflow = "";

    startIntro(); // 👈 trigger your intro AFTER loading
  }, 400);
}


/* INTRO SEQUENCE */
function startIntro() {
// Fade IN logo image
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

    }, 10000);

    // Slide intro away
    setTimeout(() => {
        intro.style.top = "-100vh";
        // page.classList.remove("hidden");
    }, 3600);
    setTimeout(() => {
        page.classList.remove("hidden");
    }, 4400);
    setTimeout(() => {
      document.querySelector(".site-header").classList.add("show");
      }, 4700);

});
document.body.style.overflow = "";

/* PANEL LOGIC */
function startIntro() {
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
      millie:`<h2>ZTM</h2>
      <p>ZTM lore and info here.</p>`,
      enna:`<h2>ZTM</h2>
      <p>ZTM lore and info here.</p>`,
      petra:`<h2>ZTM</h2>
      <p>ZTM lore and info here.</p>`,
      
      vox: `<h2>ILN</h2>
      <p>ILN group description.</p>`,
      luca:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      shu:`<h2>ILN</h2>
      <p>ILN group description.</p>`,

      sonny:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      alban:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      uki:`<h2>ILN</h2>
      <p>ILN group description.</p>`,

      maria:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      aia:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      scarle:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      ren:`<h2>ILN</h2>
      <p>ILN group description.</p>`,

      ver:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      doppy:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      melo:`<h2>ILN</h2>
      <p>ILN group description.</p>`,

      zali:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      vanta:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      willy:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      claude:`<h2>ILN</h2>
      <p>ILN group description.</p>`,

      ronin:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      klara:`<h2>ILN</h2>
      <p>ILN group description.</p>`,

      zeal:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      freo:`<h2>ILN</h2>
      <p>ILN group description.</p>`,
      seible:`<h2>ILN</h2>
      <p>ILN group description.</p>`,            
      kaelix: `<h2>BTB</h2>
      <p>BTB information.</p>
      <div class="panel-gallery">
        <img src="images/Khong_Co_Tieu_e577.png">
      </div>`
    };
  
    // Attach click events to all cards
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id; // direct from data-id
        // const img = card.dataset.img;
        panelContent.innerHTML = contentMap[id] || "<h2>Unknown</h2><p>No content available.</p>";
        // panelContent.innerHTML= '<h2>${id.toUpperCase()}</h2><img class="panel-img" src="${img}">';
  
        const glowColor = getComputedStyle(card).getPropertyValue("--glow-color").trim();
        if (glowColor) {
          panel.style.setProperty("--panel-glow", glowColor);
        } else {
          panel.style.removeProperty("--panel-glow");
        }
  
        overlay.classList.add("active");
        document.body.classList.add("panel-open");
      });
    });
  
    // Close panel
    function closePanel() {
      overlay.classList.remove("active");
      document.body.classList.remove("panel-open");
    }
    closeBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", e => { if (e.target === overlay) closePanel(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closePanel(); });
  
  });

  // Smooth scroll with easing for header nav
function smoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

 function easeInOutQuart(t) {
    return t < 0.1
      ? 5 * t * t * t * t
      : 1 - Math.pow(-1 * t + 1, 3) / 2;
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

    const headerHeight =
      document.querySelector(".site-header")?.offsetHeight || 0;

    const targetY =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    smoothScrollTo(targetY, 550);
  });
});

/* ARTIST SLIDER (MANUAL) */
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