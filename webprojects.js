/* ─────────────────────────────────────────────
   webprojects.js
   – Entrance IntersectionObserver (same as skills)
   – 3D Magnetic Tilt (same as skills)
   – Scatter particle burst on hover
   – iframe click → open live site in new tab
───────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {

    /* ══════════════════════════════════════
       1. ENTRANCE OBSERVER
    ══════════════════════════════════════ */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const card = entry.target;
            const idx  = parseInt(card.dataset.index);
            setTimeout(() => card.classList.add("in-view"), idx * 150);
            observer.unobserve(card);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".wp-card").forEach(c => observer.observe(c));


    /* ══════════════════════════════════════
       2. 3D MAGNETIC TILT
    ══════════════════════════════════════ */
    document.querySelectorAll(".wp-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) / (rect.width  / 2);
            const dy   = (e.clientY - cy) / (rect.height / 2);

            const rotX = (-dy * 10).toFixed(2);
            const rotY = ( dx * 10).toFixed(2);
            const gX   = (50 + dx * 30).toFixed(1);
            const gY   = (50 + dy * 30).toFixed(1);

            card.style.transform =
                `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;

            card.querySelector(".wp-card-glow").style.background =
                `radial-gradient(circle at ${gX}% ${gY}%, rgba(255,106,0,0.22), transparent 65%)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.querySelector(".wp-card-glow").style.background = "";
        });
    });


    /* ══════════════════════════════════════
       3. SCATTER PARTICLE BURST
    ══════════════════════════════════════ */
    const canvas  = document.getElementById("scatter-canvas");
    const ctx     = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const COLORS = ["#ff6a00", "#ee0979", "#8e2de2", "#ff8c40", "#c44dff", "#ff3d6e"];

    class Particle {
        constructor(x, y) {
            this.x  = x;
            this.y  = y;
            this.vx = (Math.random() - 0.5) * 6;
            this.vy = (Math.random() - 0.5) * 6 - 2;
            this.alpha = 1;
            this.size  = Math.random() * 4 + 1.5;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.decay = Math.random() * 0.018 + 0.012;
            // shape: circle or square
            this.shape = Math.random() > 0.5 ? "circle" : "square";
        }

        update() {
            this.x     += this.vx;
            this.y     += this.vy;
            this.vy    += 0.12;   // gravity
            this.vx    *= 0.98;   // drag
            this.alpha -= this.decay;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(this.alpha, 0);
            ctx.fillStyle   = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur  = 6;

            if (this.shape === "circle") {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
            }
            ctx.restore();
        }
    }

    function spawnBurst(x, y, count = 28) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* Trigger burst on card hover enter */
    document.querySelectorAll(".wp-card").forEach(card => {
        card.addEventListener("mouseenter", e => {
            const rect = card.getBoundingClientRect();
            // burst from all 4 corners
            const corners = [
                { x: rect.left,             y: rect.top              },
                { x: rect.right,            y: rect.top              },
                { x: rect.left,             y: rect.bottom           },
                { x: rect.right,            y: rect.bottom           },
                { x: rect.left + rect.width / 2, y: rect.top        },
            ];
            corners.forEach(c => spawnBurst(c.x, c.y, 10));
        });

        /* Extra burst on click */
        card.addEventListener("click", e => {
            spawnBurst(e.clientX, e.clientY, 40);
        });
    });


    /* ══════════════════════════════════════
       4. CLICK IFRAME PREVIEW → OPEN LIVE
    ══════════════════════════════════════ */
    document.querySelectorAll(".wp-preview").forEach(preview => {
        const card = preview.closest(".wp-card");
        const liveBtn = card.querySelector(".wp-btn-live");
        if (!liveBtn) return;

        preview.style.cursor = "pointer";
        preview.addEventListener("click", () => {
            window.open(liveBtn.href, "_blank", "noopener,noreferrer");
            spawnBurst(
                preview.getBoundingClientRect().left + preview.offsetWidth  / 2,
                preview.getBoundingClientRect().top  + preview.offsetHeight / 2,
                50
            );
        });
    });

});
