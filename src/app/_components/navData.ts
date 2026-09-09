import type { IconName } from "./navIcons";

export type NavLink = {
  label: string;
  desc?: string;
  href: string;
  icon?: IconName;
  external?: boolean;
};

export type NavMenu = {
  id: string;
  label: string;
  width: number;
  columns: 1 | 2;
  compact?: boolean;
  links: NavLink[];
  feature?: "demo" | "lms" | "blog";
};

export const NAV_MENUS: NavMenu[] = [
  {
    id: "product",
    label: "Product",
    width: 620,
    columns: 1,
    feature: "demo",
    links: [
      {
        label: "Real-time Feedback Engine",
        desc: "A machine learning model trained to work with ASL.",
        href: "/blog/how-real-time-sign-feedback-works",
        icon: "cpu",
      },
      {
        label: "Standard ASL Curriculum",
        desc: "Alphabet to conversations over 30+ units.",
        href: "/#curriculum",
        icon: "book",
      },
      {
        label: "Privacy By Design",
        desc: "Hand tracking runs on your device, not ours.",
        href: "/legal/security",
        icon: "lock",
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    width: 640,
    columns: 1,
    feature: "lms",
    links: [
      {
        label: "For self-learners",
        desc: "Teach yourself at home, at your own pace.",
        href: "/blog/learn-asl-on-your-own",
        icon: "user",
      },
      {
        label: "For homeschoolers",
        desc: "Add ASL as a new language in your curriculum.",
        href: "/blog/asl-for-homeschoolers",
        icon: "home",
      },
      {
        label: "For schools and districts",
        desc: "Empowering educators and students alike.",
        href: "/blog/asl-for-schools-and-districts",
        icon: "building",
      },
      {
        label: "For ASL educators",
        desc: "Feedback that scales past your contact hours.",
        href: "/blog/asl-for-educators",
        icon: "users",
      },
      {
        label: "For students without a class",
        desc: "Allowing underexposed students access to ASL feedback.",
        href: "/blog/learn-asl-when-your-school-doesnt-offer-it",
        icon: "chat",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    width: 640,
    columns: 2,
    feature: "blog",
    links: [
      {
        label: "Blog",
        desc: "Honest guides to learning ASL at home.",
        href: "/blog",
        icon: "doc",
      },
      {
        label: "FAQ",
        desc: "Answers to the questions we get most.",
        href: "/#faq",
        icon: "help",
      },
      {
        label: "ASL alphabet guide",
        desc: "Fingerspelling, one letter at a time.",
        href: "/blog/how-to-learn-the-asl-alphabet",
        icon: "hand",
      },
      {
        label: "GitHub",
        desc: "Follow along with how Signpost is built.",
        href: "https://github.com/SignpostApp",
        icon: "code",
        external: true,
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    width: 260,
    columns: 1,
    compact: true,
    links: [
      { label: "About us", href: "/#team" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
    ],
  },
];

export const FEATURED_POSTS = [
  {
    title: "How Long Does It Take to Learn ASL? An Honest Answer",
    href: "/blog/how-long-does-it-take-to-learn-asl",
    meta: "6 min read",
  },
  {
    title: "Why Watching Videos Isn't Enough to Learn ASL",
    href: "/blog/why-watching-videos-isnt-enough-to-learn-asl",
    meta: "5 min read",
  },
];

export const LMS_MARKS = [
  { src: "/icons/canvas.png", alt: "Canvas" },
  { src: "/icons/blackboard.png", alt: "Blackboard" },
  { src: "/icons/Schoology.png", alt: "Schoology" },
];

export const DEMO_URL = "https://demo.signpost.cv";
