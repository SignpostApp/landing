import type { IconName } from "./navIcons";

export type NavItem =
  | {
      type: "icon";
      label: string;
      desc: string;
      href: string;
      icon: IconName;
      external?: boolean;
    }
  | { type: "link"; label: string; href: string; external?: boolean }
  | { type: "tile"; label: string; desc: string; href: string; external?: boolean };

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type NavFeature = {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
  visual: { type: "image"; src: string; position?: string } | { type: "logos" };
};

export type NavMenu = {
  id: string;
  label: string;
  divided?: boolean;
  sections: NavSection[];
  feature: NavFeature;
};

export type NavLink = {
  label: string;
  href: string;
};

export const DEMO_URL = "https://demo.signpost.cv";

export const NAV_MENUS: NavMenu[] = [
  {
    id: "product",
    label: "Product",
    sections: [
      {
        title: "Learn",
        items: [
          {
            type: "icon",
            label: "Real-time Feedback Engine",
            desc: "Corrections in under 100ms",
            href: "/blog/how-real-time-sign-feedback-works",
            icon: "cpu",
          },
          {
            type: "icon",
            label: "Standard ASL Curriculum",
            desc: "Alphabet to conversation",
            href: "/#curriculum",
            icon: "book",
          },
        ],
      },
      {
        title: "Platform",
        items: [
          {
            type: "icon",
            label: "Privacy By Design",
            desc: "Your video stays local",
            href: "/legal/security",
            icon: "lock",
          },
          {
            type: "icon",
            label: "LMS Integrations",
            desc: "LTI 1.3 for your school's LMS",
            href: "/#schools",
            icon: "grid",
          },
        ],
      },
      {
        title: "Get started",
        items: [
          {
            type: "icon",
            label: "How It Works",
            desc: "Your first sign in three steps",
            href: "/#how-it-works",
            icon: "steps",
          },
          {
            type: "icon",
            label: "Free Demo",
            desc: "Opens in any browser",
            href: DEMO_URL,
            icon: "play",
            external: true,
          },
        ],
      },
    ],
    feature: {
      title: "Try it in your browser",
      desc: "No sign-up, no download. Turn on your webcam and sign your first letter in a couple of minutes.",
      href: DEMO_URL,
      external: true,
      visual: { type: "image", src: "/demo-ss.png", position: "50% 24%" },
    },
  },
  {
    id: "solutions",
    label: "Solutions",
    divided: true,
    sections: [
      {
        title: "For learners",
        items: [
          { type: "link", label: "Self-learners", href: "/blog/learn-asl-on-your-own" },
          { type: "link", label: "Homeschoolers", href: "/blog/asl-for-homeschoolers" },
          {
            type: "link",
            label: "Students without an ASL class",
            href: "/blog/learn-asl-when-your-school-doesnt-offer-it",
          },
          {
            type: "tile",
            label: "Free for every learner",
            desc: "Every unit is free, forever. Plans are cosmetic only.",
            href: "/#features",
          },
        ],
      },
      {
        title: "For schools",
        items: [
          {
            type: "link",
            label: "Schools and districts",
            href: "/blog/asl-for-schools-and-districts",
          },
          { type: "link", label: "ASL educators", href: "/blog/asl-for-educators" },
        ],
      },
    ],
    feature: {
      title: "Works inside your school's LMS",
      desc: "Full LTI 1.3 support, so lessons and grades land where your school already works.",
      href: "/#schools",
      visual: { type: "logos" },
    },
  },
  {
    id: "resources",
    label: "Resources",
    divided: true,
    sections: [
      {
        title: "Guides",
        items: [
          {
            type: "icon",
            label: "ASL Alphabet Guide",
            desc: "Fingerspelling from A to Z",
            href: "/blog/how-to-learn-the-asl-alphabet",
            icon: "hand",
          },
          {
            type: "icon",
            label: "How Long ASL Takes",
            desc: "An honest beginner timeline",
            href: "/blog/how-long-does-it-take-to-learn-asl",
            icon: "clock",
          },
          {
            type: "icon",
            label: "Is ASL Hard to Learn?",
            desc: "Where beginners get stuck",
            href: "/blog/is-asl-hard-to-learn",
            icon: "help",
          },
          {
            type: "icon",
            label: "Learning at Home",
            desc: "Self-study that works",
            href: "/blog/best-way-to-learn-sign-language-at-home",
            icon: "home",
          },
          {
            type: "icon",
            label: "Why Videos Fall Short",
            desc: "Watching isn't signing",
            href: "/blog/why-watching-videos-isnt-enough-to-learn-asl",
            icon: "play",
          },
        ],
      },
      {
        title: "Company",
        items: [
          { type: "link", label: "About us", href: "/#team" },
          { type: "link", label: "Our story", href: "/blog/our-origin-story" },
          {
            type: "link",
            label: "GitHub",
            href: "https://github.com/SignpostApp",
            external: true,
          },
        ],
      },
      {
        title: "Legal",
        items: [
          { type: "link", label: "Privacy", href: "/legal/privacy" },
          { type: "link", label: "Terms", href: "/legal/terms" },
          { type: "link", label: "Security", href: "/legal/security" },
        ],
      },
    ],
    feature: {
      title: "How our feedback engine works",
      desc: "What happens between your hand and the score, all in under 100 milliseconds.",
      href: "/blog/how-real-time-sign-feedback-works",
      visual: { type: "image", src: "/blog/banner.png" },
    },
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export const LMS_MARKS = [
  { src: "/icons/canvas.png", alt: "Canvas" },
  { src: "/icons/blackboard.png", alt: "Blackboard" },
  { src: "/icons/Schoology.png", alt: "Schoology" },
];
