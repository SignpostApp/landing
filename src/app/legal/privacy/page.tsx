import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Signpost",
  description:
    "How Signpost collects, uses, and protects your personal data while you learn ASL with our machine-learning-powered platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="legal-page">
      {/* Header */}
      <header className="mb-16">
        <p className="font-mono-upper mb-4">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm mb-6">
          Privacy Policy
        </h1>
        <p className="font-subtext text-muted text-sm">
          Last updated: April 12, 2026 &middot; Effective immediately
        </p>
      </header>

      {/* Intro */}
      <section className="legal-section">
        <p className="legal-body">
          Matrix Studios Software (&ldquo;Signpost,&rdquo; &ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the Signpost
          platform at{" "}
          <a
            href="https://signpost.cv"
            className="text-accent-light hover:underline"
          >
            signpost.cv
          </a>{" "}
          and the demo application at{" "}
          <a
            href="https://demo.signpost.cv"
            className="text-accent-light hover:underline"
          >
            demo.signpost.cv
          </a>
          . This Privacy Policy explains what data we collect, why we collect
          it, and how we keep it safe — written in straightforward language
          because you shouldn&rsquo;t need a law degree to understand your
          rights.
        </p>
        <p className="legal-body">
          Signpost is built by students, and a significant portion of our user
          base consists of students. We take your privacy seriously — especially
          if you are under 18 or part of an educational institution.
        </p>
      </section>

      {/* 1. Information We Collect */}
      <section className="legal-section">
        <h2 className="legal-heading">1. Information We Collect</h2>

        <h3 className="legal-subheading">1.1 Account Information</h3>
        <p className="legal-body">
          When you sign up for the waitlist or create an account, we collect
          your name, email address, and (optionally) your school or
          institution. We don&rsquo;t ask for anything beyond what we need to
          run the service.
        </p>

        <h3 className="legal-subheading">1.2 Hand Landmark Data</h3>
        <p className="legal-body">
          This is the one most people care about, so let&rsquo;s be direct:{" "}
          <strong className="text-foreground">
            your webcam feed never leaves your device.
          </strong>{" "}
          All hand-tracking processing runs locally in your browser through on-device
          computer vision models. The only data transmitted to our servers is{" "}
          <em>numerical hand landmark coordinates</em> — a series of X/Y/Z joint
          positions. No images. No video frames. No facial data. These
          coordinates help us improve sign recognition accuracy over time.
        </p>

        <h3 className="legal-subheading">1.3 Usage Analytics</h3>
        <p className="legal-body">
          We collect anonymized usage data — page views, feature engagement,
          session length — through Vercel Analytics. This data does not include
          personal identifiers and is used exclusively for improving the
          product.
        </p>

        <h3 className="legal-subheading">1.4 Device &amp; Technical Data</h3>
        <p className="legal-body">
          Standard web metadata like browser type, operating system, screen
          resolution, and language preference. We use this to ensure
          compatibility across devices and to debug issues.
        </p>
      </section>

      {/* 2. How We Use Your Data */}
      <section className="legal-section">
        <h2 className="legal-heading">2. How We Use Your Data</h2>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">To deliver the service:</strong>{" "}
            Your account data powers login, progress tracking, and curriculum
            personalization.
          </li>
          <li>
            <strong className="text-foreground/90">To improve sign recognition:</strong>{" "}
            Aggregated, de-identified hand landmark coordinates are used to
            train and refine our computer vision models.
          </li>
          <li>
            <strong className="text-foreground/90">To communicate with you:</strong>{" "}
            Transactional emails (account verification, password resets) and,
            only with your explicit opt-in, product updates.
          </li>
          <li>
            <strong className="text-foreground/90">To maintain security:</strong>{" "}
            Detecting and preventing fraud, abuse, or unauthorized access.
          </li>
        </ul>
        <p className="legal-body">
          We do <strong className="text-foreground">not</strong> sell, rent, or
          trade your personal data. We do not serve behavioral advertising. We
          have no interest in monetizing your information — our business is
          teaching you ASL, not profiling you.
        </p>
      </section>

      {/* 3. Data Sharing */}
      <section className="legal-section">
        <h2 className="legal-heading">3. Data Sharing &amp; Third Parties</h2>
        <p className="legal-body">
          We share data with third-party services only when strictly necessary
          to operate:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">Vercel</strong> — hosting and
            deployment infrastructure (analytics, edge functions).
          </li>
          <li>
            <strong className="text-foreground/90">Email provider</strong> —
            transactional email delivery (waitlist confirmations, etc.).
          </li>
        </ul>
        <p className="legal-body">
          Each provider is bound by data processing agreements and is required
          to handle your data in compliance with applicable privacy laws. We do
          not share hand landmark data with any third party.
        </p>
      </section>

      {/* 4. Data Retention */}
      <section className="legal-section">
        <h2 className="legal-heading">4. Data Retention</h2>
        <p className="legal-body">
          Account data is retained for as long as your account is active. If
          you delete your account, we will remove your personal data within 30
          days, except where retention is required for legal or compliance
          requirements.
        </p>
        <p className="legal-body">
          Aggregated, de-identified landmark data used for model training does
          not contain personal identifiers and may be retained indefinitely
          since it cannot be tied back to any individual.
        </p>
      </section>

      {/* 5. Children & Students */}
      <section className="legal-section">
        <h2 className="legal-heading">5. Children &amp; Student Privacy</h2>
        <p className="legal-body">
          Signpost is designed with students in mind. If you are under 13, you
          may only use Signpost with verifiable parental or guardian consent. We
          comply with the Children&rsquo;s Online Privacy Protection Act
          (COPPA) and do not knowingly collect personal information from
          children under 13 without such consent.
        </p>
        <p className="legal-body">
          For students aged 13–17, we limit data collection to what is
          necessary for the educational service. We do not serve targeted
          advertising to any user and do not build behavioral profiles of
          student users.
        </p>
        <p className="legal-body">
          If you believe we have inadvertently collected data from a child
          under 13 without appropriate consent, please contact us at{" "}
          <a
            href="mailto:privacy@signpost.cv"
            className="text-accent-light hover:underline"
          >
            privacy@signpost.cv
          </a>{" "}
          and we will delete the data promptly.
        </p>
      </section>

      {/* 6. Your Rights */}
      <section className="legal-section">
        <h2 className="legal-heading">6. Your Rights</h2>
        <p className="legal-body">
          Depending on your jurisdiction, you may have the right to:
        </p>
        <ul className="legal-list">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
          <li>Export your data in a portable format.</li>
          <li>Withdraw consent at any time (where processing is consent-based).</li>
          <li>Object to or restrict certain processing activities.</li>
        </ul>
        <p className="legal-body">
          To exercise any of these rights, email us at{" "}
          <a
            href="mailto:privacy@signpost.cv"
            className="text-accent-light hover:underline"
          >
            privacy@signpost.cv
          </a>
          . We aim to respond within 15 business days.
        </p>
      </section>

      {/* 7. Security */}
      <section className="legal-section">
        <h2 className="legal-heading">7. Security Measures</h2>
        <p className="legal-body">
          We implement industry-standard safeguards including TLS encryption
          in transit, encrypted storage at rest, strict access controls, and
          security headers (CSP, HSTS, X-Frame-Options, and more). For a
          detailed breakdown, see our{" "}
          <Link
            href="/legal/security"
            className="text-accent-light hover:underline"
          >
            Security page
          </Link>
          .
        </p>
      </section>

      {/* 8. Changes */}
      <section className="legal-section">
        <h2 className="legal-heading">8. Changes to This Policy</h2>
        <p className="legal-body">
          We may update this policy from time to time. If we make material
          changes, we will notify you by email or through a prominent notice on
          our platform at least 14 days before the changes take effect. Your
          continued use of Signpost after the effective date constitutes
          acceptance of the updated policy.
        </p>
      </section>

      {/* Contact */}
      <section className="legal-section">
        <h2 className="legal-heading">9. Contact Us</h2>
        <p className="legal-body">
          Questions about this policy? We&rsquo;re real people — reach out any
          time.
        </p>
        <div className="glass-card rounded-2xl p-8 mt-6">
          <p className="text-foreground font-medium mb-2">Matrix Studios Software</p>
          <p className="text-muted text-sm leading-relaxed">
            Email:{" "}
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
