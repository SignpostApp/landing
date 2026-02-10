"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WaitlistModal from "./WaitlistModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────
   Star Canvas — interactive GSAP-driven particle field
   • Scroll velocity modulates star drift speed
   • Stars gently follow the mouse cursor
   • Idle → golden-ratio spiral vortex (black hole)
   • Click → supernova explosion outward
   • Consumed stars respawn at edges (loop)
   ──────────────────────────────────────────────── */

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  baseSpeed: number;
  spiralTargetX: number;
  spiralTargetY: number;
  attractable: boolean; // false = background star, never pulled
}

function useStarCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── constants ── */
    const STAR_COUNT = 220;
    const GOLDEN_ANGLE = 137.508 * (Math.PI / 180);
    const CURSOR_FOLLOW_STRENGTH = 0.06; // gentle attraction toward cursor
    const CURSOR_FOLLOW_RADIUS = 300;
    const IDLE_DELAY = 2000;
    const VORTEX_LERP = 0.004; // how fast stars spiral inward (slow & gravitational)
    const VORTEX_RADIUS_SCALE = 0.6;
    const VORTEX_ATTRACT_RADIUS = 400; // only attract stars within this px of cursor
    const CONSUME_RADIUS = 8; // star is "eaten" by black hole
    const EXPLOSION_FORCE = 18; // outward velocity on click
    const FRICTION = 0.96; // velocity decay per frame

    /* ── mutable state ── */
    let animId: number;
    let scrollVelocity = 0;
    const mouse = { x: -9999, y: -9999 };
    let lastActivityTime = Date.now();
    let vortexProgress = 0;
    let isIdle = false;

    // explosion shockwave
    let shockwave = { active: false, x: 0, y: 0, radius: 0, opacity: 0 };

    const stars: Star[] = [];

    /* ── helpers ── */
    function makeStar(w: number, h: number, fromEdge = false): Star {
      let x: number, y: number;
      if (fromEdge) {
        // spawn at a random edge
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
          case 0: x = Math.random() * w; y = -5; break;       // top
          case 1: x = w + 5; y = Math.random() * h; break;    // right
          case 2: x = Math.random() * w; y = h + 5; break;    // bottom
          default: x = -5; y = Math.random() * h; break;      // left
        }
      } else {
        x = Math.random() * w;
        y = Math.random() * h;
      }
      return {
        x, y,
        vx: 0, vy: 0,
        r: Math.random() * 1.4 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        baseSpeed: Math.random() * 0.3 + 0.05,
        spiralTargetX: 0,
        spiralTargetY: 0,
        attractable: Math.random() > 0.4, // 60% attractable, 40% background
      };
    }

    function getCenter() {
      return {
        cx: mouse.x === -9999 ? canvas!.width / 2 : mouse.x,
        cy: mouse.y === -9999 ? canvas!.height / 2 : mouse.y,
      };
    }

    /* ── canvas resize ── */
    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    /* ── create initial stars ── */
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(makeStar(canvas.width, canvas.height));
    }

    /* ── compute golden-ratio spiral targets ── */
    function computeSpiralTargets(cx: number, cy: number) {
      const maxR = Math.min(canvas!.width, canvas!.height) * VORTEX_RADIUS_SCALE;
      for (let i = 0; i < stars.length; i++) {
        const frac = i / stars.length;
        const r = maxR * Math.sqrt(frac) * (0.05 + 0.95 * (1 - vortexProgress));
        const angle = i * GOLDEN_ANGLE;
        stars[i].spiralTargetX = cx + Math.cos(angle) * r;
        stars[i].spiralTargetY = cy + Math.sin(angle) * r;
      }
    }

    /* ── mark activity ── */
    function markActive() {
      lastActivityTime = Date.now();
      if (isIdle) isIdle = false;
    }

    /* ── mouse tracking ── */
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      markActive();
    }
    window.addEventListener("mousemove", onMouseMove);

    /* ── click → supernova explosion ── */
    function onClick(e: MouseEvent) {
      const ex = e.clientX;
      const ey = e.clientY;
      markActive();

      // blast all stars outward from click point
      for (const star of stars) {
        const dx = star.x - ex;
        const dy = star.y - ey;
        const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
        // force inversely proportional to distance (closer = stronger)
        const force = EXPLOSION_FORCE * Math.max(0.3, 1 - dist / 600);
        star.vx += (dx / dist) * force;
        star.vy += (dy / dist) * force;
      }

      // trigger shockwave ring
      shockwave = { active: true, x: ex, y: ey, radius: 0, opacity: 0.6 };
    }
    window.addEventListener("click", onClick);

    /* ── scroll velocity via ScrollTrigger ── */
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        scrollVelocity = Math.abs(self.getVelocity());
        markActive();
      },
    });

    /* ── main draw loop ── */
    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      const now = Date.now();
      const timeSinceActivity = now - lastActivityTime;
      const { cx, cy } = getCenter();

      /* ── idle detection & vortex ramp ── */
      if (timeSinceActivity > IDLE_DELAY) {
        if (!isIdle) {
          isIdle = true;
          computeSpiralTargets(cx, cy);
        }
        vortexProgress = Math.min(1, vortexProgress + 0.0015);
        computeSpiralTargets(cx, cy);
      } else {
        vortexProgress = Math.max(0, vortexProgress - 0.02);
      }

      /* ── scroll speed multiplier ── */
      const speedMult = 1 + Math.min(5, scrollVelocity / 600);
      scrollVelocity *= 0.92;

      /* ── update & draw each star ── */
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        /* ─ apply & decay velocity (from explosions) ─ */
        star.x += star.vx;
        star.y += star.vy;
        star.vx *= FRICTION;
        star.vy *= FRICTION;
        // zero out tiny velocities
        if (Math.abs(star.vx) < 0.01) star.vx = 0;
        if (Math.abs(star.vy) < 0.01) star.vy = 0;

        /* ─ twinkle ─ */
        star.opacity += (Math.random() - 0.5) * 0.012;
        star.opacity = Math.max(0.05, Math.min(0.7, star.opacity));

        // distance from cursor (used for radius gating)
        const distFromCursor = Math.sqrt((star.x - cx) ** 2 + (star.y - cy) ** 2);
        const inRange = star.attractable && distFromCursor < VORTEX_ATTRACT_RADIUS;

        if (vortexProgress > 0.01 && inRange) {
          /* ─ VORTEX MODE (only attractable stars within radius) ─ */
          const lerpAmt = VORTEX_LERP * vortexProgress;
          star.x += (star.spiralTargetX - star.x) * lerpAmt;
          star.y += (star.spiralTargetY - star.y) * lerpAmt;

          // swirl rotation
          const dx = star.x - cx;
          const dy = star.y - cy;
          const rotSpeed = 0.0015 * vortexProgress;
          star.x = cx + dx * Math.cos(rotSpeed) - dy * Math.sin(rotSpeed);
          star.y = cy + dx * Math.sin(rotSpeed) + dy * Math.cos(rotSpeed);

          /* ─ consume: star reached the center → respawn at edge ─ */
          const distToCenter = Math.sqrt((star.x - cx) ** 2 + (star.y - cy) ** 2);
          if (distToCenter < CONSUME_RADIUS && vortexProgress > 0.5) {
            const fresh = makeStar(w, h, true);
            star.x = fresh.x;
            star.y = fresh.y;
            star.vx = 0;
            star.vy = 0;
            star.r = fresh.r;
            star.opacity = 0.05; // fade in naturally
            star.baseSpeed = fresh.baseSpeed;
          }
        } else {
          /* ─ NORMAL MODE (background stars + out-of-range stars) ─ */
          // gentle cursor following (only attractable, paused while scrolling)
          if (star.attractable && mouse.x !== -9999 && scrollVelocity < 50) {
            const dx = cx - star.x;
            const dy = cy - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CURSOR_FOLLOW_RADIUS && dist > 30) {
              const pull = CURSOR_FOLLOW_STRENGTH * (1 - dist / CURSOR_FOLLOW_RADIUS);
              star.vx += (dx / dist) * pull;
              star.vy += (dy / dist) * pull;
            }
          }

          // upward drift modulated by scroll speed
          star.y -= star.baseSpeed * speedMult;

          // wrap around
          if (star.y < -5) { star.y = h + 5; star.x = Math.random() * w; }
          if (star.y > h + 5) { star.y = -5; star.x = Math.random() * w; }
          if (star.x < -5) { star.x = w + 5; }
          if (star.x > w + 5) { star.x = -5; }
        }

        /* ─ draw star ─ */
        let drawOpacity = star.opacity;
        let drawRadius = star.r;

        // vortex glow for stars near center
        if (vortexProgress > 0.3) {
          const dist = Math.sqrt((star.x - cx) ** 2 + (star.y - cy) ** 2);
          const glow = Math.max(0, 1 - dist / 200) * vortexProgress;
          drawOpacity = Math.min(0.9, drawOpacity + glow * 0.4);
          drawRadius = star.r + glow * 1.2;
        }

        // explosion flash: boost opacity briefly when velocity is high
        const vel = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
        if (vel > 2) {
          drawOpacity = Math.min(0.95, drawOpacity + vel * 0.03);
          drawRadius = star.r + Math.min(vel * 0.15, 2);
        }

        ctx!.beginPath();
        ctx!.arc(star.x, star.y, drawRadius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200, 200, 220, ${drawOpacity})`;
        ctx!.fill();
      }

      /* ─ draw vortex center glow ─ */
      if (vortexProgress > 0.2) {
        const glowRadius = 40 + vortexProgress * 60;
        const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        gradient.addColorStop(0, `rgba(99, 102, 241, ${0.15 * vortexProgress})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.08 * vortexProgress})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx!.beginPath();
        ctx!.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }

      /* ─ draw shockwave ring ─ */
      if (shockwave.active) {
        shockwave.radius += 12;
        shockwave.opacity *= 0.94;
        if (shockwave.opacity < 0.01) {
          shockwave.active = false;
        } else {
          ctx!.beginPath();
          ctx!.arc(shockwave.x, shockwave.y, shockwave.radius, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(168, 85, 247, ${shockwave.opacity})`;
          ctx!.lineWidth = 2;
          ctx!.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      scrollTrigger.kill();
    };
  }, [canvasRef]);
}

/* ────────────────────────────────────────────────
   Main Page Component
   ──────────────────────────────────────────────── */
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useStarCanvas(canvasRef);

  useEffect(() => {
    // Kill any stale ScrollTriggers from HMR
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      /* ── GPU-accelerate + immediate render (gsap-master recommendations) ── */
      gsap.defaults({ force3D: true, lazy: false });

      /* ── Responsive animation system via matchMedia ── */
      const mm = gsap.matchMedia();

      /* ── Accessibility: skip all motion when user prefers reduced motion ── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".site-nav, .hero-badge, .hero-line, .hero-sub, .hero-cta, .hero-side-left, .hero-side-right, .hero-bottom-text, .feature-header, .feature-card, .how-header, .how-step, .founders-header, .founder-card, .stat-item, .cta-content",
          { opacity: 1, y: 0, x: 0, scale: 1 },
        );
      });

      /* ── Desktop animations (769px+) ── */
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const reveal = (
          selector: string,
          trigger: string,
          fromVars: gsap.TweenVars,
          toVars: gsap.TweenVars = {},
        ) => {
          gsap.fromTo(selector, fromVars, {
            ...toVars,
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            scrollTrigger: {
              trigger,
              start: "top 95%",
              toggleActions: "play reverse play reverse",
            },
            duration: toVars.duration ?? 1,
            stagger: toVars.stagger ?? 0,
            ease: toVars.ease ?? "power3.out",
          });
        };

        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .fromTo(".hero-badge", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 })
          .fromTo(".hero-line", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 }, "-=0.6")
          .fromTo(".hero-sub", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
          .fromTo(".hero-cta", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.5")
          .fromTo(".hero-side-left", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1")
          .fromTo(".hero-side-right", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "-=1")
          .fromTo(".hero-bottom-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

        gsap.set(".site-nav", { y: -100, opacity: 0 });
        ScrollTrigger.create({
          trigger: ".hero-section",
          start: "20% top",
          onEnter: () => gsap.to(".site-nav", { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: "auto" }),
          onLeaveBack: () => gsap.to(".site-nav", { y: -100, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
        });

        reveal(".feature-header", ".feature-header", { y: 60, opacity: 0 }, { duration: 1 });
        reveal(".feature-card", ".feature-cards", { y: 80, opacity: 0 }, { duration: 1, stagger: 0.2 });
        reveal(".how-header", ".how-header", { y: 60, opacity: 0 }, { duration: 1 });
        reveal(".how-step", ".how-steps", { y: 60, opacity: 0 }, { duration: 1, stagger: 0.25 });
        reveal(".founders-header", ".founders-header", { y: 60, opacity: 0 }, { duration: 1 });
        reveal(".founder-card", ".founders-cards", { y: 80, opacity: 0 }, { duration: 1, stagger: 0.25 });
        reveal(".stat-item", ".stats-section", { y: 40, opacity: 0, scale: 0.9 }, { duration: 0.8, stagger: 0.15, ease: "power2.out" });
        reveal(".cta-content", ".cta-section", { y: 80, opacity: 0 }, { duration: 1.2 });

        ScrollTrigger.create({
          trigger: ".hero-section",
          start: "60% center",
          onLeave: () => heroTl.reverse(),
          onEnterBack: () => heroTl.play(),
        });
      });

      /* ── Mobile animations (≤768px) — reduced offsets & shorter durations ── */
      mm.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const reveal = (
          selector: string,
          trigger: string,
          fromVars: gsap.TweenVars,
          toVars: gsap.TweenVars = {},
        ) => {
          gsap.fromTo(selector, fromVars, {
            ...toVars,
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            scrollTrigger: {
              trigger,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
            duration: toVars.duration ?? 0.7,
            stagger: toVars.stagger ?? 0,
            ease: toVars.ease ?? "power2.out",
          });
        };

        const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

        heroTl
          .fromTo(".hero-badge", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.2 })
          .fromTo(".hero-line", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=0.4")
          .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
          .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.3")
          .fromTo(".hero-bottom-text", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");

        gsap.set(".site-nav", { y: -80, opacity: 0 });
        ScrollTrigger.create({
          trigger: ".hero-section",
          start: "15% top",
          onEnter: () => gsap.to(".site-nav", { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }),
          onLeaveBack: () => gsap.to(".site-nav", { y: -80, opacity: 0, duration: 0.3, ease: "power2.in", overwrite: "auto" }),
        });

        reveal(".feature-header", ".feature-header", { y: 30, opacity: 0 }, { duration: 0.7 });
        reveal(".feature-card", ".feature-cards", { y: 40, opacity: 0 }, { duration: 0.7, stagger: 0.12 });
        reveal(".how-header", ".how-header", { y: 30, opacity: 0 }, { duration: 0.7 });
        reveal(".how-step", ".how-steps", { y: 30, opacity: 0 }, { duration: 0.7, stagger: 0.15 });
        reveal(".founders-header", ".founders-header", { y: 30, opacity: 0 }, { duration: 0.7 });
        reveal(".founder-card", ".founders-cards", { y: 40, opacity: 0 }, { duration: 0.7, stagger: 0.15 });
        reveal(".stat-item", ".stats-section", { y: 20, opacity: 0, scale: 0.95 }, { duration: 0.6, stagger: 0.1, ease: "power2.out" });
        reveal(".cta-content", ".cta-section", { y: 40, opacity: 0 }, { duration: 0.8 });

        ScrollTrigger.create({
          trigger: ".hero-section",
          start: "60% center",
          onLeave: () => heroTl.reverse(),
          onEnterBack: () => heroTl.play(),
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen">
      <canvas ref={canvasRef} id="star-canvas" />

      {/* ═══════════════════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════════════════ */}
      <nav className="site-nav fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-10 py-3 sm:py-4 bg-[rgba(5,5,8,0.8)] backdrop-blur-xl border-b border-white/[0.04]">
        <div className="grid grid-cols-3 items-center max-w-[1600px] mx-auto">
          <a href="https://demo.signpost.cv" target="_blank" rel="noopener noreferrer" className="font-mono-upper hover:text-foreground transition-colors text-sm justify-self-start">
            <span className="hidden sm:inline">Try Demo</span>
            <span className="sm:hidden">Demo</span>
          </a>

          {/* Centered Logo */}
          <Link href="/" className="justify-self-center flex items-center group">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted transition-transform group-hover:scale-110 group-hover:text-foreground">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>

          <button onClick={() => setWaitlistOpen(true)} className="font-mono-upper hover:text-foreground transition-colors text-sm cursor-pointer justify-self-end">
            <span className="hidden sm:inline">Waitlist Sign Up →</span>
            <span className="sm:hidden">Waitlist →</span>
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════
          MAIN / HERO SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="hero-section relative flex flex-col items-center justify-center" style={{ minHeight: "100dvh" }}>
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[500px] rounded-full opacity-20 blur-[120px] sm:blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)" }}
        />

        <div className="hero-content relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          {/* Side floating text */}
          <div className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2">
            <p className="hero-side-left font-mono-upper" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
              CV-Powered Learning
            </p>
          </div>
          <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2">
            <p className="hero-side-right font-mono-upper" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
              Real-Time Feedback
            </p>
          </div>

          {/* Center content */}
          <div className="flex flex-col items-center text-center pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-10">
            {/* Badge */}
            <div className="hero-badge step-badge mb-4 sm:mb-6">
              Launching Feb 2026
            </div>

            {/* Main headline */}
            <h1 className="font-display mb-4 sm:mb-6 max-w-4xl">
              <span className="hero-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground/90">
                The most beautiful
              </span>
              <span className="hero-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground/90">
                sound in the world
              </span>
              <span className="hero-line block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl gradient-text mt-1 sm:mt-2">
                is silence.
              </span>
            </h1>

            <p className="hero-sub font-subtext text-base sm:text-lg md:text-xl text-muted max-w-xl leading-relaxed mb-6 sm:mb-8 px-4">
              Learn ASL faster than ever with real-time AI feedback. Your hands are the instrument — we help you play.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <a href="https://demo.signpost.cv" target="_blank" rel="noopener noreferrer" className="hero-cta btn-filled text-center">
                Try the Demo
              </a>
              <button onClick={() => setWaitlistOpen(true)} className="hero-cta btn-primary text-center cursor-pointer">
                Waitlist Sign Up →
              </button>
            </div>
          </div>

          {/* Scroll-down arrow */}
          <div className="hero-bottom-text flex flex-col items-center mt-auto pt-12 sm:pt-16">
            <a href="#features" className="mb-6 sm:mb-8 animate-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted">
                <path d="M7 10l5 5 5-5" />
              </svg>
            </a>
            <p className="text-center font-mono-upper pb-8 sm:pb-10 max-w-md mx-auto leading-relaxed">
              We are building the AI platform that<br />
              turns anyone into an ASL signer
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURES
          ═══════════════════════════════════════════════════ */}
      <div className="divider" />

      <section id="features" className="relative py-32 lg:py-40 overflow-x-clip">
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="feature-header text-center max-w-3xl mx-auto mb-20">
            <p className="font-mono-upper mb-4">What we build</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm">
              Everything you need to master ASL
            </h2>
          </div>

          {/* Cards */}
          <div className="feature-cards grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="feature-card glass-card rounded-2xl p-10 flex flex-col min-h-[420px]">
              <div className="step-badge mb-8">01 — CV</div>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-6 uppercase">
                Real-Time<br />Feedback
              </h3>
              <div className="flex-1" />
              <p className="text-muted leading-relaxed text-sm">
                Our computer vision pipeline tracks your hand positioning in real-time, providing instant corrections on form and movement. No waiting, no guessing — just immediate, actionable feedback.
              </p>
            </div>

            {/* Card 2 */}
            <div className="feature-card glass-card rounded-2xl p-10 flex flex-col min-h-[420px]">
              <div className="step-badge mb-8">02 — ED</div>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-6 uppercase">
                Structured<br />Curriculum
              </h3>
              <div className="flex-1" />
              <p className="text-muted leading-relaxed text-sm">
                Progress through a carefully designed curriculum from fingerspelling basics to full conversational ASL. Lessons adapt to your pace with data-driven difficulty scaling.
              </p>
            </div>

            {/* Card 3 */}
            <div className="feature-card glass-card rounded-2xl p-10 flex flex-col min-h-[420px]">
              <div className="step-badge mb-8">03 — DA</div>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-6 uppercase">
                Progress<br />Tracking
              </h3>
              <div className="flex-1" />
              <p className="text-muted leading-relaxed text-sm">
                Track your fluency with objective, data-driven metrics. We provide the first standardized benchmark for ASL proficiency — your personal TOEFL for sign language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════ */}
      <div className="divider" />

      <section id="how-it-works" className="relative py-32 lg:py-40 overflow-x-clip">
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="how-header text-center max-w-3xl mx-auto mb-20">
            <p className="font-mono-upper mb-4">The process</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm">
              Start signing in three steps
            </h2>
          </div>

          <div className="how-steps grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div className="how-step text-center">
              <div className="mx-auto mb-8 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                <span className="text-4xl font-light text-foreground/40">01</span>
              </div>
              <h3 className="text-xl font-medium mb-4 uppercase tracking-wider">Sign Up</h3>
              <p className="text-muted leading-relaxed text-sm max-w-xs mx-auto">
                Create your free account. All you need is a webcam and the desire to learn. No credit card required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="how-step text-center">
              <div className="mx-auto mb-8 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                <span className="text-4xl font-light text-foreground/40">02</span>
              </div>
              <h3 className="text-xl font-medium mb-4 uppercase tracking-wider">Practice with AI</h3>
              <p className="text-muted leading-relaxed text-sm max-w-xs mx-auto">
                Turn on your webcam and start signing. Our AI watches your hands and gives instant corrections on every gesture.
              </p>
            </div>

            {/* Step 3 */}
            <div className="how-step text-center">
              <div className="mx-auto mb-8 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
                <span className="text-4xl font-light text-foreground/40">03</span>
              </div>
              <h3 className="text-xl font-medium mb-4 uppercase tracking-wider">Master ASL</h3>
              <p className="text-muted leading-relaxed text-sm max-w-xs mx-auto">
                Build fluency lesson by lesson. Track your progress and earn certifications that prove your skill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOUNDERS
          ═══════════════════════════════════════════════════ */}
      <div className="divider" />

      <section id="team" className="relative py-32 lg:py-40 overflow-x-clip">
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="founders-header text-center max-w-3xl mx-auto mb-20">
            <p className="font-mono-upper mb-4">Our team</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm">
              Built by builders
            </h2>
          </div>

          <div className="founders-cards grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Jerry */}
            <div className="founder-card glass-card rounded-2xl p-10 flex flex-col">
              <div className="step-badge mb-6">Co-Founder &middot; CEO</div>
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">Jerry Xiao</h3>
              <p className="text-accent-light text-sm mb-6">Northeastern University &middot; CS</p>
              <p className="text-muted leading-relaxed text-sm mb-6">
                Full-stack engineer who joined to prove the product works — learning ASL exclusively through Signpost with zero prior knowledge. Previously boosted Rule Your Own Game Inc. MRR from $5k to $40k through frontend monetization.
              </p>
              <div className="flex-1" />
              <div className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/xiaojerry/" target="_blank" rel="noopener noreferrer" className="font-mono-upper hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://github.com/undeemed" target="_blank" rel="noopener noreferrer" className="font-mono-upper hover:text-foreground transition-colors">GitHub</a>
              </div>
            </div>

            {/* Max */}
            <div className="founder-card glass-card rounded-2xl p-10 flex flex-col">
              <div className="step-badge mb-6">Co-Founder &middot; CTO</div>
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">Max Castagnoli</h3>
              <p className="text-accent-light text-sm mb-6">Edison High School &middot; Senior</p>
              <p className="text-muted leading-relaxed text-sm mb-6">
                Built the computer vision pipeline from scratch. Has lived the ASL learning problem for 2+ years — his daily class yields only ~8 learned signs because the teacher can&apos;t give feedback to 30 students simultaneously.
              </p>
              <div className="flex-1" />
              <div className="flex gap-4 mt-4">
                <a href="https://www.linkedin.com/in/max-castagnoli-1b18b923b/" target="_blank" rel="noopener noreferrer" className="font-mono-upper hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://github.com/98ping" target="_blank" rel="noopener noreferrer" className="font-mono-upper hover:text-foreground transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════════════ */}
      <div className="divider" />

      <section className="stats-section relative py-12 overflow-x-clip">
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            {[
              { value: "200+", label: "Users" },
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "<50ms", label: "Feedback Latency" },
              { value: "24/7", label: "Feedback Availability" },
            ].map((stat) => (
              <div key={stat.label} className="stat-item px-8">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-light gradient-text mb-2 font-display">
                  {stat.value}
                </div>
                <div className="font-mono-upper">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BOTTOM CTA
          ═══════════════════════════════════════════════════ */}
      <div className="divider" />

      <section className="cta-section relative py-32 lg:py-40 overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)" }}
        />

        <div className="cta-content relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="font-mono-upper mb-6">See it live</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl gradient-text-warm mb-8">
            Ready to start signing?
          </h2>
          <p className="font-subtext text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience real-time AI feedback on your ASL signing. No sign-up required for the demo — just open, sign, and learn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://demo.signpost.cv" target="_blank" rel="noopener noreferrer" className="btn-filled">
              Try the Demo
            </a>
            <button onClick={() => setWaitlistOpen(true)} className="btn-primary cursor-pointer">
              Waitlist Sign Up →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════ */}
      <div className="divider" />

      <footer className="relative py-12">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 text-center">
          <p className="font-mono-upper">
            &copy; {new Date().getFullYear()} Signpost
          </p>
        </div>
      </footer>

      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
