import Link from "next/link";

import { ContactCard, Email, LegalHeader, PolicyLinks } from "@/app/_components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security",
  description:
    "How Signpost keeps camera video on your device, protects student data and its infrastructure, and how to report a vulnerability.",
  path: "/legal/security",
});

const PROTECTIONS = [
  {
    title: "HTTPS everywhere",
    desc: "Every connection uses TLS. HSTS, including subdomains, tells browsers never to connect to Signpost over plain HTTP.",
  },
  {
    title: "Security headers",
    desc: "Both sites block framing by other sites, prevent MIME sniffing, set a strict referrer policy, and switch off browser features they don't use. The website also sends a strict Content Security Policy and cross-origin isolation headers.",
  },
  {
    title: "Server-side scoring",
    desc: "XP and progress are calculated on our servers, not taken from the browser. Each lesson starts with a single-use token, so a forged request can't award credit.",
  },
  {
    title: "Permission checks",
    desc: "Classes, assignments, and admin tools check who you are and what you're allowed to see on the server, on every request.",
  },
  {
    title: "Rate limits and bot checks",
    desc: "Sign-ups, bug reports, settings changes, and model downloads are rate-limited. The waitlist form also has a hidden bot trap and rejects stale or replayed submissions.",
  },
  {
    title: "Encrypted model delivery",
    desc: "Recognition models are sent to your browser encrypted with a fresh key for each request (ECDH with AES-256-GCM), and they're never cached.",
  },
  {
    title: "Signed LMS launches",
    desc: "LMS launches use LTI 1.3, so each one is a signed token we verify against the LMS's published keys. Our LMS service and the app sign every request they send each other.",
  },
  {
    title: "Safe roster imports",
    desc: "When a teacher imports a Canvas roster, we refuse private and internal network addresses and pin the connection to the address we checked. This blocks server-side request forgery.",
  },
];

export default function SecurityPage() {
  return (
    <article className="legal-page">
      <LegalHeader eyebrow="Security" title="Security at Signpost">
        Signpost needs your camera to work, so we built it to keep video on
        your device. This page explains that design, how we protect the rest
        of your data, and how to report a security problem.
      </LegalHeader>

      <section className="legal-section">
        <div className="border border-slate-200 bg-white p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-1">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">
                Video stays on your device
              </h2>
              <p className="text-muted leading-relaxed text-sm">
                Hand tracking, face tracking, and sign recognition all run in
                your browser using MediaPipe and TensorFlow.js. Video frames are
                processed in memory and then discarded. They&rsquo;re never
                recorded, uploaded, or stored, and neither are the hand and face
                landmarks the models produce. Our servers only receive lesson
                results: which signs you practiced and how accurate they were.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Infrastructure</h2>
        <ul className="legal-list">
          <li>
            Signpost&rsquo;s web servers are run by our team and sit behind
            Cloudflare, which handles TLS, filters malicious traffic, and
            absorbs denial-of-service attacks.
          </li>
          <li>
            Account and learning data is stored in a managed Postgres database
            (Neon) in the United States. It&rsquo;s encrypted at rest, and
            connections to it are encrypted too.
          </li>
          <li>
            Sign-in is handled by Clerk, so we never see or store your
            password. Card payments go through Stripe Checkout, so card numbers
            never touch our servers.
          </li>
          <li>
            Our LMS integration runs as a separate service with its own signing
            keys.
          </li>
        </ul>
        <p className="legal-body">
          The full list of providers that handle personal data for us is on
          our <Link href="/legal/subprocessors">Subprocessors</Link> page.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Protections in the app</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {PROTECTIONS.map((item) => (
            <div key={item.title} className="border border-slate-200 bg-white p-6">
              <h3 className="text-foreground font-medium text-sm mb-2">{item.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Access to data</h2>
        <p className="legal-body">
          Only a small number of people on our team can access production data,
          and only when they need it to run Signpost. Admin tools in the app
          only work for a short allowlist of verified accounts, and we
          don&rsquo;t hand out broad administrative access.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Software updates</h2>
        <p className="legal-body">
          We watch for security advisories in the open-source packages Signpost
          depends on and update when a fix affects us. The code for this
          website is public on{" "}
          <a
            href="https://github.com/SignpostApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Student data</h2>
        <p className="legal-body">
          Many of our users are students, some under 18 and some using
          Signpost through school. For them:
        </p>
        <ul className="legal-list">
          <li>There are no ads, no data sales, and no advertising profiles.</li>
          <li>
            We collect what Signpost needs to work: account details, learning
            progress, and class information.
          </li>
          <li>
            Children under 13 need a parent&rsquo;s or school&rsquo;s consent,
            as COPPA requires.
          </li>
          <li>
            When a school uses Signpost, we handle student records on the
            school&rsquo;s behalf and only for its purposes, in line with FERPA.
          </li>
          <li>
            Students, parents, and schools can ask us to delete student data at
            any time, and we do it within 30 days.
          </li>
        </ul>
        <p className="legal-body">
          Schools can find more in our <Link href="/trust">Trust Center</Link>.
        </p>
      </section>

      <section id="disclosure" className="legal-section scroll-mt-24">
        <h2 className="legal-heading">Reporting a vulnerability</h2>
        <p className="legal-body">
          If you think you&rsquo;ve found a security problem in Signpost, email{" "}
          <Email /> with a description, steps to reproduce it, and the impact you
          think it has.
        </p>
        <p className="legal-body">While you&rsquo;re looking into it, please:</p>
        <ol className="legal-list list-decimal">
          <li>
            Only test with accounts you own or have permission to use.
            Don&rsquo;t access, change, or delete other people&rsquo;s data, and
            if you come across any, stop and tell us.
          </li>
          <li>
            Don&rsquo;t run denial-of-service tests, send spam, or try social
            engineering on our team or users.
          </li>
          <li>
            Give us a reasonable amount of time to fix the problem before you
            share it publicly. We ask for 90 days.
          </li>
        </ol>
        <p className="legal-body">
          We&rsquo;ll confirm we got your report within 48 hours and update you
          at least every 5 business days until it&rsquo;s resolved. If you act
          in good faith and follow these guidelines, we won&rsquo;t take legal
          action against you over your research. We don&rsquo;t run a paid bug
          bounty, but we&rsquo;re glad to credit you publicly if you&rsquo;d
          like. Our <a href="/.well-known/security.txt">security.txt</a> has the
          same contact details.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">If something goes wrong</h2>
        <p className="legal-body">
          If we learn of a breach that affects your data, we&rsquo;ll:
        </p>
        <ul className="legal-list">
          <li>Contain it and stop any further exposure.</li>
          <li>Work out what happened and whose data was involved.</li>
          <li>
            Tell affected users and schools without undue delay, and notify
            regulators where the law requires, including EU and UK authorities
            within 72 hours.
          </li>
          <li>Fix the cause, and write up what happened and what we changed.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">What we don&rsquo;t do</h2>
        <ul className="legal-list">
          <li>We don&rsquo;t record, upload, or store camera video or images.</li>
          <li>
            We don&rsquo;t use face tracking to identify anyone, and we
            don&rsquo;t create face templates.
          </li>
          <li>
            We don&rsquo;t sell personal data or share it with advertisers or
            data brokers.
          </li>
          <li>We don&rsquo;t show ads or build advertising profiles.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Contact</h2>
        <ContactCard
          note={
            <>For security reports, please put &ldquo;Security&rdquo; in the subject line.</>
          }
        />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Related</h2>
        <PolicyLinks current="/legal/security" />
      </section>
    </article>
  );
}
