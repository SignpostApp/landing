import Link from "next/link";

import { STATUS_URL } from "@/app/_components/statusData";
import {
  ContactCard,
  Email,
  LegalHeader,
  LegalTable,
  PolicyLinks,
} from "@/app/_components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trust Center",
  description:
    "How Signpost handles student data, secures its platform, and meets COPPA, FERPA, and GDPR, plus our subprocessors and policies in one place.",
  path: "/trust",
});

const HIGHLIGHTS = [
  {
    title: "Video stays on your device",
    desc: "Hand and face tracking run in the browser. We never receive video, images, or tracking data.",
  },
  {
    title: "No ads or data sales",
    desc: "We don't sell data, show ads, or build advertising profiles of anyone.",
  },
  {
    title: "Encrypted in transit and at rest",
    desc: "HTTPS with HSTS on every site, and our database is encrypted at rest.",
  },
  {
    title: "No passwords or card numbers",
    desc: "Sign-in runs through Clerk and payments through Stripe, so neither touches our servers.",
  },
  {
    title: "Student privacy",
    desc: "Parent or school consent for children under 13, and student records handled for the school under FERPA.",
  },
  {
    title: "Deletion on request",
    desc: "Students, parents, and schools can ask us to delete data, and we do it within 30 days.",
  },
];

const PRACTICES = [
  "TLS on every connection with HSTS, plus a strict Content Security Policy on the website.",
  "Cloudflare in front of every site for traffic filtering and denial-of-service protection.",
  "Progress and XP calculated on the server, with single-use tokens for each lesson.",
  "Signed LTI 1.3 launches, and signed requests between our own services.",
  "Rate limits on sign-ups, reports, settings changes, and model downloads.",
  "Access to production data limited to the few people who need it.",
];

const COMPLIANCE = [
  {
    term: "COPPA",
    desc: "Children under 13 use Signpost only with a parent's or school's consent. We use their information only for learning and delete it on request.",
  },
  {
    term: "FERPA",
    desc: "When a school uses Signpost, we handle student records as a school official, under the school's direction and only for its purposes.",
  },
  {
    term: "Student privacy laws",
    desc: "We don't use student data for targeted ads, sell it, or build profiles beyond school purposes, in line with laws like California's SOPIPA.",
  },
  {
    term: "GDPR and UK GDPR",
    desc: "Our lawful bases, your rights, and how we protect international transfers are in our GDPR Notice.",
  },
  {
    term: "CCPA",
    desc: "We don't sell or share personal information.",
  },
  {
    term: "LTI 1.3",
    desc: "Our LMS integration uses the 1EdTech LTI 1.3 standard, with signed launches and grade passback.",
  },
  {
    term: "Certifications",
    desc: "We don't currently hold SOC 2 or ISO 27001 certification.",
  },
];

const SUBPROCESSORS = ["Cloudflare", "Neon", "Clerk", "Stripe", "PostHog", "Google Analytics"];

export default function TrustCenterPage() {
  return (
    <article className="legal-page">
      <LegalHeader eyebrow="Trust" title="Trust Center">
        Signpost is used by students, teachers, and schools, and it needs a
        camera to work. This page brings together how we handle data, how we
        secure Signpost, and the policies behind both.
      </LegalHeader>

      <section className="legal-section">
        <h2 className="legal-heading">At a glance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="border border-slate-200 bg-white p-6">
              <div className="mb-4 flex h-8 w-8 items-center justify-center border border-accent/20 bg-accent/10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                  aria-hidden="true"
                >
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h3 className="mb-2 text-sm font-medium text-foreground">{item.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">What we store</h2>
        <LegalTable
          columns={["Data", "What it includes", "Where it's kept"]}
          rows={[
            ["Account", "Name, email address, profile picture", "Clerk and our database"],
            [
              "Learning progress",
              "Lessons, XP, signs practiced, and accuracy scores",
              "Our database",
            ],
            ["Classes", "Members, assignments, and completions", "Our database"],
            [
              "LMS connections",
              "LMS user ID, name, email address, role, and course",
              "Our database. Launch records are deleted about a day after they expire.",
            ],
            [
              "Billing",
              "Plan and subscription status. Card details stay with Stripe.",
              "Stripe and our database",
            ],
            ["Analytics", "Pages viewed and app events", "PostHog and Google Analytics"],
            ["Camera video and tracking data", "Never collected", "Stays on your device"],
          ]}
        />
        <p className="legal-body">
          The full details, including how long we keep each type of data, are in
          our <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Security practices</h2>
        <ul className="legal-list">
          {PRACTICES.map((practice) => (
            <li key={practice}>{practice}</li>
          ))}
        </ul>
        <p className="legal-body">
          More on each of these is on our{" "}
          <Link href="/legal/security">Security</Link> page.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Compliance</h2>
        <dl className="mt-6 divide-y divide-slate-200 border border-slate-200 bg-white">
          {COMPLIANCE.map((item) => (
            <div key={item.term} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-sm font-medium text-slate-900">{item.term}</dt>
              <dd className="text-sm leading-relaxed text-slate-600">{item.desc}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Subprocessors</h2>
        <p className="legal-body">
          These companies process personal data for us. Our{" "}
          <Link href="/legal/subprocessors">Subprocessors</Link> page lists what
          each one does, the data it handles, and where.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SUBPROCESSORS.map((name) => (
            <li
              key={name}
              className="border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">For schools and districts</h2>
        <p className="legal-body">
          Signpost works inside Canvas, Schoology, Blackboard, Moodle,
          Brightspace, and other learning management systems that support LTI
          1.3. When a school uses Signpost:
        </p>
        <ul className="legal-list">
          <li>
            Students sign in through the LMS, which sends us their LMS ID, name,
            email address, and role.
          </li>
          <li>Lesson scores go back to the LMS gradebook automatically.</li>
          <li>
            Teachers see progress for students in their own classes, and no one
            else&rsquo;s.
          </li>
          <li>We use student data only to provide Signpost to the school.</li>
          <li>The school can ask us to export or delete its student data at any time.</li>
        </ul>
        <p className="legal-body">
          If your district needs a signed data privacy agreement or a completed
          security questionnaire, email <Email />.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Status and reporting</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-slate-200 bg-white p-6">
            <h3 className="mb-2 text-sm font-medium text-foreground">System status</h3>
            <p className="text-sm leading-relaxed text-muted">
              Live uptime and past incidents are on{" "}
              <a href={STATUS_URL} target="_blank" rel="noopener noreferrer">
                status.signpostasl.com
              </a>
              .
            </p>
          </div>
          <div className="border border-slate-200 bg-white p-6">
            <h3 className="mb-2 text-sm font-medium text-foreground">
              Report a vulnerability
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Found a security issue? Our{" "}
              <Link href="/legal/security#disclosure">disclosure policy</Link>{" "}
              explains how to report it and what to expect from us.
            </p>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Policies</h2>
        <PolicyLinks current="/trust" />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Contact</h2>
        <ContactCard />
      </section>
    </article>
  );
}
