import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security — Signpost",
  description:
    "How Signpost protects student data, secures its infrastructure, and keeps your webcam footage on your device.",
};

export default function SecurityPage() {
  return (
    <article className="legal-page">
      {/* Header */}
      <header className="mb-16">
        <p className="font-mono-upper mb-4">Security</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm mb-6">
          Student-First Security
        </h1>
        <p className="font-subtext text-muted/90 text-base sm:text-lg leading-relaxed max-w-2xl mt-6">
          Signpost was built by students who understand what it feels like to
          hand your webcam feed to an app and wonder where that footage goes.
          So we designed the system so that question never has to be asked.
        </p>
      </header>

      {/* Core Principle */}
      <section className="legal-section">
        <div className="glass-card rounded-2xl p-8 sm:p-10 border-accent/20">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent-light"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-foreground mb-3">
                The Core Principle
              </h2>
              <p className="text-muted leading-relaxed text-sm">
                Your webcam feed is processed entirely inside your browser.
                Video frames never leave your device — not to our servers, not
                to any third party, not anywhere. The only data transmitted is
                numerical hand landmark coordinates (X/Y/Z joint positions),
                which contain no visual information and cannot be used to
                reconstruct images or identify you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Security */}
      <section className="legal-section">
        <h2 className="legal-heading">Infrastructure Security</h2>
        <p className="legal-body">
          Our infrastructure is built on modern, hardened foundations:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {[
            {
              title: "Encrypted in Transit",
              desc: "All communications use TLS 1.3. HSTS headers enforce HTTPS across all subdomains. Downgrade attacks are not possible.",
            },
            {
              title: "Strict CSP Headers",
              desc: "Our Content Security Policy restricts script sources, blocks framing, prevents MIME sniffing, and disallows object embeds. We ship production headers, not defaults.",
            },
            {
              title: "Zero Remote Images",
              desc: "Next.js image optimization is locked to local assets only. No external image domains are allowed, eliminating a common vector for content injection.",
            },
            {
              title: "No Powered-By Header",
              desc: "We strip the X-Powered-By header in production. Attackers don't get free information about our stack.",
            },
            {
              title: "Cross-Origin Isolation",
              desc: "COOP, COEP, and CORP headers are set to same-origin, preventing cross-origin data leaks and Spectre-class side-channel attacks.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-6 hover:translate-y-0"
            >
              <h3 className="text-foreground font-medium text-sm mb-2">
                {item.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Data Protection */}
      <section className="legal-section">
        <h2 className="legal-heading">Student Data Protection</h2>
        <p className="legal-body">
          A large portion of our users are students — many under 18, some
          using Signpost as part of school programs. We take that
          responsibility seriously:
        </p>

        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">No targeted advertising.</strong>{" "}
            Ever. We do not serve ads, build behavioral profiles, or sell data
            to brokers. Students are learners, not products.
          </li>
          <li>
            <strong className="text-foreground/90">
              Minimal data collection.
            </strong>{" "}
            We collect only what we need to provide the service: account info,
            learning progress, and de-identified landmark coordinates for model
            improvement.
          </li>
          <li>
            <strong className="text-foreground/90">COPPA compliance.</strong>{" "}
            Users under 13 require verifiable parental or guardian consent. We
            do not knowingly collect personal information from children under
            13 without it.
          </li>
          <li>
            <strong className="text-foreground/90">FERPA awareness.</strong>{" "}
            For schools and districts that integrate Signpost into
            instruction, we work to align with the Family Educational Rights
            and Privacy Act. Educational institutions can contact us to
            establish appropriate agreements.
          </li>
          <li>
            <strong className="text-foreground/90">
              Data deletion on request.
            </strong>{" "}
            Students (or their parents/guardians) can request full account and
            data deletion at any time. We process these requests within 30
            days.
          </li>
        </ul>
      </section>

      {/* Application Security */}
      <section className="legal-section">
        <h2 className="legal-heading">Application Security</h2>

        <h3 className="legal-subheading">On-Device Processing</h3>
        <p className="legal-body">
          Our computer vision pipeline runs entirely in-browser using
          optimized WebAssembly and WebGL. Hand detection, landmark extraction,
          and sign classification all happen on your device. This
          architecture was chosen specifically because it means we never need
          to see — and therefore never need to protect — raw video data.
        </p>

        <h3 className="legal-subheading">Access Control</h3>
        <p className="legal-body">
          Internal access to production systems follows the principle of least
          privilege. Only a small number of team members have access to
          production databases, and all access is logged and audited. We do
          not grant broad administrative permissions.
        </p>

        <h3 className="legal-subheading">Dependency Management</h3>
        <p className="legal-body">
          We run automated dependency audits through Dependabot and npm audit
          as part of our CI/CD pipeline. Known vulnerabilities in upstream
          packages are flagged and patched within the regular development
          cycle.
        </p>

        <h3 className="legal-subheading">Source Code</h3>
        <p className="legal-body">
          Portions of our codebase, including this landing page, are
          open-source and available on{" "}
          <a
            href="https://github.com/SignpostApp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light hover:underline"
          >
            GitHub
          </a>
          . We believe openness is a security feature, not a liability. If you
          find a vulnerability, we want to hear about it.
        </p>
      </section>

      {/* Vulnerability Disclosure */}
      <section className="legal-section">
        <h2 className="legal-heading">Responsible Disclosure</h2>
        <p className="legal-body">
          If you discover a security vulnerability in Signpost, we ask that
          you disclose it to us responsibly:
        </p>
        <ol className="legal-list list-decimal">
          <li>
            Email{" "}
            <a
              href="mailto:security@signpost.cv"
              className="text-accent-light hover:underline"
            >
              security@signpost.cv
            </a>{" "}
            with a clear description of the vulnerability, steps to reproduce,
            and potential impact.
          </li>
          <li>
            Give us a reasonable amount of time (at least 90 days) to
            investigate and remediate before any public disclosure.
          </li>
          <li>
            Do not access, modify, or delete data belonging to other users
            during your research.
          </li>
        </ol>
        <p className="legal-body">
          We commit to acknowledging your report within 48 hours and providing
          status updates within 5 business days. While we do not currently
          operate a formal bug bounty program, we genuinely appreciate
          security researchers who help us keep the platform safe and will
          recognize contributions publicly with your permission.
        </p>
      </section>

      {/* Incident Response */}
      <section className="legal-section">
        <h2 className="legal-heading">Incident Response</h2>
        <p className="legal-body">
          In the unlikely event of a data breach, our response plan follows
          these steps:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">Containment</strong> —
            Immediately isolate affected systems and prevent further exposure.
          </li>
          <li>
            <strong className="text-foreground/90">Assessment</strong> —
            Determine the scope and nature of the breach within 24 hours.
          </li>
          <li>
            <strong className="text-foreground/90">Notification</strong> —
            Notify affected users and relevant authorities (including GDPR
            supervisory authorities within 72 hours where applicable).
          </li>
          <li>
            <strong className="text-foreground/90">Remediation</strong> —
            Fix the root cause, deploy patches, and update security measures.
          </li>
          <li>
            <strong className="text-foreground/90">Post-Mortem</strong> —
            Publish an internal (and, where appropriate, external) post-mortem
            to prevent recurrence.
          </li>
        </ul>
      </section>

      {/* What We Don't Do */}
      <section className="legal-section">
        <h2 className="legal-heading">What We Explicitly Don&rsquo;t Do</h2>
        <p className="legal-body">
          Transparency means being clear about what&rsquo;s{" "}
          <em>not happening</em> too:
        </p>
        <ul className="legal-list">
          <li>We do not record, store, or transmit webcam video.</li>
          <li>We do not perform facial recognition or biometric identification.</li>
          <li>We do not sell or share personal data with advertisers or data brokers.</li>
          <li>We do not build behavioral profiles for marketing.</li>
          <li>We do not embed third-party tracking pixels.</li>
          <li>We do not use dark patterns to coerce consent.</li>
        </ul>
      </section>

      {/* Links */}
      <section className="legal-section">
        <h2 className="legal-heading">Related Policies</h2>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/legal/privacy" className="btn-primary text-xs !px-5 !py-3">
            Privacy Policy
          </Link>
          <Link href="/legal/terms" className="btn-primary text-xs !px-5 !py-3">
            Terms of Service
          </Link>
          <Link href="/legal/gdpr" className="btn-primary text-xs !px-5 !py-3">
            GDPR Compliance
          </Link>
          <Link href="/legal/cookies" className="btn-primary text-xs !px-5 !py-3">
            Cookie Policy
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="legal-section">
        <h2 className="legal-heading">Report a Concern</h2>
        <div className="glass-card rounded-2xl p-8 mt-6">
          <p className="text-foreground font-medium mb-2">Matrix Studios Software</p>
          <p className="text-muted text-sm leading-relaxed">
            Security:{" "}
            <a
              href="mailto:security@signpost.cv"
              className="text-accent-light hover:underline"
            >
              security@signpost.cv
            </a>
            <br />
            Privacy:{" "}
            <a
              href="mailto:privacy@signpost.cv"
              className="text-accent-light hover:underline"
            >
              privacy@signpost.cv
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
