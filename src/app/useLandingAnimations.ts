"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ANIMATED_SELECTOR =
  "[data-hero-heading], [data-hero-item], [data-hero-visual], [data-hero-chip], [data-reveal], [data-reveal-group] > *";

export function useLandingAnimations(root: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const mm = gsap.matchMedia(scope);

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { motion } = context.conditions as { motion: boolean };

        if (!motion) {
          gsap.set(ANIMATED_SELECTOR, { opacity: 1, y: 0, x: 0, scale: 1 });
          return;
        }

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.05,
        });

        const heading = scope.querySelector<HTMLElement>("[data-hero-heading]");

        if (heading) {
          const split = SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            linesClass: "hero-line",
          });

          gsap.set(heading, { opacity: 1 });

          intro.from(
            split.lines,
            {
              yPercent: 112,
              duration: 1.05,
              stagger: 0.085,
              onComplete: () => split.revert(),
            },
            0.06
          );
        }

        intro
          .fromTo(
            "[data-hero-item]",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 },
            0
          )
          .fromTo(
            "[data-hero-visual]",
            { y: 34, opacity: 0, scale: 0.985 },
            { y: 0, opacity: 1, scale: 1, duration: 1.15 },
            0.1
          )
          .fromTo(
            "[data-hero-chip]",
            { y: 12, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.14 },
            0.7
          );

        gsap.utils
          .toArray<HTMLElement>("[data-hero-chip]")
          .forEach((chip, i) => {
            gsap.to(chip, {
              y: i % 2 === 0 ? -6 : 6,
              duration: 3.4 + i * 0.5,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: 1.8,
            });
          });

        const hero = scope.querySelector<HTMLElement>("[data-hero]");

        if (hero) {
          gsap.to("[data-hero-parallax]", {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
          gsap.fromTo(
            node,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: node, start: "top 88%", once: true },
            }
          );
        });

        gsap.utils
          .toArray<HTMLElement>("[data-reveal-group]")
          .forEach((group) => {
            gsap.fromTo(
              Array.from(group.children),
              { y: 26, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: { trigger: group, start: "top 88%", once: true },
              }
            );
          });

      }
    );

    return () => {
      mm.revert();
    };
  }, [root]);
}
