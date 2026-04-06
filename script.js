/* -----------------------------
   NAVIGATION MOBILE + ACCESSIBILITY
   ----------------------------- */
const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let focusableElements = [];
let firstEl, lastEl;

function openMenu() {
    navLinks.classList.add("active");
    toggle.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    navLinks.removeAttribute("hidden");

    focusableElements = navLinks.querySelectorAll("a");
    firstEl = focusableElements[0];
    lastEl = focusableElements[focusableElements.length - 1];
    firstEl.focus();
    document.addEventListener("keydown", trapFocus);
}

function closeMenu() {
    navLinks.classList.remove("active");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    navLinks.setAttribute("hidden", "");
    toggle.focus();
    document.removeEventListener("keydown", trapFocus);
}

toggle.addEventListener("click", () => {
    navLinks.classList.contains("active") ? closeMenu() : openMenu();
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

function trapFocus(e) {
    if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
        }
    }
    if (e.key === "Escape") {
        closeMenu();
    }
}


/* -----------------------------
   FORMULAIRE CONTACT
   ----------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contacts-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Contact envoyé à Formspree');
        });
    }
});


/* -----------------------------
   MODAL POP-UP DES PROJETS (2x2 CARDS)
   ----------------------------- */
// 1. Données de tes projets
const projectData = {
    project1: {
        title: "Projet 1",
          media: [
            { type: "image", src: "img/Overlays Jinx.png" },
            { type: "video", src: "img/Overlay game.mp4" },
            { type: "image", src: "img/travail1-2.png" }
        ],
        description: "Description détaillée de ton projet 1..."
    },
    project2: {
        title: "Projet 2",
        images: [
            "img/travail2-1.png",
            "img/travail2-2.png"
        ],
        description: "Description détaillée de ton projet 2."
    },
     project3: {
        title: "Projet 3",
        images: [
            "img/3-1.png",
            "img/3-2.png"
        ],
        description: "Description détaillée de ton projet 3."
    },
    project4: {
        title: "Projet 4",
        images: [
            "img/4-1.png",
            "img/4-2.png"
        ],
        description: "Description détaillée de ton projet 4."
    }
};

// 2. Ouverture du modal (dans les cards 2x2)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn.open-project").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            const card = btn.closest(".travaux-card-box");
            const projectId = card.dataset.project;

            if (!projectId || !projectData[projectId]) {
                return;
            }

            const data = projectData[projectId];
            const modal = document.getElementById("project-modal");
            const slides = modal.querySelectorAll(".modal-slides .slide");
            const heading = modal.querySelector(".modal-description h4");
            const text = modal.querySelector(".modal-description p");

            // Vider / reset chaque slide puis remplir selon media ou images
            slides.forEach((slide, i) => {
                // Si le projet utilise media (avec type image/video) OU images classiques
                const media = data.media 
                    ? data.media[i] 
                    : (data.images && data.images[i] 
                        ? { type: "image", src: data.images[i] } 
                        : null);

                if (!media) {
                    slide.style.display = "none";
                    return;
                }

                slide.style.display = "block";

                if (media.type === "image") {
                    slide.innerHTML = `<img src="${media.src}" alt="">`;
                } else if (media.type === "video") {
                    slide.innerHTML = `
                        <video controls autoplay muted width="100%" height="240">
                            <source src="${media.src}" type="video/mp4">
                            Votre navigateur ne supporte pas la vidéo.
                        </video>
                    `;
                }
            });

            // Met à jour le texte
            heading.textContent = data.title;
            text.textContent = data.description;

            // Ouvre le modal
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });
});
// 3. Fermer le modal
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("project-modal");
    const closeBtn = modal.querySelector(".close-modal");

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});

/*document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }, 4000);
});*/