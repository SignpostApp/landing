"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WhiteWaitlistModal from "./WhiteWaitlistModal";

const FEATURES = [
  {
    badge: "01 — CV",
    title: "Real-Time Feedback",
    body: "Our computer vision pipeline tracks your hand positioning in real-time, providing instant corrections on form and movement. No waiting and no guessing on correctness, just immediate feedback.",
  },
  {
    badge: "02 — ED",
    title: "Structured Curriculum",
    body: "Progress through a carefully designed curriculum from fingerspelling basics to full conversational ASL. These lessons are audited using resources from actual textbooks in school, we just bring them to you.",
  },
  {
    badge: "03 — DA",
    title: "Progress Tracking",
    body: "Track your fluency with objective, data-driven metrics. We provide the first standardized benchmark for ASL proficiency — your personal TOEFL for sign language.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Sign Up",
    body: "Create your free account. All you need is a webcam and the desire to learn. No credit card required.",
  },
  {
    n: "02",
    title: "Practice with AI",
    body: "Turn on your webcam and start signing. Our AI watches your hands and gives instant feedback on every gesture. You immediately know if you are signing the right way.",
  },
  {
    n: "03",
    title: "Master ASL",
    body: "Build fluency lesson by lesson. Track your progress and earn certifications that prove your skill.",
  },
];

const STATS = [
  { value: "200+", label: "Testers" },
  { value: "99%", label: "Accuracy Rate" },
  { value: "<100ms", label: "Feedback Latency" },
  { value: "24/7", label: "Feedback Availability" },
];


const LTI_CAROUSEL_IMAGES = [
  { src: "/icons/canvas.png", alt: "LTI integration screenshot 2" },
  { src: "/icons/blackboard.png", alt: "LTI integration screenshot 1" },
  { src: "/icons/Schoology.png", alt: "LTI integration screenshot 3" }
];

const FAQS = [
  {
    q: "How do I learn ASL online?",
    a: "Signpost lets you learn ASL online using just a webcam. Our AI-powered computer vision watches your hand signs in real-time and gives instant feedback on your form. Start with fingerspelling basics and progress through a structured curriculum to full conversational ASL.",
  },
  {
    q: "Is Signpost free to use?",
    a: "Yes — Signpost offers a free demo that requires no sign-up. Just open the app, turn on your webcam, and start signing. Our AI gives you real-time feedback immediately.",
  },
  {
    q: "What do I need to start learning ASL with Signpost?",
    a: "All you need is a computer or device with a webcam and a modern web browser. No downloads, installations, or special equipment required.",
  },
  {
    q: "How is Signpost different from other ASL apps?",
    a: "Unlike video-based ASL courses, Signpost uses computer vision AI to watch your actual hand signs and correct your form in real-time — like having a personal ASL tutor available 24/7 with sub-50ms feedback latency.",
  },
  {
    q: "Can complete beginners use Signpost to learn sign language?",
    a: "Absolutely. Signpost is designed for beginners with zero ASL experience. Our structured curriculum starts with the ASL alphabet and fingerspelling, then progresses to common signs and conversational ASL at your own pace.",
  },
  {
    q: "Is my webcam data private and secure?",
    a: "Your privacy is our top priority. All hand-tracking runs entirely in your browser — your webcam feed is never sent to our servers, recorded, or stored. The only data we save server-side is hand landmark coordinates (numerical joint positions, not images or video) to improve our recognition models over time. No webcam footage ever leaves your device.",
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
      <h1 className="sr-only">Learn ASL Online — AI-Powered American Sign Language Learning App</h1>

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
              alt="Signpost"
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
        <section className="relative overflow-hidden">
          {/* Subtle gradient backdrop */}
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-60"
            style={{
              background:
                "radial-gradient(900px 500px at 50% 0%, rgba(59,130,246,0.08), transparent 60%), radial-gradient(700px 400px at 80% 30%, rgba(168,85,247,0.05), transparent 60%)",
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

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-6 sm:pt-10 lg:pt-14 pb-20 sm:pb-28">
            <div className="flex flex-col items-center text-center">
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

              {/* Headline */}
              <p aria-hidden="true" className="font-sans tracking-tight max-w-4xl">
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold text-slate-900 leading-[1.05]">
                  Have a personal ASL teacher
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold text-slate-900 leading-[1.05]">
                  that lives entirely
                </span>
                <span
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold leading-[1.05] mt-1 sm:mt-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #7c3aed 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  in your browser.
                </span>
              </p>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-2xl leading-relaxed mt-8 sm:mt-10 mb-8 sm:mb-10 px-4">
                Learn ASL faster than ever with real-time AI Computer Vision feedback and a structured curriculum. Your fingers are your voice, we just help you find it.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
                <a
                  href="https://demo.signpost.cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 text-sm font-semibold transition-all shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_24px_-12px_rgba(15,23,42,0.5)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.1),0_12px_32px_-12px_rgba(15,23,42,0.55)] hover:-translate-y-0.5"
                >
                  Try the Demo
                  <span aria-hidden>→</span>
                </a>
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 border border-slate-200 px-7 py-3.5 text-sm font-semibold transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                  Waitlist Sign Up
                </button>
              </div>

              {/* Sub copy */}
              <div className="flex flex-col items-center pt-16 sm:pt-20">
                <a href="#features" aria-label="Scroll to features" className="mb-6 text-slate-400 hover:text-slate-700 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
                    <path d="M7 10l5 5 5-5" />
                  </svg>
                </a>
                <p className="text-center text-sm sm:text-base max-w-md mx-auto leading-relaxed text-slate-500">
                  We are building the AI platform that<br />
                  turns anyone into an ASL signer without the need for a teacher.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section id="features" className="relative py-24 lg:py-32 border-t border-slate-100 bg-slate-50/40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">What we build</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Everything you need to <span className="text-slate-400">master ASL</span>
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
        <section id="how-it-works" className="relative py-24 lg:py-32 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">The process</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900">
                Start signing in <span className="text-slate-400">three steps</span>
              </h2>
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
        <section className="relative py-24 lg:py-32 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-slate-500 mb-4">For educators</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
                Teach easily with <span className="text-slate-400">LTI 1.3 Integration</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
                Signpost will ship with full LTI 1.3 integration so you can seamlessly connect it with your school&apos;s preferred LMS!
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
        <section id="team" className="relative py-24 lg:py-32 border-t border-slate-100 bg-slate-50/40">
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
                  Full-stack and Swift engineer who joined to prove the product works — learning ASL exclusively through Signpost with zero prior knowledge. Previously collaborated with Rule Your Own Game Inc. to support 3M+ monthly visits through integrated monetization and web infrastructure.
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
                  Built the computer vision pipeline from scratch. Has lived within the ASL learning problem for 2+ years — his daily class yields little amounts learned signs because the teacher can&apos;t give feedback to 30 students simultaneously. Previously at Rule Your Own Game Inc., open-sourced a minigames framework, which has handled 10M+ games across 50+ servers.
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
        <section className="relative py-16 lg:py-20 border-t border-slate-100">
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
        <section id="faq" className="relative py-24 lg:py-32 border-t border-slate-100 bg-slate-50/40">
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
                      {faq.q}
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
        <section className="relative py-24 lg:py-32 border-t border-slate-100 overflow-hidden">
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
              Ready to start signing?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience real-time AI feedback on your ASL signing. No sign-up required for the demo — just open, sign, and learn.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="https://demo.signpost.cv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 text-sm font-semibold transition-all shadow-[0_1px_2px_rgba(15,23,42,0.1),0_8px_24px_-12px_rgba(15,23,42,0.5)] hover:-translate-y-0.5"
              >
                Try the Demo
                <span aria-hidden>→</span>
              </a>
              <button
                onClick={() => setWaitlistOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 border border-slate-200 px-7 py-3.5 text-sm font-semibold transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Waitlist Sign Up →
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
                <Image src="/text-logo.png" alt="Signpost" width={50} height={37} className="opacity-60 group-hover:opacity-90 transition-opacity" />
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
