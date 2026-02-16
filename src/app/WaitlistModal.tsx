"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

const SAFE_SERVER_MESSAGES = new Set([
  "Invalid email address",
  "Please use a non-disposable email address",
  "Too many sign-ups right now",
  "Request expired. Please try again.",
]);

type ModalTab = "join" | "check";

type CheckResult =
  | { found: true; position: number; total: number; joinedAt: number }
  | { found: false };

export default function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ModalTab>("join");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "cooldown">("idle");
  const [message, setMessage] = useState("");

  // ── Check tab state ──
  const [checkEmail, setCheckEmail] = useState("");
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance / exit ── */
  useEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.05, force3D: true },
      );
    });

    return () => ctx.revert();
  }, [open]);

  /* ── Reset state when modal closes ── */
  useEffect(() => {
    if (!open) {
      setTab("join");
      setStatus("idle");
      setMessage("");
      setEmail("");
      setCheckEmail("");
      setCheckSubmitted(false);
      setCheckResult(null);
      setCheckLoading(false);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
      defaults: { ease: "power2.in" },
    });
    tl.to(panelRef.current, { opacity: 0, scale: 0.95, y: 12, duration: 0.2, force3D: true })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  }, [onClose]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || status === "cooldown") return;

      setStatus("loading");
      try {
        const res = await fetch("/api/waitlist/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            website: honeypot || undefined,
            timestamp: Date.now(),
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } catch (err: unknown) {
        setStatus("error");
        setMessage(
          err instanceof Error && SAFE_SERVER_MESSAGES.has(err.message)
            ? err.message
            : "Something went wrong. Try again.",
        );
        // Cooldown after error to prevent spam retries
        setTimeout(() => {
          setStatus("cooldown");
          setTimeout(() => setStatus("idle"), 5000);
        }, 100);
      }
    },
    [email, honeypot, status],
  );

  const handleCheck = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = checkEmail.trim();
      if (!trimmed) return;

      setCheckSubmitted(true);
      setCheckLoading(true);
      setCheckResult(null);

      try {
        const res = await fetch("/api/waitlist/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
        const data = await res.json();
        setCheckResult(data);
      } catch {
        setCheckResult({ found: false });
      } finally {
        setCheckLoading(false);
      }
    },
    [checkEmail],
  );

  const handleTabSwitch = useCallback((newTab: ModalTab) => {
    setTab(newTab);
    // Reset check state when switching tabs
    if (newTab === "join") {
      setCheckSubmitted(false);
      setCheckResult(null);
      setCheckLoading(false);
    }
    // Reset join state when switching tabs
    if (newTab === "check") {
      setStatus("idle");
      setMessage("");
    }
  }, []);

  /** Format a timestamp into a friendly date string */
  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/4 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-4">🎉</div>
            <h3 className="text-xl font-light tracking-tight mb-2 text-foreground">
              {message}
            </h3>
            <p className="text-muted text-sm mb-6">
              We&apos;ll reach out when it&apos;s your turn.
            </p>
            <button
              onClick={() => handleTabSwitch("check")}
              className="text-accent-light text-xs hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Check your spot →
            </button>
          </div>
        ) : (
          <>
            {/* ── Tab Switcher ── */}
            <div className="flex gap-1 mb-7 p-0.5 rounded-xl bg-white/3 border border-white/6">
              <button
                onClick={() => handleTabSwitch("join")}
                className={`flex-1 py-2 text-xs font-medium tracking-wide uppercase rounded-[10px] transition-all duration-300 cursor-pointer ${
                  tab === "join"
                    ? "bg-white/8 text-foreground shadow-sm"
                    : "text-muted hover:text-foreground/70"
                }`}
              >
                Join
              </button>
              <button
                onClick={() => handleTabSwitch("check")}
                className={`flex-1 py-2 text-xs font-medium tracking-wide uppercase rounded-[10px] transition-all duration-300 cursor-pointer ${
                  tab === "check"
                    ? "bg-white/8 text-foreground shadow-sm"
                    : "text-muted hover:text-foreground/70"
                }`}
              >
                Check your spot
              </button>
            </div>

            {/* ── Join Tab ── */}
            {tab === "join" && (
              <>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-2 text-foreground">
                  Join the waitlist
                </h3>
                <p className="text-muted text-sm mb-8 leading-relaxed">
                  Be the first to know when Signpost launches. We&apos;ll notify you — no spam, ever.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error" || status === "cooldown") setStatus("idle");
                    }}
                    maxLength={254}
                    placeholder="you@example.com"
                    required
                    autoFocus
                    className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-accent-light/40 focus:ring-1 focus:ring-accent-light/20 transition-all"
                  />

                  {/* Honeypot — invisible to humans, bots auto-fill it */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                  />

                  {status === "error" && (
                    <p className="text-red-400 text-xs">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "cooldown"}
                    className="w-full btn-filled py-3.5 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Joining..." : status === "cooldown" ? "Wait a moment..." : "Get Early Access →"}
                  </button>
                </form>

                <p className="text-muted/50 text-[0.65rem] text-center mt-5">
                  By signing up you agree to our terms. Your email is stored securely.
                </p>
              </>
            )}

            {/* ── Check Tab ── */}
            {tab === "check" && (
              <>
                {!checkSubmitted ? (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-2 text-foreground">
                      Check your spot
                    </h3>
                    <p className="text-muted text-sm mb-8 leading-relaxed">
                      Enter the email you signed up with to see your position.
                    </p>

                    <form onSubmit={handleCheck} className="space-y-4">
                      <input
                        type="email"
                        value={checkEmail}
                        onChange={(e) => setCheckEmail(e.target.value)}
                        maxLength={254}
                        placeholder="you@example.com"
                        required
                        autoFocus
                        className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/60 outline-none focus:border-accent-light/40 focus:ring-1 focus:ring-accent-light/20 transition-all"
                      />
                      <button
                        type="submit"
                        className="w-full btn-filled py-3.5 text-sm font-medium"
                      >
                        Look up →
                      </button>
                    </form>
                  </>
                ) : checkLoading ? (
                  /* Loading state */
                  <div className="text-center py-8">
                    <div className="inline-block w-6 h-6 border-2 border-accent-light/30 border-t-accent-light rounded-full animate-spin mb-4" />
                    <p className="text-muted text-sm">Looking you up…</p>
                  </div>
                ) : checkResult?.found ? (
                  /* Found — show position */
                  <div className="text-center py-4">
                    <div className="text-3xl mb-4">🎯</div>
                    <h3 className="text-xl font-light tracking-tight mb-1 text-foreground">
                      You&apos;re #{checkResult.position}
                    </h3>
                    <p className="text-muted text-sm mb-6">
                      out of {checkResult.total.toLocaleString()} on the waitlist
                    </p>

                    <div className="rounded-xl border border-white/6 bg-white/2 p-4 mb-6">
                      {/* Progress bar */}
                      <div className="flex justify-between text-[0.65rem] text-muted mb-2 uppercase tracking-widest">
                        <span>Position</span>
                        <span>{checkResult.position} / {checkResult.total}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/6 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${Math.max(4, (1 - (checkResult.position - 1) / Math.max(checkResult.total, 1)) * 100)}%`,
                            background: "linear-gradient(90deg, #6366f1, #a855f7)",
                          }}
                        />
                      </div>
                      <p className="text-muted/60 text-[0.6rem] mt-2.5">
                        Joined {formatDate(checkResult.joinedAt)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCheckSubmitted(false);
                        setCheckResult(null);
                        setCheckEmail("");
                      }}
                      className="text-muted text-xs hover:text-foreground transition-colors cursor-pointer"
                    >
                      ← Check another email
                    </button>
                  </div>
                ) : (
                  /* Not found */
                  <div className="text-center py-4">
                    <div className="text-3xl mb-4">🤔</div>
                    <h3 className="text-xl font-light tracking-tight mb-2 text-foreground">
                      Not on the list yet
                    </h3>
                    <p className="text-muted text-sm mb-6">
                      We couldn&apos;t find that email on the waitlist.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          setCheckSubmitted(false);
                          setCheckResult(null);
                        }}
                        className="text-muted text-xs hover:text-foreground transition-colors cursor-pointer"
                      >
                        ← Try again
                      </button>
                      <span className="text-white/10">|</span>
                      <button
                        onClick={() => {
                          handleTabSwitch("join");
                          setEmail(checkEmail);
                          setCheckEmail("");
                          setCheckSubmitted(false);
                          setCheckResult(null);
                        }}
                        className="text-accent-light text-xs hover:underline underline-offset-4 transition-colors cursor-pointer"
                      >
                        Join now →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
