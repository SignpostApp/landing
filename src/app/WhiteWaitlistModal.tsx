"use client";

import { useState, useCallback, useEffect } from "react";

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

export default function WhiteWaitlistModal({
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

  const [checkEmail, setCheckEmail] = useState("");
  const [checkSubmitted, setCheckSubmitted] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
    if (newTab === "join") {
      setCheckSubmitted(false);
      setCheckResult(null);
      setCheckLoading(false);
    }
    if (newTab === "check") {
      setStatus("idle");
      setMessage("");
    }
  }, []);

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-[whiteModalFadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] animate-[whiteModalScaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
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
            <h3 className="text-xl font-medium tracking-tight mb-2 text-slate-900">{message}</h3>
            <p className="text-slate-500 text-sm mb-6">We&apos;ll reach out when it&apos;s your turn.</p>
            <button
              onClick={() => handleTabSwitch("check")}
              className="text-blue-600 text-xs hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Check your spot →
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-1 mb-7 p-0.5 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => handleTabSwitch("join")}
                className={`flex-1 py-2 text-xs font-semibold tracking-wide uppercase rounded-[10px] transition-all duration-200 cursor-pointer ${
                  tab === "join"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Join
              </button>
              <button
                onClick={() => handleTabSwitch("check")}
                className={`flex-1 py-2 text-xs font-semibold tracking-wide uppercase rounded-[10px] transition-all duration-200 cursor-pointer ${
                  tab === "check"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Check your spot
              </button>
            </div>

            {tab === "join" && (
              <>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2 text-slate-900">Join the waitlist</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Be the first to know when Signpost launches. We&apos;ll notify you and never spam you.
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all"
                  />

                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                  />

                  {status === "error" && <p className="text-red-500 text-xs">{message}</p>}

                  <button
                    type="submit"
                    disabled={status === "loading" || status === "cooldown"}
                    className="w-full rounded-xl bg-slate-900 text-white py-3.5 text-sm font-semibold hover:bg-slate-800 active:bg-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === "loading" ? "Joining..." : status === "cooldown" ? "Wait a moment..." : "Get Early Access →"}
                  </button>
                </form>

                <p className="text-slate-400 text-[0.65rem] text-center mt-5">
                  By signing up you agree to our terms. Your email is stored securely.
                </p>
              </>
            )}

            {tab === "check" && (
              <>
                {!checkSubmitted ? (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2 text-slate-900">Check your spot</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all"
                      />
                      <button
                        type="submit"
                        className="w-full rounded-xl bg-slate-900 text-white py-3.5 text-sm font-semibold hover:bg-slate-800 transition-all cursor-pointer"
                      >
                        Look up →
                      </button>
                    </form>
                  </>
                ) : checkLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block w-6 h-6 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                    <p className="text-slate-500 text-sm">Looking you up…</p>
                  </div>
                ) : checkResult?.found ? (
                  <div className="text-center py-4">
                    <div className="text-3xl mb-4">🎯</div>
                    <h3 className="text-xl font-medium tracking-tight mb-1 text-slate-900">You&apos;re #{checkResult.position}</h3>
                    <p className="text-slate-500 text-sm mb-6">
                      out of {checkResult.total.toLocaleString()} on the waitlist
                    </p>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-6">
                      <div className="flex justify-between text-[0.65rem] text-slate-500 mb-2 uppercase tracking-widest">
                        <span>Position</span>
                        <span>{checkResult.position} / {checkResult.total}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${Math.max(4, (1 - (checkResult.position - 1) / Math.max(checkResult.total, 1)) * 100)}%`,
                            background: "linear-gradient(90deg, #2563eb, #60a5fa)",
                          }}
                        />
                      </div>
                      <p className="text-slate-400 text-[0.6rem] mt-2.5">Joined {formatDate(checkResult.joinedAt)}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCheckSubmitted(false);
                        setCheckResult(null);
                        setCheckEmail("");
                      }}
                      className="text-slate-500 text-xs hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      ← Check another email
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-3xl mb-4">🤔</div>
                    <h3 className="text-xl font-medium tracking-tight mb-2 text-slate-900">Not on the list yet</h3>
                    <p className="text-slate-500 text-sm mb-6">We couldn&apos;t find that email on the waitlist.</p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          setCheckSubmitted(false);
                          setCheckResult(null);
                        }}
                        className="text-slate-500 text-xs hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        ← Try again
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        onClick={() => {
                          handleTabSwitch("join");
                          setEmail(checkEmail);
                          setCheckEmail("");
                          setCheckSubmitted(false);
                          setCheckResult(null);
                        }}
                        className="text-blue-600 text-xs hover:underline underline-offset-4 transition-colors cursor-pointer"
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes whiteModalFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes whiteModalScaleIn {
              from { opacity: 0; transform: scale(0.96) translateY(8px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `,
        }}
      />
    </div>
  );
}
