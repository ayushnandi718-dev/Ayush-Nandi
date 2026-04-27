// ================= HERO TYPING =================
const text = "AYUSH NANDI";
const afterText = ", a video editor";

function typeEffect() {
  const typingEl = document.querySelector(".typing");
  const afterEl  = document.querySelector(".after-text");

  if (!typingEl || !afterEl || typingEl.dataset.done) return;

  let index = 0, afterIndex = 0;

  function type() {
    if (index < text.length) {
      typingEl.textContent += text.charAt(index++);
      setTimeout(type, 80);
    } else if (afterIndex < afterText.length) {
      afterEl.textContent += afterText.charAt(afterIndex++);
      setTimeout(type, 60);
    } else {
      typingEl.dataset.done = "true";
    }
  }
  type();
}

// ================= MAP HEADING =================
function mapTypingEffect() {
  const el = document.querySelector(".map-typing");
  if (!el || el.dataset.done) return;

  const mapText = "Connecting Clients Across The World 🌍";
  let i = 0;

  function type() {
    if (i < mapText.length) {
      el.textContent += mapText.charAt(i++);
      setTimeout(type, 70);
    } else {
      el.dataset.done = "true";
    }
  }
  type();
}

// ================= SCROLL REVEAL =================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// ================= RIPPLE =================
function addRipple(e) {
  const target = e.currentTarget;
  const ripple = document.createElement("span");
  const size   = Math.max(target.offsetWidth, target.offsetHeight);
  const rect   = target.getBoundingClientRect();

  ripple.classList.add("ripple");
  ripple.style.width  = ripple.style.height = size + "px";
  ripple.style.left   = e.clientX - rect.left - size / 2 + "px";
  ripple.style.top    = e.clientY - rect.top  - size / 2 + "px";

  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

// ================= NAV ACTIVE =================
function setActiveNavLink() {
  const current = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }

    if (!link.dataset.rippleAttached) {
      link.addEventListener("click", addRipple);
      link.dataset.rippleAttached = "true";
    }
  });
}

// ================= HAMBURGER MENU =================
function initHamburger() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu   = document.getElementById("mobile-menu");

  if (!hamburgerBtn || !mobileMenu) return;

  hamburgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = mobileMenu.classList.toggle("mobile-menu-active");

    // Swap icon: bars ↔ xmark
    const icon = hamburgerBtn.querySelector("i");
    if (icon) {
      icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  });

  // Close menu when a link inside is clicked
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("mobile-menu-active");
      const icon = hamburgerBtn.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("mobile-menu-active") &&
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      mobileMenu.classList.remove("mobile-menu-active");
      const icon = hamburgerBtn.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    }
  });
}

// ================= MAP =================
function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined" || mapEl._leaflet_id) return;

  const myLocation = [26.50, 89.52];

  const map = L.map("map", {
    zoomControl: false,
    attributionControl: false
  }).setView(myLocation, 3);

  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png").addTo(map);

  L.marker(myLocation).addTo(map)
    .bindPopup("Ayush Nandi 📍")
    .openPopup();

  const clients = [
    { name: "Delhi",  coords: [28.61,  77.23] },
    { name: "Mumbai", coords: [19.07,  72.87] },
    { name: "Dubai",  coords: [25.20,  55.27] },
    { name: "London", coords: [51.50,  -0.12] }
  ];

  clients.forEach(client => {
    L.marker(client.coords).addTo(map)
      .bindPopup(`Client: ${client.name}`);

    if (L.polyline.antPath) {
      L.polyline.antPath([myLocation, client.coords], {
        color: "#00f5ff", weight: 3, opacity: 0.8,
        dashArray: [10, 20], delay: 1000, pulseColor: "#ffffff"
      }).addTo(map);
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLocation = [position.coords.latitude, position.coords.longitude];

      const userIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30]
      });

      L.marker(userLocation, { icon: userIcon }).addTo(map)
        .bindPopup("You are here 📍");

      map.setView(userLocation, 5);

      L.polyline([userLocation, myLocation], {
        color: "#00f5ff", weight: 2, dashArray: "5,10"
      }).addTo(map);
    });
  }

  let zoomLevel = 3;
  setInterval(() => {
    zoomLevel = zoomLevel === 3 ? 4 : 3;
    map.setZoom(zoomLevel);
  }, 4000);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  mapTypingEffect();
  revealOnScroll();
  setActiveNavLink();
  initMap();
  initHamburger();

  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("active"), i * 120);
  });
});

// ================= WHATSAPP BUTTON =================
document.querySelectorAll(".get-touch-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const message = encodeURIComponent("Hi Ayush, I want to work with you!");
    window.open(`https://wa.me/919563316500?text=${message}`, "_blank");
  });
});

//==================Project============================
// ================= FILTER + VIDEO HOVER =================
document.addEventListener("DOMContentLoaded", () => {

    // ── FILTER BUTTONS ──
    const buttons = document.querySelectorAll(".filter-btn");
    const cards   = document.querySelectorAll(".project-card");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                card.style.display =
                    (filter === "all" || filter === card.dataset.category)
                    ? "block"
                    : "none";
            });
        });
    });

    // ── VIDEO HOVER PLAY ──
    document.querySelectorAll(".project-card video").forEach(video => {
        video.addEventListener("mouseenter", () => video.play());
        video.addEventListener("mouseleave", () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // ── EXPLORE LINK (filter-aware) ──
    const exploreLink = document.getElementById("exploreLink");
    const links = {
        all:     "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
        reels:   "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
        youtube: "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
        ads:     "https://drive.google.com/drive/folders/1URT6phaLJU0rGzLwVT2z7jC5vx2NTwCe?usp=sharing",
    };

    if (exploreLink) {
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                exploreLink.href = links[btn.dataset.filter] || links.all;
            });
        });
    }

});


/* ── SKILL CARDS: 3D TILT + PROGRESS COUNTER ── */
document.addEventListener("DOMContentLoaded", () => {

    /* ── Intersection Observer: trigger when cards enter viewport ── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const card = entry.target;
            const idx  = parseInt(card.dataset.index);
            const fill = card.querySelector(".progress-fill");
            const pct  = card.querySelector(".skill-percent");
            const target = parseInt(pct.dataset.target);

            /* staggered entrance */
            setTimeout(() => {
                card.classList.add("in-view");

                /* animate progress bar */
                setTimeout(() => {
                    fill.style.width = fill.dataset.width;

                    /* count-up number */
                    let count = 0;
                    const step = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        count = Math.min(count + step, target);
                        pct.textContent = count + "%";
                        if (count >= target) clearInterval(timer);
                    }, 25);
                }, 400);

            }, idx * 130);

            observer.unobserve(card);
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".skill-card").forEach(c => observer.observe(c));

    /* ── 3D Magnetic Tilt ── */
    document.querySelectorAll(".skill-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);

            const rotX = (-dy * 12).toFixed(2);
            const rotY = ( dx * 12).toFixed(2);
            const gX   = (50 + dx * 30).toFixed(1);
            const gY   = (50 + dy * 30).toFixed(1);

            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`;
            card.querySelector(".card-glow").style.background =
                `radial-gradient(circle at ${gX}% ${gY}%, rgba(255,106,0,0.22), transparent 65%)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.querySelector(".card-glow").style.background = "";
        });
    });
});
