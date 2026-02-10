"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import gsap from "gsap";

const SAFE_SERVER_MESSAGES = new Set([
  "Invalid email address",
  "Please use a non-disposable email address",
  "Too many sign-ups right now",
  "Request expired. Please try again.",
]);

export default function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "cooldown">("idle");
  const [message, setMessage] = useState("");
  const joinWaitlist = useMutation(api.waitlist.join);

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
        // SECURITY: Timestamp is validated server-side to reject stale/replayed submissions.
        const result = await joinWaitlist({
          email: email.trim(),
          website: honeypot || undefined,
          timestamp: Date.now(),
        });
        setStatus("success");
        setMessage(result.message);
        setEmail("");
      } catch (err: unknown) {
        setStatus("error");
        // SECURITY: Avoid exposing unexpected backend errors to clients.
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
    [email, honeypot, joinWaitlist, status],
  );

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
            <p className="text-muted text-sm">
              We&apos;ll reach out when it&apos;s your turn.
            </p>
          </div>
        ) : (
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
              By signing up you agree to our terms. Your email is stored securely via Convex.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
