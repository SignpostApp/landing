"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WhiteWaitlistModal from "./WhiteWaitlistModal";

const FEATURES = [
  {
    badge: "01 / CV",
    title: "Real-Time AI Feedback",
    body: "Our computer vision watches your hands through your webcam and corrects your ASL signs the moment you make them. No waiting, no guessing. You see right away if you are signing correctly.",
  },
  {
    badge: "02 / ED",
    title: "Structured ASL Curriculum",
    body: "Work through a curriculum built from real classroom textbooks, starting with the ASL alphabet and fingerspelling and growing into full conversational American Sign Language.",
  },
  {
    badge: "03 / DA",
    title: "Progress Tracking",
    body: "Track your fluency with clear, data-driven metrics. We are building the first standardized benchmark for ASL proficiency, like a personal TOEFL for sign language.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Sign Up",
    body: "Create your free Signpost account. All you need is a webcam and the curiosity to start. No credit card required.",
  },
  {
    n: "02",
    title: "Practice with AI",
    body: "Turn on your webcam and start signing. The AI watches your hands and gives instant feedback on every gesture, so you know immediately if your signs are right.",
  },
  {
    n: "03",
    title: "Master ASL",
    body: "Build fluency in American Sign Language lesson by lesson. Track your progress and earn certifications that prove your skill.",
  },
];

const STATS = [
  { value: "200+", label: "Testers" },
  { value: "99%", label: "Accuracy Rate" },
  { value: "<100ms", label: "Feedback Latency" },
  { value: "24/7", label: "Feedback Availability" },
];


const LTI_CAROUSEL_IMAGES = [
  { src: "/icons/canvas.png", alt: "Canvas LMS logo (Signpost integrates with Canvas via LTI 1.3)" },
  { src: "/icons/blackboard.png", alt: "Blackboard LMS logo (Signpost integrates with Blackboard via LTI 1.3)" },
  { src: "/icons/Schoology.png", alt: "Schoology LMS logo (Signpost integrates with Schoology via LTI 1.3)" }
];

const FAQS = [
  {
    q: "How do I learn ASL online?",
    a: "Signpost lets you learn American Sign Language online using just a webcam. Our AI-powered computer vision watches your hand signs in real time and gives instant feedback on your form. Start with the ASL alphabet and fingerspelling, then work through a structured curriculum to full conversational ASL at your own pace.",
  },
  {
    q: "Is Signpost free to use?",
    a: "Yes. Signpost offers a free demo that requires no sign-up. Just open the app, turn on your webcam, and start signing. The AI gives you real-time feedback immediately.",
  },
  {
    q: "What do I need to start learning ASL with Signpost?",
    a: "All you need is a computer or phone with a webcam and a modern web browser. No downloads, no installations, and no special equipment.",
  },
  {
    q: "How is Signpost different from other ASL apps?",
    a: "Most ASL apps only show you videos to copy. Signpost uses computer vision AI to watch your actual hand signs and correct your form in real time, so it works like a personal ASL tutor that is available 24/7 with under 100 milliseconds of feedback delay.",
  },
  {
    q: "Can complete beginners use Signpost to learn sign language?",
    a: "Absolutely. Signpost is built for beginners with zero ASL experience. The curriculum starts with the ASL alphabet and fingerspelling, then moves to common signs and conversational ASL at your own pace.",
  },
  {
    q: "How long does it take to learn ASL?",
    a: "Most learners can pick up the ASL alphabet and basic fingerspelling in a few hours. Becoming conversational in American Sign Language usually takes 6 to 12 months of regular practice. Because Signpost gives feedback on every sign, learners typically progress faster than they would using video-only courses.",
  },
  {
    q: "Is sign language hard to learn?",
    a: "ASL is not harder to learn than a spoken second language, but it uses your hands, face, and body instead of your voice, so it feels new at first. The biggest obstacle for most beginners is not knowing whether they are signing correctly. Signpost solves that by giving instant feedback on every gesture.",
  },
  {
    q: "Can I learn ASL by myself at home?",
    a: "Yes. Signpost is designed for self-teaching at home. The AI plays the role of a tutor by watching your signs through your webcam and correcting your form so you do not build bad habits.",
  },
  {
    q: "Does Signpost teach the ASL alphabet and fingerspelling?",
    a: "Yes. The first lessons in Signpost cover the full ASL alphabet and fingerspelling drills. You can practice each letter and the AI will tell you in real time whether your hand shape matches.",
  },
  {
    q: "Is my webcam data private and secure?",
    a: "Your privacy is our top priority. All hand tracking runs entirely in your browser. Your webcam feed is never sent to our servers, recorded, or stored. The only data we save server-side is numerical hand landmark coordinates (joint positions, not images or video) used to improve our recognition models. No webcam footage ever leaves your device.",
  },
];

export default function WhiteLandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ltiSlide, setLtiSlide] = useState(0);

  useEffect(() => {
    if (LTI_CAROUSEL_IMAGES.length <= 1) return;
    const id = setInterval(() => {
      setLtiSlide((s) => (s + 1) % LTI_CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Override the globally dark body bg so overscroll/bounce stays white on this route
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevColor = document.body.style.color;
    document.body.style.background = "#ffffff";
    document.body.style.color = "#0f172a";
    return () => {
      document.body.style.background = prevBg;
      document.body.style.color = prevColor;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="grid grid-cols-3 items-center max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-3 sm:py-3.5">
          <a
            href="https://demo.signpost.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900 transition-colors justify-self-start"
          >
            <span className="hidden sm:inline">Try Demo</span>
            <span className="sm:hidden">Demo</span>
          </a>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="justify-self-center flex items-center group cursor-pointer"
            aria-label="Scroll to top"
          >
            <Image
              src="/text-logo.png"
              alt="Signpost: learn ASL online for free with AI feedback"
              width={200}
              height={48}
              priority
              className="h-12 w-auto -my-2.5 group-hover:opacity-80 transition-opacity"
            />
          </button>

          <button
            onClick={() => setWaitlistOpen(true)}
            className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900 transition-colors cursor-pointer justify-self-end"
          >
            <span className="hidden sm:inline">Waitlist Sign Up →</span>
            <span className="sm:hidden">Waitlist →</span>
          </button>
        </div>
      </nav>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden" aria-label="Learn ASL online with Signpost">
          {/* Subtle gradient backdrop */}
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-70"
            style={{
              background:
                "radial-gradient(900px 500px at 20% 10%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(800px 500px at 85% 40%, rgba(37,99,235,0.10), transparent 60%)",
            }}
          />
          {/* Faint grid */}
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-8 sm:pt-14 lg:pt-20 pb-20 sm:pb-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT: text content */}
              <div className="flex flex-col items-start text-left">
                {/* Badges */}
                <div className="inline-flex flex-nowrap items-center gap-2 sm:gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-600 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Launching Summer 2026
                  </span>
                  <a
                    href="https://github.com/SignpostApp/landing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-600 hover:border-slate-300 hover:text-slate-900 shadow-sm transition-colors"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Github
                  </a>
                </div>

                {/* Headline (visible H1 for SEO) */}
                <h1 className="font-sans tracking-tight">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-slate-900 leading-[1.05]">
                    Learn ASL with a personal AI teacher that lives entirely{" "}
                  </span>
                  <span
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold leading-[1.05] whitespace-nowrap"
                    style={{
                      background:
                        "linear-gradient(135deg, #60a5fa 0%, #2563eb 50%, #1d4ed8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    in your browser.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-light max-w-xl leading-relaxed mt-8 mb-8 sm:mb-10">
                  Learn American Sign Language faster than ever with real-time computer vision feedback and a structured curriculum. Your fingers are your voice. We just help you find it.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                  <a
                    href="https://demo.signpost.cv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 text-sm font-semibold transition-all shadow-[0_1px_2px_rgba(37,99,235,0.15),0_10px_28px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_1px_2px_rgba(37,99,235,0.15),0_14px_34px_-10px_rgba(37,99,235,0.7)] hover:-translate-y-0.5"
                  >
                    Try the Free ASL Demo
                    <span aria-hidden>→</span>
                  </a>
                  <button
                    onClick={() => setWaitlistOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 border border-slate-200 px-7 py-3.5 text-sm font-semibold transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                  >
                    Join the Waitlist
                  </button>
                </div>

                {/* Tagline */}
                <p className="text-sm text-slate-500 leading-relaxed mt-10 max-w-md">
                  We are building the AI platform that helps anyone learn American Sign Language at home, without ever needing a classroom teacher.
                </p>
              </div>

              {/* RIGHT: phone preview */}
              <div className="relative w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[380px] lg:max-w-[420px]">
                  {/* Blue glow */}
                  <div
                    className="absolute inset-0 -z-10 blur-3xl opacity-60"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(59,130,246,0.40), transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                  <Image
                    src="/demo-ss.png"
                    alt="Signpost mobile app showing the ASL learning curriculum and a fingerspelling lesson"
                    width={1857}
                    height={3096}
                    priority
                    className="w-full h-auto drop-shadow-[0_30px_60px_rgba(15,23,42,0.25)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section id="features" className="relative py-24 lg:py-32 border-t border-slate-100 bg-slate-50/40" aria-label="What you get with Signpost">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">What we build</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Everything you need to <span className="text-slate-400">learn American Sign Language</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 transition-all hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]"
                >
                  <div className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-600 mb-7">
                    {f.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4 text-slate-900">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="how-it-works" className="relative py-24 lg:py-32 border-t border-slate-100" aria-label="How to start learning ASL with Signpost">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">The process</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Start signing in <span className="text-slate-400">three steps</span>
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
                Signpost is built so anyone can teach themselves American Sign Language at home. Open the app in your browser, turn on your webcam, and start learning the ASL alphabet right away.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 lg:gap-14 max-w-5xl mx-auto">
              {STEPS.map((step, i) => (
                <div key={step.n} className="text-center relative">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-gradient-to-r from-slate-200 to-transparent" aria-hidden="true" />
                  )}
                  <div className="mx-auto mb-7 w-24 h-24 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm relative z-10">
                    <span className="text-3xl font-semibold text-slate-300">{step.n}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-3 uppercase tracking-[0.1em] text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm max-w-xs mx-auto">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LTI 1.3 INTEGRATION ═══ */}
        <section className="relative py-24 lg:py-32 border-t border-slate-100" aria-label="Signpost for teachers and schools">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">For educators</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
                Teach ASL in your classroom with <span className="text-slate-400">LTI 1.3 Integration</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
                Signpost will ship with full LTI 1.3 integration, so teachers can drop our ASL lessons straight into Canvas, Blackboard, Schoology, and other learning management systems their school already uses.
              </p>
            </div>

            {/* Fade carousel */}
            <div className="mt-10 flex justify-center">
              <div className="relative h-40 w-88">
                {LTI_CAROUSEL_IMAGES.map((img, i) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="192px"
                    className={`object-contain transition-opacity duration-1000 ease-in-out ${
                      i === ltiSlide ? "opacity-100" : "opacity-0"
                    }`}
                    priority={i === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOUNDERS ═══ */}
        <section id="team" className="relative py-24 lg:py-32 border-t border-slate-100 bg-slate-50/40" aria-label="About the Signpost team">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">Our team</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Built by students, <span className="text-slate-400">for students</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              {/* Jerry */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 transition-all hover:border-slate-300 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] flex flex-col">
                <div className="inline-block self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-600 mb-6">
                  Co-Founder · CEO
                </div>
                <h3 className="text-3xl font-semibold tracking-tight mb-1 text-slate-900">Jerry Xiao</h3>
                <p className="text-blue-600 text-sm mb-6">Northeastern University · CS</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-1">
                  Full-stack and Swift engineer who joined to prove the product works by learning ASL exclusively through Signpost with zero prior knowledge. Previously collaborated with Rule Your Own Game Inc. to support 3M+ monthly visits through integrated monetization and web infrastructure.
                </p>
                <div className="flex gap-5 mt-auto">
                  <a href="https://www.linkedin.com/in/xiaojerry/" target="_blank" rel="noopener noreferrer" className="text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-500 hover:text-slate-900 transition-colors">LinkedIn</a>
                  <a href="https://github.com/undeemed" target="_blank" rel="noopener noreferrer" className="text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-500 hover:text-slate-900 transition-colors">GitHub</a>
                </div>
              </div>

              {/* Max */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 transition-all hover:border-slate-300 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] flex flex-col">
                <div className="inline-block self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-600 mb-6">
                  Co-Founder · CTO
                </div>
                <h3 className="text-3xl font-semibold tracking-tight mb-1 text-slate-900">Max Castagnoli</h3>
                <p className="text-blue-600 text-sm mb-6">Software Engineer · 6 Years of Experience</p>
                <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-1">
                  Built the computer vision pipeline from scratch. Has lived with the ASL learning problem for 2+ years. His daily class teaches only a handful of new signs each session because one teacher cannot give feedback to 30 students at once. Previously at Rule Your Own Game Inc., open-sourced a minigames framework that has handled 10M+ games across 50+ servers.
                </p>
                <div className="flex gap-5 mt-auto">
                  <a href="https://www.linkedin.com/in/max-castagnoli-1b18b923b/" target="_blank" rel="noopener noreferrer" className="text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-500 hover:text-slate-900 transition-colors">LinkedIn</a>
                  <a href="https://github.com/98ping" target="_blank" rel="noopener noreferrer" className="text-[0.7rem] font-mono uppercase tracking-[0.14em] text-slate-500 hover:text-slate-900 transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS ═══ */}
        <section className="relative py-16 lg:py-20 border-t border-slate-100" aria-label="Signpost ASL learning stats">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-4">
                  <div
                    className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-2"
                    style={{
                      background: "linear-gradient(135deg, #1e293b 0%, #2563eb 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="relative py-24 lg:py-32 border-t border-slate-100 bg-slate-50/40" aria-label="Frequently asked questions about learning ASL">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">FAQ</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Common questions about <span className="text-slate-400">learning ASL</span>
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border bg-white overflow-hidden transition-all ${
                      isOpen ? "border-slate-300 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.12)]" : "border-slate-200"
                    }`}
                  >
                    <button
                      className="w-full cursor-pointer p-5 sm:p-6 font-medium text-base sm:text-lg text-slate-900 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-base sm:text-lg font-medium">{faq.q}</h3>
                      <span
                        className={`ml-4 flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 text-slate-500 text-lg leading-none select-none transition-transform duration-300 ${
                          isOpen ? "rotate-45 bg-slate-900 border-slate-900 text-white" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-6 text-slate-600 leading-relaxed text-sm">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="relative py-24 lg:py-32 border-t border-slate-100 overflow-hidden" aria-label="Start learning ASL now">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(700px 400px at 50% 50%, rgba(59,130,246,0.08), transparent 65%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-6">See it live</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
              Ready to start learning sign language?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Try real-time AI feedback on your ASL signing right now. No sign-up needed for the demo. Just open the app, turn on your webcam, and start signing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="https://demo.signpost.cv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 text-sm font-semibold transition-all shadow-[0_1px_2px_rgba(37,99,235,0.15),0_10px_28px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
              >
                Try the Free ASL Demo
                <span aria-hidden>→</span>
              </a>
              <button
                onClick={() => setWaitlistOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 border border-slate-200 px-7 py-3.5 text-sm font-semibold transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Join the Waitlist →
              </button>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="relative pt-20 pb-8 border-t border-slate-200 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
              <div className="lg:max-w-[280px] shrink-0">
                <p className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 leading-snug">
                  Master your voice<br />without one.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-14 gap-y-8 lg:ml-auto">
                <div className="flex flex-col gap-3">
                  <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Features</a>
                  <a href="https://demo.signpost.cv" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Live Demo</a>
                  <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">How It Works</a>
                  <a href="#faq" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">FAQ</a>
                </div>

                <div className="flex flex-col gap-3">
                  <a href="#team" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">About Us</a>
                  <a href="#team" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Our Team</a>
                  <a href="https://github.com/SignpostApp" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">GitHub</a>
                </div>

                <div className="flex flex-col gap-3">
                  <a href="/legal/privacy" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Privacy</a>
                  <a href="/legal/terms" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Terms</a>
                  <a href="/legal/cookies" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Cookies</a>
                  <a href="/legal/gdpr" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">GDPR</a>
                  <a href="/legal/security" className="text-sm text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all w-fit">Security</a>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="mb-12 select-none" aria-hidden="true">
              <p
                className="text-[clamp(4rem,15vw,14rem)] leading-[0.85] tracking-tighter font-semibold"
                style={{
                  background:
                    "linear-gradient(180deg, #0f172a 0%, #1e293b 55%, rgba(37,99,235,0.55) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Signpost.cv
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 group cursor-pointer"
                aria-label="Scroll to top"
              >
                <Image src="/text-logo.png" alt="Signpost logo" width={50} height={37} className="opacity-60 group-hover:opacity-90 transition-opacity" />
                <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">Signpost</span>
              </button>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <p className="text-xs text-slate-400">
                  &copy; {new Date().getFullYear()} Signpost App, Inc.
                </p>
                <span className="hidden sm:inline text-slate-200">|</span>
                <a href="/legal/privacy" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Privacy</a>
                <a href="/legal/terms" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Terms</a>
                <a href="/legal/security" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">Security</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <WhiteWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
