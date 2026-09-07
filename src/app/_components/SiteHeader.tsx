"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import WhiteWaitlistModal from "../WhiteWaitlistModal";
import { NavIcon } from "./navIcons";
import {
  DEMO_URL,
  FEATURED_POSTS,
  LMS_MARKS,
  NAV_MENUS,
  type NavLink,
  type NavMenu,
} from "./navData";

const SHELL_GAP = 10;
const OPEN_DELAY = 55;
const CLOSE_DELAY = 170;

function ExternalGlyph() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="nav-item-glyph h-3 w-3"
    >
      <path d="M4 8 8 4M4.6 4H8v3.4" />
    </svg>
  );
}

function ArrowGlyph() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="nav-item-glyph h-3 w-3"
    >
      <path d="M2.5 6h7M6.6 3l3 3-3 3" />
    </svg>
  );
}

function MenuItem({
  link,
  compact,
  onNavigate,
}: {
  link: NavLink;
  compact?: boolean;
  onNavigate: () => void;
}) {
  const body = compact ? (
    <>
      <span className="nav-item-label">{link.label}</span>
      {link.external ? <ExternalGlyph /> : <ArrowGlyph />}
    </>
  ) : (
    <>
      <span className="nav-item-tile">
        {link.icon ? <NavIcon name={link.icon} /> : null}
      </span>
      <span className="min-w-0">
        <span className="nav-item-head">
          <span className="nav-item-label">{link.label}</span>
          {link.external ? <ExternalGlyph /> : <ArrowGlyph />}
        </span>
        {link.desc ? <span className="nav-item-desc">{link.desc}</span> : null}
      </span>
    </>
  );

  const className = compact ? "nav-item nav-item-compact" : "nav-item";

  if (link.external) {
    return (
      <a
        className={className}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {body}
      </a>
    );
  }

  return (
    <Link className={className} href={link.href} onClick={onNavigate}>
      {body}
    </Link>
  );
}

function FeatureCard({
  kind,
  onNavigate,
}: {
  kind: NonNullable<NavMenu["feature"]>;
  onNavigate: () => void;
}) {
  if (kind === "demo") {
    return (
      <div className="nav-feature">
        <div className="nav-feature-shot">
          <Image
            src="/demo-ss.png"
            alt="The Signpost app showing an ASL lesson in progress"
            width={1857}
            height={3096}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 24%" }}
          />
        </div>
        <p className="nav-feature-title">Try it in your browser</p>
        <p className="nav-feature-body">
          No sign-up, no download. Turn on your webcam and sign your first letter
          in a couple of minutes.
        </p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="nav-feature-cta"
        >
          Open the demo
          <span aria-hidden="true">→</span>
        </a>
      </div>
    );
  }

  if (kind === "lms") {
    return (
      <div className="nav-feature">
        <p className="nav-feature-eyebrow">Integrates with</p>
        <ul className="mt-4 flex flex-col gap-3.5">
          {LMS_MARKS.map((mark) => (
            <li key={mark.src} className="nav-feature-mark">
              <Image
                src={mark.src}
                alt={mark.alt}
                width={160}
                height={48}
                className="max-h-7 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
        <p className="nav-feature-body mt-4">
          Full LTI 1.3 support, so lessons and grades land where your school
          already works.
        </p>
      </div>
    );
  }

  return (
    <div className="nav-feature">
      <p className="nav-feature-eyebrow">Latest writing</p>
      <ul className="mt-3.5 flex flex-col gap-3">
        {FEATURED_POSTS.map((post) => (
          <li key={post.href}>
            <Link href={post.href} onClick={onNavigate} className="nav-feature-post">
              <span className="nav-feature-post-title">{post.title}</span>
              <span className="nav-feature-post-meta">{post.meta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteHeader({
  variant = "solid",
}: {
  variant?: "solid" | "plain";
}) {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const activeRef = useRef<string | null>(null);
  const heightsRef = useRef<Record<string, number>>({});
  const dirRef = useRef(1);
  const instantRef = useRef(true);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const applyShell = useCallback((id: string | null) => {
    const shell = shellRef.current;
    const rail = railRef.current;
    if (!shell || !rail || !id) return;

    const menu = NAV_MENUS.find((m) => m.id === id);
    const trigger = triggerRefs.current[id];
    if (!menu || !trigger) return;

    const railBox = rail.getBoundingClientRect();
    const triggerBox = trigger.getBoundingClientRect();
    const style = getComputedStyle(rail);
    const padLeft = parseFloat(style.paddingLeft) || 0;
    const padRight = parseFloat(style.paddingRight) || 0;

    const center = triggerBox.left - railBox.left + triggerBox.width / 2;
    const min = padLeft;
    const max = railBox.width - padRight - menu.width;
    const x = Math.round(
      Math.min(Math.max(center - menu.width / 2, min), Math.max(min, max))
    );

    shell.style.setProperty("--shell-x", `${x}px`);
    shell.style.setProperty("--dir", String(dirRef.current));
    shell.style.width = `${menu.width}px`;
    shell.style.height = `${(heightsRef.current[id] ?? 0) + SHELL_GAP}px`;
  }, []);

  const applyPill = useCallback((id: string | null) => {
    const pill = pillRef.current;
    const row = rowRef.current;
    if (!pill || !row) return;

    const el = id ? triggerRefs.current[id] : null;
    if (!el) {
      pill.dataset.visible = "false";
      return;
    }

    const rowBox = row.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    pill.style.setProperty("--pill-x", `${Math.round(box.left - rowBox.left)}px`);
    pill.style.setProperty("--pill-w", `${Math.round(box.width)}px`);
    pill.dataset.visible = "true";
  }, []);

  const clearTimers = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const openMenu = useCallback((id: string) => {
    const current = activeRef.current;
    if (current === id) return;
    const from = NAV_MENUS.findIndex((m) => m.id === current);
    const to = NAV_MENUS.findIndex((m) => m.id === id);
    dirRef.current = current === null || to >= from ? 1 : -1;
    instantRef.current = current === null;
    activeRef.current = id;
    setActive(id);
  }, []);

  const closeMenu = useCallback(() => {
    clearTimers();
    activeRef.current = null;
    setActive(null);
    setHovered(null);
  }, [clearTimers]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell || !active) return;

    if (!instantRef.current) {
      applyShell(active);
      return;
    }

    shell.dataset.instant = "true";
    applyShell(active);
    const raf = requestAnimationFrame(() => {
      instantRef.current = false;
      shell.dataset.instant = "false";
    });
    return () => cancelAnimationFrame(raf);
  }, [active, applyShell]);

  useLayoutEffect(() => {
    applyPill(hovered ?? active);
  }, [hovered, active, applyPill]);

  useLayoutEffect(() => {
    const measure = () => {
      let changed = false;
      for (const menu of NAV_MENUS) {
        const el = panelRefs.current[menu.id];
        if (!el) continue;
        const h = el.offsetHeight;
        if (h > 0 && heightsRef.current[menu.id] !== h) {
          heightsRef.current[menu.id] = h;
          changed = true;
        }
      }
      if (changed) applyShell(activeRef.current);
    };

    measure();

    const ro = new ResizeObserver(measure);
    for (const menu of NAV_MENUS) {
      const el = panelRefs.current[menu.id];
      if (el) ro.observe(el);
    }
    return () => ro.disconnect();
  }, [applyShell]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const bar = barRef.current;
    if (!nav || !bar) return;

    const apply = () => {
      nav.style.setProperty("--nav-h", `${bar.offsetHeight}px`);
    };
    apply();

    const ro = new ResizeObserver(apply);
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      applyShell(activeRef.current);
      applyPill(activeRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyShell, applyPill]);

  useEffect(() => {
    const nav = navRef.current;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (nav) nav.dataset.scrolled = y > 8 ? "true" : "false";
      if (progressRef.current) {
        const ratio = max > 8 ? Math.min(1, Math.max(0, y / max)) : 0;
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
      if (activeRef.current) closeMenu();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [closeMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const current = activeRef.current;
      if (current) {
        const trigger = triggerRefs.current[current];
        closeMenu();
        trigger?.focus();
      }
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => clearTimers, [clearTimers]);

  const handleTriggerEnter = useCallback(
    (id: string, pointerType: string) => {
      if (pointerType === "touch") return;
      clearTimers();
      setHovered(id);
      if (activeRef.current) {
        openMenu(id);
        return;
      }
      openTimer.current = window.setTimeout(() => openMenu(id), OPEN_DELAY);
    },
    [clearTimers, openMenu]
  );

  const handleRailLeave = useCallback(() => {
    clearTimers();
    setHovered(null);
    closeTimer.current = window.setTimeout(() => {
      activeRef.current = null;
      setActive(null);
    }, CLOSE_DELAY);
  }, [clearTimers]);

  const handleRailEnter = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
      closeMenu();
    },
    [closeMenu]
  );

  return (
    <>
      <header
        ref={navRef}
        data-nav
        data-scrolled="false"
        data-menu-open={active ? "true" : "false"}
        data-variant={variant}
        className="sticky top-0 z-50"
      >
        <div ref={barRef} className="nav-bar">
          <div
            ref={railRef}
            className="relative mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-8 sm:py-3.5 lg:px-10"
            onPointerEnter={handleRailEnter}
            onPointerLeave={handleRailLeave}
            onBlur={handleBlur}
          >
            <Link
              href="/"
              className="nav-logo shrink-0"
              aria-label="Signpost home"
              onClick={closeMenu}
            >
              <Image
                src="/text-logo.png"
                alt="Signpost: learn ASL online for free with machine learning feedback"
                width={280}
                height={68}
                priority
                className="-my-4 h-16 w-auto sm:-my-5 sm:h-[4.5rem]"
              />
            </Link>

            <div
              ref={rowRef}
              className="relative ml-2 hidden items-center lg:flex"
              role="list"
            >
              <span
                ref={pillRef}
                className="nav-pill"
                data-visible="false"
                aria-hidden="true"
              />
              {NAV_MENUS.map((menu) => (
                <button
                  key={menu.id}
                  ref={(el) => {
                    triggerRefs.current[menu.id] = el;
                  }}
                  type="button"
                  className="nav-trigger"
                  data-active={active === menu.id ? "true" : "false"}
                  aria-expanded={active === menu.id}
                  aria-controls={`nav-panel-${menu.id}`}
                  aria-haspopup="true"
                  onPointerEnter={(e) => handleTriggerEnter(menu.id, e.pointerType)}
                  onFocus={() => setHovered(menu.id)}
                  onClick={() => {
                    clearTimers();
                    if (active === menu.id) closeMenu();
                    else openMenu(menu.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      openMenu(menu.id);
                      window.setTimeout(() => {
                        panelRefs.current[menu.id]
                          ?.querySelector<HTMLElement>("a[href]")
                          ?.focus();
                      }, 40);
                    }
                  }}
                >
                  {menu.label}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="nav-chevron"
                  >
                    <path d="m3.2 4.6 2.8 2.8 2.8-2.8" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  setWaitlistOpen(true);
                }}
                className="nav-ghost hidden sm:inline-flex"
              >
                Join waitlist
              </button>

              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
                onClick={closeMenu}
              >
                Try the demo
                <span aria-hidden="true" className="nav-cta-arrow">
                  →
                </span>
              </a>

              <button
                type="button"
                className="nav-burger"
                aria-expanded={mobileOpen}
                aria-controls="nav-mobile-sheet"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span className="nav-burger-lines" data-open={mobileOpen ? "true" : "false"}>
                  <span />
                  <span />
                </span>
              </button>
            </div>

            <div className="nav-dropdown" aria-hidden={active ? undefined : true}>
              <div
                ref={shellRef}
                className="nav-shell"
                data-open={active ? "true" : "false"}
                data-instant="true"
              >
                <div className="nav-surface">
                  {NAV_MENUS.map((menu) => (
                    <div
                      key={menu.id}
                      id={`nav-panel-${menu.id}`}
                      ref={(el) => {
                        panelRefs.current[menu.id] = el;
                      }}
                      className="nav-panel"
                      data-active={active === menu.id ? "true" : "false"}
                      style={{ width: `${menu.width}px` }}
                      inert={active !== menu.id}
                      aria-label={`${menu.label} menu`}
                    >
                      <div
                        className={
                          menu.feature
                            ? "grid grid-cols-[1fr_236px] gap-2 p-2"
                            : "p-2"
                        }
                      >
                        <div
                          className={
                            menu.columns === 2
                              ? "grid grid-cols-2 gap-1"
                              : "flex flex-col gap-0.5"
                          }
                        >
                          {menu.links.map((link) => (
                            <MenuItem
                              key={link.label}
                              link={link}
                              compact={menu.compact}
                              onNavigate={closeMenu}
                            />
                          ))}
                        </div>
                        {menu.feature ? (
                          <FeatureCard kind={menu.feature} onNavigate={closeMenu} />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <span ref={progressRef} className="nav-progress" aria-hidden="true" />
        </div>

        <div
          id="nav-mobile-sheet"
          className="nav-sheet"
          data-open={mobileOpen ? "true" : "false"}
          inert={!mobileOpen}
        >
          <div className="nav-sheet-inner">
            {NAV_MENUS.map((menu, i) => {
              const open = mobileSection === menu.id;
              return (
                <div
                  key={menu.id}
                  className="nav-sheet-group"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <button
                    type="button"
                    className="nav-sheet-trigger"
                    aria-expanded={open}
                    onClick={() => setMobileSection(open ? null : menu.id)}
                  >
                    {menu.label}
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="nav-chevron"
                      data-open={open ? "true" : "false"}
                    >
                      <path d="m3.2 4.6 2.8 2.8 2.8-2.8" />
                    </svg>
                  </button>
                  <div className="nav-sheet-collapse" data-open={open ? "true" : "false"}>
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-0.5 pb-3">
                        {menu.links.map((link) => (
                          <MenuItem
                            key={link.label}
                            link={link}
                            compact
                            onNavigate={() => setMobileOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              className="nav-sheet-actions"
              style={{ "--i": NAV_MENUS.length } as React.CSSProperties}
            >
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Try the demo
                <span aria-hidden="true" className="nav-cta-arrow">
                  →
                </span>
              </a>
              <button
                type="button"
                className="nav-sheet-secondary"
                onClick={() => {
                  setMobileOpen(false);
                  setWaitlistOpen(true);
                }}
              >
                Join the waitlist
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className="nav-scrim"
        data-open={active ? "true" : "false"}
        aria-hidden="true"
        onClick={closeMenu}
      />

      <WhiteWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
