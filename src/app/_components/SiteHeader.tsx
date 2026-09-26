"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import WhiteWaitlistModal from "../WhiteWaitlistModal";
import { NavIcon } from "./navIcons";
import {
  DEMO_URL,
  LMS_MARKS,
  NAV_LINKS,
  NAV_MENUS,
  type NavFeature,
  type NavItem,
  type NavSection,
} from "./navData";

const OPEN_DELAY = 70;
const CLOSE_DELAY = 180;
const CLICK_GRACE = 600;
const CONTENT_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const CHEVRON_DOWN = "6 9 12 15 18 9";
const CHEVRON_RIGHT = "9 6 15 12 9 18";
const CHEVRON_LEFT = "15 18 9 12 15 6";

type Frame = { opacity: number; transform: string };

function slide(el: HTMLElement, from: Frame, to: Frame) {
  const running = el.getAnimations();
  let start = from;
  if (running.length > 0) {
    const style = getComputedStyle(el);
    start = { opacity: Number(style.opacity), transform: style.transform };
    running.forEach((animation) => animation.cancel());
  }
  el.animate(
    [
      { opacity: start.opacity, transform: start.transform },
      { opacity: to.opacity, offset: 0.5 },
      { opacity: to.opacity, transform: to.transform },
    ],
    { duration: 500, easing: CONTENT_EASE }
  );
}

function focusables(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
  );
}

function ChevronIcon({ points, className }: { points: string; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points={points} />
    </svg>
  );
}

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
      className="nav-external"
    >
      <path d="M4 8 8 4M4.6 4H8v3.4" />
    </svg>
  );
}

function NavAnchor({
  href,
  external,
  className,
  onNavigate,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

function MegaItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (item.type === "icon") {
    return (
      <NavAnchor
        href={item.href}
        external={item.external}
        className="mega-icon-item"
        onNavigate={onNavigate}
      >
        <span className="mega-badge">
          <NavIcon name={item.icon} />
        </span>
        <span className="mega-icon-text">
          <span className="mega-icon-label">
            {item.label}
            {item.external ? <ExternalGlyph /> : null}
          </span>
          <span className="mega-icon-desc">{item.desc}</span>
        </span>
      </NavAnchor>
    );
  }

  if (item.type === "tile") {
    return (
      <NavAnchor
        href={item.href}
        external={item.external}
        className="mega-tile"
        onNavigate={onNavigate}
      >
        <span className="mega-tile-label">{item.label}</span>
        <span className="mega-tile-desc">{item.desc}</span>
      </NavAnchor>
    );
  }

  return (
    <NavAnchor
      href={item.href}
      external={item.external}
      className="mega-link"
      onNavigate={onNavigate}
    >
      {item.label}
      {item.external ? <ExternalGlyph /> : null}
    </NavAnchor>
  );
}

function MegaSection({
  section,
  onNavigate,
}: {
  section: NavSection;
  onNavigate: () => void;
}) {
  const iconList = section.items.some((item) => item.type === "icon");

  return (
    <div className="mega-section">
      <p className="mega-label">{section.title}</p>
      <ul className={iconList ? "mega-icon-list" : "mega-link-list"}>
        {section.items.map((item) => (
          <li key={item.label}>
            <MegaItem item={item} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaFeature({
  feature,
  onNavigate,
}: {
  feature: NavFeature;
  onNavigate: () => void;
}) {
  const { visual } = feature;

  return (
    <div className="mega-feature">
      <p className="mega-label">Featured</p>
      <NavAnchor
        href={feature.href}
        external={feature.external}
        className="mega-feature-link"
        onNavigate={onNavigate}
      >
        {visual.type === "image" ? (
          <span className="mega-feature-visual">
            <Image
              src={visual.src}
              alt=""
              fill
              loading="eager"
              sizes="(min-width: 1024px) 240px, 100vw"
              className="object-cover"
              style={{ objectPosition: visual.position ?? "50% 50%" }}
            />
          </span>
        ) : (
          <span className="mega-feature-visual mega-feature-logos">
            {LMS_MARKS.map((mark) => (
              <Image
                key={mark.src}
                src={mark.src}
                alt={mark.alt}
                width={160}
                height={48}
                loading="eager"
                className="h-9 w-auto max-w-[28%] object-contain"
              />
            ))}
          </span>
        )}
        <span className="mega-feature-text">
          <span className="mega-feature-title">
            {feature.title}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mega-feature-arrow"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <span className="mega-feature-desc">{feature.desc}</span>
        </span>
      </NavAnchor>
    </div>
  );
}

export default function SiteHeader({
  variant = "solid",
}: {
  variant?: "solid" | "plain";
}) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const backRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeRef = useRef<string | null>(null);
  const previousRef = useRef<string | null>(null);
  const heightsRef = useRef<Record<string, number>>({});
  const hoverOpenedAt = useRef(0);
  const focusNext = useRef<(() => HTMLElement | null | undefined) | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const drilled = mobileOpen && mobilePanel !== null;

  const clearTimers = useCallback(() => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const openMenu = useCallback((id: string) => {
    if (activeRef.current === id) return;
    activeRef.current = id;
    setActive(id);
    setShown(id);
  }, []);

  const closeMenu = useCallback(() => {
    clearTimers();
    activeRef.current = null;
    setActive(null);
  }, [clearTimers]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      activeRef.current = null;
      setActive(null);
    }, CLOSE_DELAY);
  }, [clearTimers]);

  const cancelClose = useCallback(() => {
    if (!closeTimer.current) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const applyHeight = useCallback(() => {
    const mega = megaRef.current;
    if (!mega) return;
    const id = activeRef.current;
    mega.style.height = id ? `${heightsRef.current[id] ?? 0}px` : "";
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      for (const menu of NAV_MENUS) {
        const panel = panelRefs.current[menu.id];
        if (panel) heightsRef.current[menu.id] = panel.offsetHeight;
      }
      applyHeight();
    };

    measure();

    const observer = new ResizeObserver(measure);
    for (const menu of NAV_MENUS) {
      const panel = panelRefs.current[menu.id];
      if (panel) observer.observe(panel);
    }
    return () => observer.disconnect();
  }, [applyHeight]);

  useLayoutEffect(() => {
    applyHeight();

    const previous = previousRef.current;
    previousRef.current = active;
    if (!active || previous === active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const incoming = panelRefs.current[active];
    if (!incoming) return;

    if (!previous) {
      slide(
        incoming,
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "none" }
      );
      return;
    }

    const from = NAV_MENUS.findIndex((menu) => menu.id === previous);
    const to = NAV_MENUS.findIndex((menu) => menu.id === active);
    const dir = to > from ? 1 : -1;
    const outgoing = panelRefs.current[previous];

    if (outgoing) {
      slide(
        outgoing,
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: `translateX(${-dir * 20}%)` }
      );
    }
    slide(
      incoming,
      { opacity: 0, transform: `translateX(${dir * 20}%)` },
      { opacity: 1, transform: "none" }
    );
  }, [active, applyHeight]);

  useLayoutEffect(() => {
    const target = focusNext.current;
    focusNext.current = null;
    target?.()?.focus();
  }, [active, mobilePanel]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const bar = barRef.current;
    if (!nav || !bar) return;

    const apply = () => {
      nav.style.setProperty("--nav-h", `${bar.offsetHeight}px`);
    };
    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

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
        closeMenu();
        triggerRefs.current[current]?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMobileOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const handleTriggerEnter = useCallback(
    (id: string, pointerType: string) => {
      if (pointerType === "touch") return;
      clearTimers();
      const open = () => {
        hoverOpenedAt.current = performance.now();
        openMenu(id);
      };
      if (activeRef.current) {
        open();
        return;
      }
      openTimer.current = window.setTimeout(open, OPEN_DELAY);
    },
    [clearTimers, openMenu]
  );

  const handleTriggerLeave = useCallback(() => {
    if (!openTimer.current) return;
    window.clearTimeout(openTimer.current);
    openTimer.current = null;
  }, []);

  const handleLinkEnter = useCallback(
    (pointerType: string) => {
      if (pointerType === "touch" || !activeRef.current) return;
      scheduleClose();
    },
    [scheduleClose]
  );

  const handleRailLeave = useCallback(() => {
    if (activeRef.current) scheduleClose();
    else clearTimers();
  }, [clearTimers, scheduleClose]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
      if (activeRef.current) closeMenu();
    },
    [closeMenu]
  );

  const focusPanel = useCallback(
    (id: string) => {
      const first = () => focusables(panelRefs.current[id])[0];
      if (activeRef.current === id) {
        first()?.focus();
        return;
      }
      focusNext.current = first;
      openMenu(id);
    },
    [openMenu]
  );

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
      if (e.key !== "Tab") return;
      const items = focusables(e.currentTarget);
      const index = items.indexOf(document.activeElement as HTMLElement);
      const trigger = triggerRefs.current[id];

      if (e.shiftKey && index === 0) {
        e.preventDefault();
        trigger?.focus();
        return;
      }

      if (!e.shiftKey && index === items.length - 1) {
        const order = focusables(listRef.current);
        const next = trigger ? order[order.indexOf(trigger) + 1] : undefined;
        if (!next) return;
        e.preventDefault();
        closeMenu();
        next.focus();
      }
    },
    [closeMenu]
  );

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const openMobile = () => {
    closeMenu();
    setMobilePanel(null);
    setMobileOpen(true);
  };

  const enterPanel = (id: string) => {
    focusNext.current = () => backRef.current;
    setMobilePanel(id);
  };

  const leavePanel = () => {
    const from = mobilePanel;
    if (!from) return;
    focusNext.current = () => rowRefs.current[from];
    setMobilePanel(null);
  };

  const isCurrent = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header
        ref={navRef}
        data-nav
        data-scrolled="false"
        data-menu-open={active ? "true" : "false"}
        data-mobile-open={mobileOpen ? "true" : "false"}
        data-variant={variant}
        className="sticky top-0 z-50"
      >
        <div
          className="nav-overlay"
          data-open={active ? "true" : "false"}
          aria-hidden="true"
          onClick={closeMenu}
        />

        <div ref={barRef} className="nav-bar">
          <div
            className="relative mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-2.5"
            onPointerEnter={cancelClose}
            onPointerLeave={handleRailLeave}
            onBlur={handleBlur}
          >
            <div className="nav-brand shrink-0">
              <Link
                href="/"
                className="nav-logo"
                data-hidden={drilled ? "true" : "false"}
                aria-label="Signpost home"
                aria-hidden={drilled ? true : undefined}
                tabIndex={drilled ? -1 : undefined}
                onClick={() => {
                  closeMenu();
                  closeMobile();
                }}
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
              <button
                ref={backRef}
                type="button"
                className="nav-back"
                data-visible={drilled ? "true" : "false"}
                aria-hidden={drilled ? undefined : true}
                tabIndex={drilled ? undefined : -1}
                onClick={leavePanel}
              >
                <ChevronIcon points={CHEVRON_LEFT} className="h-4 w-4" />
                Back
              </button>
            </div>

            <nav aria-label="Main" className="ml-2 hidden lg:block">
              <ul ref={listRef} className="nav-list" data-open={active ? "true" : "false"}>
                {NAV_MENUS.map((menu) => (
                  <li key={menu.id}>
                    <button
                      ref={(el) => {
                        triggerRefs.current[menu.id] = el;
                      }}
                      type="button"
                      className="nav-trigger"
                      data-state={active === menu.id ? "open" : "closed"}
                      aria-expanded={active === menu.id}
                      aria-controls={`nav-panel-${menu.id}`}
                      onPointerEnter={(e) => handleTriggerEnter(menu.id, e.pointerType)}
                      onPointerLeave={handleTriggerLeave}
                      onClick={() => {
                        clearTimers();
                        if (activeRef.current !== menu.id) openMenu(menu.id);
                        else if (performance.now() - hoverOpenedAt.current > CLICK_GRACE) {
                          closeMenu();
                        }
                      }}
                      onKeyDown={(e) => {
                        const open = activeRef.current === menu.id;
                        if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey && open)) {
                          e.preventDefault();
                          clearTimers();
                          focusPanel(menu.id);
                        }
                      }}
                    >
                      {menu.label}
                      <ChevronIcon points={CHEVRON_DOWN} className="nav-chevron" />
                    </button>
                  </li>
                ))}
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="nav-trigger"
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                      onPointerEnter={(e) => handleLinkEnter(e.pointerType)}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <div className="nav-actions" data-hidden={mobileOpen ? "true" : "false"}>
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
                </a>
              </div>

              <button
                ref={burgerRef}
                type="button"
                className="nav-burger"
                data-open={mobileOpen ? "true" : "false"}
                aria-expanded={mobileOpen}
                aria-controls="nav-mobile-sheet"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => (mobileOpen ? closeMobile() : openMobile())}
              >
                <span className="nav-burger-line" />
                <span className="nav-burger-line" />
                <span className="nav-burger-line" />
              </button>
            </div>

            <div
              ref={megaRef}
              className="mega"
              data-state={active ? "open" : "closed"}
              onPointerEnter={cancelClose}
            >
              {NAV_MENUS.map((menu) => (
                <div
                  key={menu.id}
                  id={`nav-panel-${menu.id}`}
                  ref={(el) => {
                    panelRefs.current[menu.id] = el;
                  }}
                  role="group"
                  aria-label={`${menu.label} menu`}
                  className="mega-panel"
                  data-visible={shown === menu.id ? "true" : "false"}
                  data-active={active === menu.id ? "true" : "false"}
                  inert={active !== menu.id}
                  onKeyDown={(e) => handlePanelKeyDown(e, menu.id)}
                >
                  <div className="mega-main">
                    <div
                      className="mega-grid"
                      data-divided={menu.divided ? "true" : "false"}
                      style={{
                        gridTemplateColumns: `repeat(${menu.sections.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {menu.sections.map((section) => (
                        <MegaSection
                          key={section.title}
                          section={section}
                          onNavigate={closeMenu}
                        />
                      ))}
                    </div>
                  </div>
                  <MegaFeature feature={menu.feature} onNavigate={closeMenu} />
                </div>
              ))}
            </div>
          </div>

          <span ref={progressRef} className="nav-progress" aria-hidden="true" />
        </div>

        <div
          id="nav-mobile-sheet"
          className="msheet"
          data-open={mobileOpen ? "true" : "false"}
          inert={!mobileOpen}
        >
          <nav aria-label="Mobile" className="msheet-panes">
            <div
              className="msheet-pane"
              data-state={mobilePanel ? "before" : "active"}
              inert={mobilePanel !== null}
            >
              <ul>
                {NAV_MENUS.map((menu) => (
                  <li key={menu.id}>
                    <button
                      ref={(el) => {
                        rowRefs.current[menu.id] = el;
                      }}
                      type="button"
                      className="msheet-row"
                      aria-controls={`nav-mobile-${menu.id}`}
                      onClick={() => enterPanel(menu.id)}
                    >
                      {menu.label}
                      <ChevronIcon points={CHEVRON_RIGHT} className="h-5 w-5" />
                    </button>
                  </li>
                ))}
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="msheet-row"
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                      onClick={closeMobile}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {NAV_MENUS.map((menu) => (
              <div
                key={menu.id}
                id={`nav-mobile-${menu.id}`}
                role="group"
                aria-label={`${menu.label} menu`}
                className="msheet-pane"
                data-state={mobilePanel === menu.id ? "active" : "after"}
                inert={mobilePanel !== menu.id}
              >
                <div className="msheet-sections">
                  {menu.sections.map((section) => (
                    <MegaSection
                      key={section.title}
                      section={section}
                      onNavigate={closeMobile}
                    />
                  ))}
                </div>
                <MegaFeature feature={menu.feature} onNavigate={closeMobile} />
              </div>
            ))}
          </nav>

          <div className="msheet-actions">
            <button
              type="button"
              className="msheet-btn msheet-btn-dark"
              onClick={() => {
                closeMobile();
                setWaitlistOpen(true);
              }}
            >
              Join waitlist
            </button>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="msheet-btn msheet-btn-primary"
              onClick={closeMobile}
            >
              Try the demo
            </a>
          </div>
        </div>
      </header>

      <WhiteWaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
