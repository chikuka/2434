const intro = document.querySelector(".intro");
const page = document.querySelector(".page");

const logoSpans = document.querySelectorAll(".logo-parts");
const logoImage = document.querySelector(".logo-image");
const dividerImage = document.querySelector(".divider-img");

/* INTRO SEQUENCE */
window.addEventListener("DOMContentLoaded", () => {
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
    }, 4500);

//   setTimeout(() => {
//     logoSpans.forEach(span => {
//       span.classList.remove("active");
//       span.classList.add("fade");
//     });

//     logoImage.classList.add("fade");
//     dividerImage.classList.add("fade");
//   }, 10000);

//   setTimeout(() => {
//     intro.style.top = "-100vh";
//     page.classList.remove("hidden");
//   }, 10000);
});

/* PANEL LOGIC */
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const panel = document.getElementById("panel");
    const panelContent = document.getElementById("panelContent");
    const closeBtn = document.getElementById("closeBtn");
    
    const contentMap = {
      lzt: `
      <h2>LZT</h2>
      <p>This is scrollable content for LZT.</p>
      <div class="panel-gallery">
        <img src="images/LOGO.png">
        <img src="images/HOA.png">
      </div>
      `,
      
      ztm: `<h2>ZTM</h2><p>ZTM lore and info here.</p>`,
      
      lxm: `<h2>LXM</h2><p>LXM description.</p>`,
      
      ntx: `<h2>NTX</h2><p>NTX profile and background.</p>`,
      
      iln: `<h2>ILN</h2><p>ILN group description.</p>`,
      
      xsl: `<h2>XSL</h2><p>XSL information.</p>`,
      
      krs: `<h2>KRS</h2><p>KRS profile.</p>`,
      
      dnt: `<h2>DNT</h2><p>DNT information.</p>`,
      
      btb: `<h2>BTB</h2><p>BTB information.</p>`
    };
  
    // Attach click events to all cards
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id; // direct from data-id
        const img = card.dataset.img;
        panelContent.innerHTML = contentMap[id] || "<h2>Unknown</h2><p>No content available.</p>";
  
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
