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
      millie:`<h2>ZTM</h2><p>ZTM lore and info here.</p>`,
      enna:`<h2>ZTM</h2><p>ZTM lore and info here.</p>`,
      petra:`<h2>ZTM</h2><p>ZTM lore and info here.</p>`,
      
      vox: `<h2>ILN</h2><p>ILN group description.</p>`,
      luca:`<h2>ILN</h2><p>ILN group description.</p>`,
      shu:`<h2>ILN</h2><p>ILN group description.</p>`,

      sonny:`<h2>ILN</h2><p>ILN group description.</p>`,
      alban:`<h2>ILN</h2><p>ILN group description.</p>`,
      uki:`<h2>ILN</h2><p>ILN group description.</p>`,

      maria:`<h2>ILN</h2><p>ILN group description.</p>`,
      aia:`<h2>ILN</h2><p>ILN group description.</p>`,
      scarle:`<h2>ILN</h2><p>ILN group description.</p>`,
      ren:`<h2>ILN</h2><p>ILN group description.</p>`,

      ver:`<h2>ILN</h2><p>ILN group description.</p>`,
      doppy:`<h2>ILN</h2><p>ILN group description.</p>`,
      melo:`<h2>ILN</h2><p>ILN group description.</p>`,

      zali:`<h2>ILN</h2><p>ILN group description.</p>`,
      vanta:`<h2>ILN</h2><p>ILN group description.</p>`,
      willy:`<h2>ILN</h2><p>ILN group description.</p>`,
      claude:`<h2>ILN</h2><p>ILN group description.</p>`,

      ronin:`<h2>ILN</h2><p>ILN group description.</p>`,
      clara:`<h2>ILN</h2><p>ILN group description.</p>`,

      zeal:`<h2>ILN</h2><p>ILN group description.</p>`,
      freo:`<h2>ILN</h2><p>ILN group description.</p>`,
      seible:`<h2>ILN</h2><p>ILN group description.</p>`,            
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
