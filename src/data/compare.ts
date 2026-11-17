export interface Competitor {
  id: string;
  name: string;
  url: string;
  summary: string;
}

export interface CompareFeature {
  id: string;
  label: string;
  values: Record<string, boolean>;
  notes?: Record<string, number>;
  homepage?: boolean;
}

export const COMPARE_CHECKED_ON = "2026-11-16";
export const COMPARE_CHECKED_LABEL = "November 16, 2026";

export const SIGNPOST_ID = "signpost";

export const COMPETITORS: Competitor[] = [
  {
    id: SIGNPOST_ID,
    name: "Signpost",
    url: "https://signpostasl.com",
    summary:
      "A free, browser-based ASL platform that tracks your hands through your webcam and grades every sign you make in real time.",
  },
  {
    id: "lingvano",
    name: "Lingvano",
    url: "https://www.lingvano.com/asl",
    summary:
      "A polished subscription app with Deaf teachers, short video lessons, and a camera feature that checks fingerspelled letters.",
  },
  {
    id: "aslbloom",
    name: "ASL Bloom",
    url: "https://www.aslbloom.com",
    summary:
      "A mobile app with a large video dictionary and bite-sized lessons. A free tier with ads is limited to a couple of lessons a day.",
  },
  {
    id: "startasl",
    name: "Start ASL",
    url: "https://www.startasl.com",
    summary:
      "A long-running website with a paid multi-level course, free introductory lessons, and a large library of reference videos.",
  },
  {
    id: "lifeprint",
    name: "Lifeprint",
    url: "https://www.lifeprint.com",
    summary:
      "Dr. Bill Vicars's free ASL University: 60 text-and-video lessons and a dictionary of thousands of signs, online since 1997.",
  },
  {
    id: "signschool",
    name: "SignSchool",
    url: "https://www.signschool.com",
    summary:
      "A free, foundation-supported web and mobile app with video lessons, a dictionary, and games. Lessons require a free account.",
  },
];

export const FEATURES: CompareFeature[] = [
  {
    id: "camera-feedback",
    label: "Real-time feedback on whole signs from your webcam",
    homepage: true,
    values: { signpost: true, lingvano: false, aslbloom: false, startasl: false, lifeprint: false, signschool: false },
    notes: { lingvano: 1 },
  },
  {
    id: "accuracy-score",
    label: "Accuracy score on every sign you make",
    homepage: true,
    values: { signpost: true, lingvano: false, aslbloom: false, startasl: false, lifeprint: false, signschool: false },
  },
  {
    id: "on-device",
    label: "Hand tracking runs on your device, no video uploaded",
    values: { signpost: true, lingvano: false, aslbloom: false, startasl: false, lifeprint: false, signschool: false },
  },
  {
    id: "free",
    label: "Every lesson free, no subscription",
    homepage: true,
    values: { signpost: true, lingvano: false, aslbloom: false, startasl: false, lifeprint: true, signschool: true },
    notes: { lingvano: 2, aslbloom: 3, startasl: 4 },
  },
  {
    id: "no-account",
    label: "Start in the browser without an account",
    homepage: true,
    values: { signpost: true, lingvano: false, aslbloom: false, startasl: true, lifeprint: true, signschool: false },
    notes: { startasl: 5, signschool: 6 },
  },
  {
    id: "curriculum",
    label: "Structured curriculum from the alphabet to conversation",
    values: { signpost: true, lingvano: true, aslbloom: true, startasl: true, lifeprint: true, signschool: true },
  },
  {
    id: "dictionary",
    label: "Sign dictionary with video",
    values: { signpost: true, lingvano: true, aslbloom: true, startasl: true, lifeprint: true, signschool: true },
    notes: { lingvano: 7 },
  },
  {
    id: "lti",
    label: "LTI 1.3 integration with Canvas, Schoology, Google Classroom, and other LMSs",
    homepage: true,
    values: { signpost: true, lingvano: false, aslbloom: false, startasl: false, lifeprint: false, signschool: true },
    notes: { startasl: 8, signschool: 9 },
  },
];

export const FOOTNOTES: string[] = [
  "Lingvano's camera feature checks fingerspelled letters, not whole signs.",
  "Lingvano offers a few free lessons, then requires a paid subscription for full access.",
  "ASL Bloom's free tier shows ads and limits you to two lessons a day. Full access is a paid plan.",
  "Start ASL's introductory lessons are free. The complete course is paid.",
  "Start ASL's free lessons can be read without an account. The paid course requires one.",
  "SignSchool lessons require creating a free account.",
  "Lingvano's dictionary lives inside the app and is not available on the web.",
  "Start ASL is linked from an LMS rather than embedded, and grades are entered by hand.",
  "SignSchool offers an LTI tool for Canvas, according to schools that use it.",
];

export function homepageFeatures(): CompareFeature[] {
  return FEATURES.filter((feature) => feature.homepage);
}
