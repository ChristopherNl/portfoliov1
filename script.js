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