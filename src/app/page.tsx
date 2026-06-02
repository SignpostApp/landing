"use client";

import { useState } from "react";
import Image from "next/image";
import WhiteWaitlistModal from "./WhiteWaitlistModal";

const FEATURES = [
  {
    title: "Real-time computer vision",
    body: "Signpost grades every sign as you make it. Feedback returns in under 100 milliseconds, so you know on the same gesture whether your hand shape, position, and motion are right.",
  },
  {
    title: "A real ASL curriculum",
    body: "Built from classroom textbooks, not vocabulary lists. Start with the ASL alphabet and fingerspelling and work up to full conversational American Sign Language, lesson by lesson.",
  },
  {
    title: "Objective progress tracking",
    body: "Every sign you make is graded against the same model. The result is the first consistent, data-backed measure of ASL proficiency: a TOEFL-style benchmark you can point at.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Open the demo",
    body: "Visit demo.signpost.cv in any modern browser. Hand tracking runs locally on your device, so a webcam is all you need to start.",
  },
  {
    n: "02",
    title: "Turn on your webcam",
    body: "Allow camera access and start signing. The AI watches every gesture and tells you within 100ms whether your hand shape, position, and motion match the target sign.",
  },
  {
    n: "03",
    title: "Work through the curriculum",
    body: "Move from the ASL alphabet to fingerspelling drills to conversational signing at your own pace. Progress is tracked automatically against a standardized fluency benchmark.",
  },
];


const LMS_LOGOS = [
  { src: "/icons/canvas.png", alt: "Canvas" },
  { src: "/icons/blackboard.png", alt: "Blackboard" },
  { src: "/icons/Schoology.png", alt: "Schoology" },
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
    a: "A computer or phone with a webcam and any modern browser. The demo runs in the browser itself, so there is nothing to download or install.",
  },
  {
    q: "How is Signpost different from other ASL apps?",
    a: "Most ASL apps only show you videos to copy. Signpost uses computer vision AI to watch your actual hand signs and correct your form in real time, so it works like a personal ASL tutor that is available 24/7 with under 100 milliseconds of feedback delay.",
  },
  {
    q: "Can complete beginners use Signpost to learn sign language?",
    a: "Yes. Signpost is built for beginners with zero ASL experience. The curriculum starts with the ASL alphabet and fingerspelling, then moves to common signs and conversational ASL at your own pace.",
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
    a: "Yes. Signpost is designed for self-teaching at home. The AI plays the role of a tutor by watching your signs through your webcam and correcting your form so you don't build bad habits.",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="grid grid-cols-3 items-center max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-3 sm:py-3.5">
          <a
            href="https://demo.signpost.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors justify-self-start"
          >
            Try the demo
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
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer justify-self-end"
          >
            Join waitlist
          </button>
        </div>
      </nav>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden" aria-label="Learn ASL online with Signpost">
          {/* Atmospheric backdrop */}
          <div
            className="pointer-events-none absolute inset-0 -z-0 opacity-70"
            style={{
              background:
                "radial-gradient(900px 500px at 20% 10%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(800px 500px at 85% 40%, rgba(37,99,235,0.08), transparent 60%)",
            }}
            aria-hidden="true"
          />

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-10 sm:pt-16 lg:pt-24 pb-20 sm:pb-28">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
              {/* LEFT: text content */}
              <div className="flex flex-col items-start text-left">
                {/* Launching badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm mb-7">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Launching Summer 2026
                </span>

                {/* Headline (visible H1 for SEO) */}
                <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-slate-900 text-balance max-w-[18ch]">
                  Learn ASL with real-time feedback on every sign.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mt-7 mb-10 text-pretty">
                  Signpost watches your hands through your webcam and corrects your form in under 100 milliseconds. The free demo opens in your browser; the full app is launching this summer.
                </p>

                {/* Primary CTA */}
                <a
                  href="https://demo.signpost.cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3.5 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-200 shadow-[0_1px_2px_rgba(37,99,235,0.15),0_10px_28px_-10px_rgba(37,99,235,0.55)] hover:shadow-[0_1px_2px_rgba(37,99,235,0.15),0_16px_36px_-10px_rgba(37,99,235,0.7)] hover:-translate-y-0.5"
                >
                  Try the free demo
                  <span aria-hidden>→</span>
                </a>

                {/* Secondary text link */}
                <button
                  onClick={() => setWaitlistOpen(true)}
                  className="mt-4 text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer underline-offset-4 hover:underline"
                >
                  or join the waitlist for the full app
                </button>
              </div>

              {/* RIGHT: phone-as-centerpiece — the actual product UI as the hero artifact,
                  with a floating live-tracking chip to signal that the AI is watching. */}
              <div className="relative w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[400px] lg:max-w-[440px]">
                  {/* Soft brand-color glow */}
                  <div
                    className="absolute -inset-10 -z-10 blur-3xl opacity-60"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(59,130,246,0.35), transparent 75%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* The actual app UI */}
                  <Image
                    src="/demo-ss.png"
                    alt="Signpost mobile app showing the ASL alphabet curriculum and lesson progress"
                    width={1857}
                    height={3096}
                    priority
                    className="relative w-full h-auto drop-shadow-[0_40px_70px_rgba(15,23,42,0.30)]"
                  />

                  {/* Floating activity chip: anchors the latency / live-tracking claim
                      next to the product so the visitor reads the visual as alive. */}
                  <div className="absolute -left-3 sm:-left-6 lg:-left-10 top-[22%] hidden sm:flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 px-3.5 py-2.5 shadow-[0_12px_30px_-8px_rgba(15,23,42,0.22)]">
                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                    </span>
                    <div className="leading-tight">
                      <div className="text-[0.7rem] text-slate-500">Hand tracking</div>
                      <div className="text-sm font-semibold tabular-nums text-slate-900">
                        ~80&nbsp;ms <span className="text-slate-500 font-medium">live</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating confidence chip: secondary social-proof signal on the
                      opposite side, suggesting accuracy without an unfalsifiable %. */}
                  <div className="absolute -right-3 sm:-right-6 lg:-right-10 bottom-[18%] hidden md:flex items-center gap-2.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200 px-3.5 py-2.5 shadow-[0_12px_30px_-8px_rgba(15,23,42,0.22)]">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="leading-tight">
                      <div className="text-[0.7rem] text-slate-500">Sign detected</div>
                      <div className="text-sm font-semibold text-slate-900">Letter A</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FEATURES ═══ */}
        <section id="features" className="relative py-24 lg:py-32 border-t border-slate-100" aria-label="What you get with Signpost">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mb-14 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-slate-900 text-balance">
                Three things every ASL app has been missing.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 transition-[transform,box-shadow,border-color] duration-300 hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)]"
                >
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-4 text-slate-900">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[0.95rem]">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section id="how-it-works" className="relative py-24 lg:py-32 border-t border-slate-100 bg-[#f8fafc]" aria-label="How to start learning ASL with Signpost">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mb-14 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-slate-900 text-balance">
                From zero to your first signed conversation in three steps.
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed text-base sm:text-lg text-pretty">
                Signpost is built for self-teaching. You won&apos;t need an instructor, a classroom, or any equipment beyond a webcam.
              </p>
            </div>

            <ol className="grid md:grid-cols-3 gap-12 lg:gap-14 max-w-5xl">
              {STEPS.map((step, i) => (
                <li key={step.n} className="relative pt-6">
                  {/* Top accent: small number + connector tick */}
                  <div className="absolute -top-px left-0 right-0 flex items-center gap-3">
                    <span className="text-xs font-semibold tabular-nums text-blue-600">{step.n}</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-3 text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-[0.95rem] max-w-sm">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ LTI 1.3 INTEGRATION ═══ */}
        <section className="relative py-24 lg:py-32 border-t border-slate-100" aria-label="Signpost for teachers and schools">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-slate-900 text-balance mb-5">
                  Drops into the LMS your school already runs.
                </h2>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg text-pretty">
                  Signpost ships with full LTI 1.3 support. Teachers place lessons straight into Canvas, Blackboard, or Schoology gradebooks. Students roster automatically into the tools the school already uses.
                </p>
              </div>

              {/* All three LMS partners shown at once: the section's heading promises
                  "the LMS your school already runs," so the visitor needs to see the full
                  set at a glance to verify their own LMS is supported. */}
              <div className="relative rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-30px_rgba(15,23,42,0.18)] overflow-hidden">
                {/* Subtle inner gradient gives the panel weight without competing with the logos */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background:
                      "radial-gradient(60% 80% at 50% 0%, rgba(59,130,246,0.06), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <p className="relative text-[0.7rem] uppercase tracking-[0.18em] text-slate-500 font-medium px-8 pt-7">
                  Integrates with
                </p>
                <ul
                  role="list"
                  aria-label="Signpost integrates with Canvas, Blackboard, and Schoology"
                  className="relative flex items-center justify-around gap-4 sm:gap-6 lg:gap-8 px-6 sm:px-8 pt-8 pb-12 lg:pt-10 lg:pb-14"
                >
                  {LMS_LOGOS.map((logo) => (
                    <li
                      key={logo.src}
                      className="flex-1 flex items-center justify-center min-w-0"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={200}
                        height={64}
                        className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FOUNDERS ═══ */}
        <section id="team" className="relative py-24 lg:py-32 border-t border-slate-100 bg-[#f8fafc]" aria-label="About the Signpost team">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="max-w-2xl mb-14 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-slate-900 text-balance">
                Built by two students who lived the problem.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl">
              {/* Jerry */}
              <article className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 transition-[transform,box-shadow,border-color] duration-300 hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] flex flex-col">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Jerry Xiao</h3>
                  <p className="text-xs text-slate-500 shrink-0">Co-founder, CEO</p>
                </div>
                <p className="text-blue-600 text-sm mb-6">Northeastern University, Computer Science</p>
                <p className="text-slate-600 leading-relaxed text-[0.95rem] mb-7 flex-1">
                  Full-stack and Swift engineer. Learning ASL from zero, using only Signpost: the canary that proves the product teaches non-signers. Previously helped Rule Your Own Game Inc. support 3M+ monthly visits through web infrastructure and integrated monetization.
                </p>
                <div className="flex gap-5 mt-auto">
                  <a href="https://www.linkedin.com/in/xiaojerry/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">LinkedIn</a>
                  <a href="https://github.com/undeemed" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">GitHub</a>
                </div>
              </article>

              {/* Max */}
              <article className="rounded-2xl border border-slate-200 bg-white p-8 lg:p-10 transition-[transform,box-shadow,border-color] duration-300 hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] flex flex-col">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Max Castagnoli</h3>
                  <p className="text-xs text-slate-500 shrink-0">Co-founder, CTO</p>
                </div>
                <p className="text-blue-600 text-sm mb-6">Software engineer, 6 years shipping production code</p>
                <p className="text-slate-600 leading-relaxed text-[0.95rem] mb-7 flex-1">
                  Built the computer vision pipeline from scratch. Has lived with the ASL learning problem for two years: his daily class teaches only a handful of new signs each session because one teacher cannot give feedback to thirty students at once. Previously at Rule Your Own Game Inc.; open-sourced a minigames framework that has handled 10M+ games across 50+ servers.
                </p>
                <div className="flex gap-5 mt-auto">
                  <a href="https://www.linkedin.com/in/max-castagnoli-1b18b923b/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">LinkedIn</a>
                  <a href="https://github.com/98ping" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">GitHub</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="relative py-24 lg:py-32 border-t border-slate-100" aria-label="Frequently asked questions about learning ASL">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <div className="mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-slate-900 text-balance">
                Questions, answered honestly.
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border bg-white overflow-hidden transition-[border-color,box-shadow] duration-200 ${
                      isOpen ? "border-slate-300 shadow-[0_8px_30px_-10px_rgba(15,23,42,0.10)]" : "border-slate-200"
                    }`}
                  >
                    <button
                      className="w-full cursor-pointer p-5 sm:p-6 text-slate-900 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-base sm:text-lg font-medium text-balance pr-4">{faq.q}</h3>
                      <span
                        className={`ml-4 flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 text-slate-500 text-lg leading-none select-none transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-45 bg-slate-900 border-slate-900 text-white" : ""
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-[grid-template-rows] duration-300 ease-out grid"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-6 text-slate-600 leading-relaxed text-[0.95rem]">{faq.a}</p>
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
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-slate-900 mb-5 text-balance">
              Sign your first ASL letters in under five minutes.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed text-pretty">
              Open the demo, turn on your webcam, and start fingerspelling. The AI corrects every letter in real time. No sign-up, no download.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="https://demo.signpost.cv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3.5 text-sm font-semibold transition-[transform,box-shadow,background-color] duration-200 shadow-[0_1px_2px_rgba(37,99,235,0.15),0_10px_28px_-10px_rgba(37,99,235,0.55)] hover:shadow-[0_1px_2px_rgba(37,99,235,0.15),0_16px_36px_-10px_rgba(37,99,235,0.7)] hover:-translate-y-0.5"
              >
                Try the free demo
                <span aria-hidden>→</span>
              </a>
              <button
                onClick={() => setWaitlistOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 border border-slate-200 px-7 py-3.5 text-sm font-semibold transition-[background-color,border-color] hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Join the waitlist
              </button>
            </div>
            <p className="mt-8 text-sm text-slate-500">
              200+ students already signed up for the spring pilot.
            </p>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="relative pt-20 pb-8 border-t border-slate-200 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16">
              <div className="max-w-sm">
                <Image
                  src="/text-logo.png"
                  alt="Signpost"
                  width={150}
                  height={36}
                  className="h-9 w-auto mb-5"
                />
                <p className="text-sm text-slate-600 leading-relaxed">
                  An AI-powered way to learn American Sign Language at home, with real-time feedback on every sign.
                </p>
                <p className="mt-5 text-xs text-slate-400">
                  Signpost App, Inc. &middot; San Francisco
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 lg:justify-self-end">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-slate-900 mb-1">Product</p>
                  <a href="#features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Features</a>
                  <a href="https://demo.signpost.cv" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Try the demo</a>
                  <a href="#how-it-works" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">How it works</a>
                  <a href="#faq" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">FAQ</a>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-slate-900 mb-1">Company</p>
                  <a href="#team" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">About</a>
                  <a href="/blog" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Blog</a>
                  <a href="https://github.com/SignpostApp" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">GitHub</a>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-slate-900 mb-1">Legal</p>
                  <a href="/legal/privacy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Privacy</a>
                  <a href="/legal/terms" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Terms</a>
                  <a href="/legal/cookies" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Cookies</a>
                  <a href="/legal/gdpr" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">GDPR</a>
                  <a href="/legal/security" className="text-sm text-slate-500 hover:text-slate-900 transition-colors w-fit">Security</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Signpost App, Inc. All rights reserved.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-xs text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </footer>
      </main>

      <WhiteWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
