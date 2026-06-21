// ================= SUPABASE INIT =================
const { createClient } = supabase;

const SUPABASE_URL = "https://imrwnoyinickrmoonkts.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltcndub3lpbmlja3Jtb29ua3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NjYwMzYsImV4cCI6MjA5NDU0MjAzNn0.Y7PcGBRvOI3UrTo7uSeMnI8z9SV6r5R2TVhgJAsx6n8";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

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

    const icon = hamburgerBtn.querySelector("i");
    if (icon) {
      icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    }
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("mobile-menu-active");
      const icon = hamburgerBtn.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  });

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
    window.open(`https://wa.me/91-xxxxxxxxxxxxxxxx?text=${message}`, "_blank");
  });
});

// =================== PROJECT FILTER + VIDEO HOVER ===================
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

  // ── EXPLORE LINK ──
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

// ==============================================
//   FEEDBACK SYSTEM — SUPABASE VERSION
// ==============================================

const AVATAR_COLORS = [
  "#7c3aed", "#0891b2", "#be185d",
  "#b45309", "#15803d", "#c2410c",
  "#0e7490", "#7e22ce"
];

// ── DATABASE HELPERS ──────────────────────────

async function feedbackLoadAll() {
  try {
    const { data, error } = await supabaseClient
      .from("reviews")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Load error:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("Unexpected load error:", err);
    return [];
  }
}

async function feedbackAddEntry(entry) {
  try {
    const { data, error } = await supabaseClient
      .from("reviews")
      .insert([entry])
      .select(); // return inserted row so we can confirm

    if (error) {
      console.error("Insert error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Unexpected insert error:", err);
    return false;
  }
}

// ── Utilities ────────────────────────────────

function getInitials(name) {
  return name
    .split(" ")
    .map(w => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name) {
  let hash = 0;
  for (const ch of name) {
    hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function starString(n) {
  return n > 0
    ? "★".repeat(n) + "☆".repeat(5 - n)
    : "☆☆☆☆☆";
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

// ── Stars builder ─────────────────────────────

let currentRating = 0;

function buildModalStars() {
  const row = document.getElementById("starRow");
  if (!row) return;

  row.innerHTML = "";

  const labels = ["Terrible", "Poor", "Okay", "Good", "Excellent"];

  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.className = "fb-star" + (i <= currentRating ? " lit" : "");
    btn.textContent = "★";
    btn.type = "button";
    btn.setAttribute("aria-label", `${i} star – ${labels[i - 1]}`);

    btn.addEventListener("click", () => {
      currentRating = i;
      buildModalStars();
    });

    btn.addEventListener("mouseenter", () => {
      row.querySelectorAll(".fb-star").forEach((s, j) => {
        s.classList.toggle("lit", j < i);
      });
    });

    btn.addEventListener("mouseleave", () => {
      row.querySelectorAll(".fb-star").forEach((s, j) => {
        s.classList.toggle("lit", j < currentRating);
      });
    });

    row.appendChild(btn);
  }
}

// ── Character counter ─────────────────────────

function updateCharCount() {
  const textarea = document.getElementById("fb-message");
  const counter  = document.getElementById("charCount");
  if (!textarea || !counter) return;

  const max = textarea.maxLength > 0 ? textarea.maxLength : 500;
  const len = textarea.value.length;

  counter.textContent = `${len} / ${max}`;
  counter.classList.toggle("fb-char-warn", len >= max * 0.9);
}

// ── Tag selection ─────────────────────────────

let selectedTag = "";

function initTagButtons() {
  document.querySelectorAll(".fb-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;
      selectedTag = tag === selectedTag ? "" : tag;
      document.querySelectorAll(".fb-tag").forEach(b => {
        b.classList.toggle("active", b.dataset.tag === selectedTag);
      });
    });
  });
}

// ── Modal open / close ────────────────────────

function openFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (modal) modal.classList.add("active");
}

function closeFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (modal) modal.classList.remove("active");
}

// ── Submit handler ────────────────────────────

async function handleFeedbackSubmit() {
  // Honeypot check: real visitors never see or fill this field.
  // If it's filled, silently pretend to succeed so bots don't adapt.
  const honeypot = document.getElementById("fb-website")?.value || "";
  if (honeypot.trim() !== "") {
    document.getElementById("feedbackForm")?.reset();
    closeFeedbackModal();
    return;
  }

  const name    = (document.getElementById("fb-name")?.value    || "").trim();
  const role    = (document.getElementById("fb-role")?.value    || "").trim();
  const message = (document.getElementById("fb-message")?.value || "").trim();

  if (!name || !message) {
    if (!name) document.getElementById("fb-name")?.focus();
    else       document.getElementById("fb-message")?.focus();
    return;
  }

  // Disable button while saving
  const submitBtn = document.getElementById("fbSubmit");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
  }

  const entry = {
    name,
    role,
    rating: currentRating,
    tag: selectedTag,
    msg: message,
    time: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
  };

  const ok = await feedbackAddEntry(entry);

  // Re-enable button
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Review ✦";
  }

  if (!ok) {
    const errorEl = document.getElementById("errorMessage");
    if (errorEl) {
      errorEl.classList.add("show");
      setTimeout(() => errorEl.classList.remove("show"), 3500);
    }
    return;
  }

  // Reset form
  document.getElementById("fb-name").value    = "";
  document.getElementById("fb-role").value    = "";
  document.getElementById("fb-message").value = "";
  currentRating = 0;
  selectedTag   = "";
  buildModalStars();
  document.querySelectorAll(".fb-tag").forEach(b => b.classList.remove("active"));
  document.getElementById("errorMessage")?.classList.remove("show");
  updateCharCount();

  // Show success message, then close and refresh
  const success = document.getElementById("successMessage");
  if (success) {
    success.classList.add("show");
    setTimeout(async () => {
      success.classList.remove("show");
      closeFeedbackModal();
      await renderReviewsSection();
    }, 2000);
  }
}

// ── Reviews section renderer ──────────────────

let allReviews          = [];
const REVIEWS_PAGE_SIZE = 6;
let reviewsVisibleCount  = REVIEWS_PAGE_SIZE;

function reviewCardHtml(item) {
  return `
    <div class="review-item">
      <div class="review-item-top">
        <div class="review-avatar" style="background:${getAvatarColor(item.name)}">
          ${escapeHtml(getInitials(item.name))}
        </div>
        <div>
          <div class="review-name">${escapeHtml(item.name)}</div>
          <div class="review-role">${escapeHtml(item.role || "")}</div>
        </div>
      </div>
      <div class="review-stars">${starString(item.rating)}</div>
      <div class="review-text">${escapeHtml(item.msg)}</div>
      ${item.tag ? `<span class="review-category">${escapeHtml(item.tag)}</span>` : ""}
      <div class="review-time">${escapeHtml(item.time || "")}</div>
    </div>
  `;
}

function renderVisibleReviewCards() {
  const grid    = document.getElementById("reviewsGrid");
  const moreBtn = document.getElementById("showMoreReviews");
  if (!grid) return;

  const visible = allReviews.slice(0, reviewsVisibleCount);
  grid.innerHTML = visible.map(reviewCardHtml).join("");

  if (moreBtn) {
    const remaining = allReviews.length - reviewsVisibleCount;
    if (remaining > 0) {
      moreBtn.style.display = "inline-flex";
      moreBtn.textContent   = `Show more (${remaining} more)`;
    } else {
      moreBtn.style.display = "none";
    }
  }
}

async function renderReviewsSection() {
  const grid    = document.getElementById("reviewsGrid");
  const avgEl   = document.getElementById("avgScore");
  const starsEl = document.getElementById("avgStars");
  const countEl = document.getElementById("revCount");
  const section = document.getElementById("reviews");
  const moreBtn = document.getElementById("showMoreReviews");

  if (!grid) return;

  // Show loading state
  grid.innerHTML = `<div class="reviews-empty">Loading reviews…</div>`;
  if (moreBtn) moreBtn.style.display = "none";

  const all = await feedbackLoadAll();
  allReviews          = all;
  reviewsVisibleCount  = REVIEWS_PAGE_SIZE;

  // Always keep section visible
  if (section) section.style.display = "block";

  if (!all.length) {
    if (avgEl)   avgEl.textContent   = "—";
    if (starsEl) starsEl.textContent = "☆☆☆☆☆";
    if (countEl) countEl.textContent = "0 reviews";
    grid.innerHTML = `<div class="reviews-empty">No reviews yet — be the first one ✨</div>`;
    return;
  }

  // Compute average
  const rated = all.filter(f => f.rating > 0);
  const avg   = rated.length
    ? rated.reduce((s, f) => s + f.rating, 0) / rated.length
    : 0;

  if (avgEl)   avgEl.textContent   = avg ? avg.toFixed(1) : "—";
  if (starsEl) starsEl.textContent = avg ? starString(Math.round(avg)) : "☆☆☆☆☆";
  if (countEl) countEl.textContent = `${all.length} review${all.length !== 1 ? "s" : ""}`;

  // Render cards (first page)
  renderVisibleReviewCards();
}

// ── Boot ──────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const openBtn   = document.getElementById("openFeedback");
  const closeBtn  = document.getElementById("closeFeedback");
  const overlay   = document.getElementById("feedbackModal");
  const form      = document.getElementById("feedbackForm");
  const messageEl = document.getElementById("fb-message");
  const moreBtn   = document.getElementById("showMoreReviews");

  if (openBtn)  openBtn.addEventListener("click", openFeedbackModal);
  if (closeBtn) closeBtn.addEventListener("click", closeFeedbackModal);

  if (form) {
    // Listen on the form's submit event (not just the button's click) so
    // pressing Enter in any field is handled the same way as clicking Send.
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFeedbackSubmit();
    });
  }

  if (messageEl) messageEl.addEventListener("input", updateCharCount);

  if (moreBtn) {
    moreBtn.addEventListener("click", () => {
      reviewsVisibleCount += REVIEWS_PAGE_SIZE;
      renderVisibleReviewCards();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeFeedbackModal();
    });
  }

  updateCharCount();
  buildModalStars();
  initTagButtons();
  renderReviewsSection();
});

// ── SKILL CARDS: 3D TILT + PROGRESS COUNTER ──
document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card   = entry.target;
      const idx    = parseInt(card.dataset.index);
      const fill   = card.querySelector(".progress-fill");
      const pct    = card.querySelector(".skill-percent");
      const target = parseInt(pct?.dataset.target || "0");

      setTimeout(() => {
        card.classList.add("in-view");

        setTimeout(() => {
          if (fill) fill.style.width = fill.dataset.width;

          let count = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            count = Math.min(count + step, target);
            if (pct) pct.textContent = count + "%";
            if (count >= target) clearInterval(timer);
          }, 25);
        }, 400);

      }, idx * 130);

      observer.unobserve(card);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".skill-card").forEach(c => observer.observe(c));

  // ── 3D Magnetic Tilt ──
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
      const glow = card.querySelector(".card-glow");
      if (glow) glow.style.background =
        `radial-gradient(circle at ${gX}% ${gY}%, rgba(255,106,0,0.22), transparent 65%)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      const glow = card.querySelector(".card-glow");
      if (glow) glow.style.background = "";
    });
  });
});
