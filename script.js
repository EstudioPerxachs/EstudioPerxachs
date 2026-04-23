const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-form");

/* HEADER SCROLL */
window.addEventListener("scroll", () => {
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

/* MOBILE MENU */
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}

/* REVEAL ON SCROLL */
function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  reveals.forEach(element => {
    const boxTop = element.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* CONTACT FORM */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Gracias por tu consulta. Este formulario está listo para conectarse con email o backend.");
  });
}

/* HERO SLIDER */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".indicator");

  const heroTextBox = document.getElementById("heroTextBox");
  const heroEyebrow = document.getElementById("heroEyebrow");
  const heroTitle = document.getElementById("heroTitle");
  const heroDescription = document.getElementById("heroDescription");
  const heroPrimaryBtn = document.getElementById("heroPrimaryBtn");
  const heroSecondaryBtn = document.getElementById("heroSecondaryBtn");

  if (!slides.length || !heroTextBox) return;

  const slideContent = [
    {
      eyebrow: "Confianza, estrategia y cercanía",
      title: "Una presencia digital moderna para P&A",
      description:
        "Acompañamos a empresas, profesionales y contribuyentes con una mirada integral, combinando organización, seguimiento y asesoramiento contable en un entorno claro, profesional y preparado para crecer.",
      primaryText: "Ver área impositiva",
      primaryLink: "impositivo.html",
      secondaryText: "Contactanos",
      secondaryLink: "contacto.html"
    },
    {
      eyebrow: "Orden y cumplimiento",
      title: "Seguimiento impositivo con visión profesional",
      description:
        "Centralizá vencimientos, obligaciones fiscales, novedades normativas y servicios tributarios en un espacio claro, elegante y pensado para brindar confianza.",
      primaryText: "Explorar impositivo",
      primaryLink: "impositivo.html",
      secondaryText: "Ver calendario",
      secondaryLink: "calendario.html"
    },
    {
      eyebrow: "Control y planificación",
      title: "Auditorías, fechas clave y gestión organizada",
      description:
        "Mostrá revisiones, controles internos, cronogramas y documentación relevante con una estructura preparada para escalar junto al estudio.",
      primaryText: "Ver auditorías",
      primaryLink: "auditorias.html",
      secondaryText: "Escribinos",
      secondaryLink: "contacto.html"
    }
  ];

  let currentSlide = 0;
  let sliderInterval = null;
  let isAnimating = false;

  function setTextContent(index) {
    const content = slideContent[index];

    if (heroEyebrow) heroEyebrow.textContent = content.eyebrow;
    if (heroTitle) heroTitle.textContent = content.title;
    if (heroDescription) heroDescription.textContent = content.description;

    if (heroPrimaryBtn) {
      heroPrimaryBtn.textContent = content.primaryText;
      heroPrimaryBtn.href = content.primaryLink;
    }

    if (heroSecondaryBtn) {
      heroSecondaryBtn.textContent = content.secondaryText;
      heroSecondaryBtn.href = content.secondaryLink;
    }
  }

  function animateTextChange(index) {
    if (isAnimating) return;
    isAnimating = true;

    heroTextBox.classList.add("text-changing");
    heroTextBox.classList.remove("text-visible");

    setTimeout(() => {
      setTextContent(index);

      heroTextBox.classList.remove("text-changing");
      heroTextBox.classList.add("text-visible");

      setTimeout(() => {
        isAnimating = false;
      }, 450);
    }, 250);
  }

  function updateSlider(index, animateText = true) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === index);
    });

    if (animateText) {
      animateTextChange(index);
    } else {
      setTextContent(index);
      heroTextBox.classList.add("text-visible");
    }

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    updateSlider(nextIndex, true);
  }

  function startSlider() {
    stopSlider();
    sliderInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  }

  if (indicators.length) {
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        if (index === currentSlide) return;
        updateSlider(index, true);
        startSlider();
      });
    });
  }

  updateSlider(0, false);
  startSlider();
});