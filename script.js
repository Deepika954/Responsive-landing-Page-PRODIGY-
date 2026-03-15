(function () {
  "use strict";
  const navbar      = document.getElementById("navbar");
  const navLinks    = document.querySelectorAll(".nav-link");
  const navMenu     = document.getElementById("navLinks");
  const hamburger   = document.getElementById("hamburger");
  const sections    = document.querySelectorAll("section[id]");
  const sendBtn     = document.getElementById("sendBtn");

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveLink();
  }

  function updateActiveLink() {
    let currentId = "";
    sections.forEach((section) => {
      const top    = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");
      if (href === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !navbar.contains(e.target) &&
      navMenu.classList.contains("open")
    ) {
      navMenu.classList.remove("open");
      hamburger.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
  function addRevealClasses() {
    const targets = document.querySelectorAll(
      ".about-card, .service-card, .work-card, .hero-stats .stat, .section-label, .about-text p, .contact-sub"
    );
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });
  }

  function setupReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const name  = document.querySelector('input[type="text"]');
      const email = document.querySelector('input[type="email"]');
      const msg   = document.querySelector(".form-textarea");

      if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
        [name, email, msg].forEach((field) => {
          if (!field.value.trim()) {
            field.style.borderColor = "#f87171";
            field.style.animation = "shake 0.3s ease";
            setTimeout(() => {
              field.style.borderColor = "";
              field.style.animation = "";
            }, 600);
          }
        });
        return;
      }

      const originalText = sendBtn.textContent;
      sendBtn.textContent = "Message Sent! ✓";
      sendBtn.style.background = "#22c55e";
      sendBtn.disabled = true;

      setTimeout(() => {
        sendBtn.textContent = originalText;
        sendBtn.style.background = "";
        sendBtn.disabled = false;
        name.value = "";
        email.value = "";
        msg.value = "";
      }, 3000);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  const shakeStyle = document.createElement("style");
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(shakeStyle);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run on load

  addRevealClasses();
  setupReveal();

  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add("visible");
    });
  }, 200);

})();
