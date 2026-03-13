(() => {
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("main .section");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;

    let currentId = "home";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (y >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href").replace("#", "");
      if (target === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", y > 240);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".floor-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const floor = tab.dataset.floor;

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      panels.forEach((panel) => {
        if (panel.dataset.panel === floor) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  function ensureLightbox() {
    let lightbox = document.getElementById("imageLightbox");
    let lightboxImage = document.getElementById("lightboxImage");
    let lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImage && lightboxClose) {
      return { lightbox, lightboxImage, lightboxClose };
    }

    lightbox = document.createElement("div");
    lightbox.id = "imageLightbox";
    lightbox.className = "lightbox";
    lightbox.hidden = true;

    lightboxClose = document.createElement("button");
    lightboxClose.id = "lightboxClose";
    lightboxClose.className = "lightbox-close";
    lightboxClose.type = "button";
    lightboxClose.setAttribute("aria-label", "Close image");
    lightboxClose.textContent = "x";

    lightboxImage = document.createElement("img");
    lightboxImage.id = "lightboxImage";
    lightboxImage.alt = "Zoomed image preview";

    lightbox.appendChild(lightboxClose);
    lightbox.appendChild(lightboxImage);
    document.body.appendChild(lightbox);

    return { lightbox, lightboxImage, lightboxClose };
  }

  const { lightbox, lightboxImage, lightboxClose } = ensureLightbox();

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  const zoomableImages = document.querySelectorAll("img.zoomable");
  zoomableImages.forEach((image) => {
    image.style.cursor = "zoom-in";
    image.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "Zoomed image preview";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
})();