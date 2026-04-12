import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Signpost",
  description:
    "Terms governing your use of the Signpost ASL learning platform, including acceptable use, intellectual property, and liability.",
};

export default function TermsOfServicePage() {
  return (
    <article className="legal-page">
      {/* Header */}
      <header className="mb-16">
        <p className="font-mono-upper mb-4">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm mb-6">
          Terms of Service
        </h1>
        <p className="font-subtext text-muted text-sm">
          Last updated: April 12, 2026 &middot; Effective immediately
        </p>
      </header>

      {/* Intro */}
      <section className="legal-section">
        <p className="legal-body">
          Welcome to Signpost. These Terms of Service (&ldquo;Terms&rdquo;)
          form a legally binding agreement between you and Signpost App, Inc.
          (&ldquo;Signpost,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;)
          governing your access to and use of our website, demo application,
          and any related services (together, the &ldquo;Platform&rdquo;).
        </p>
        <p className="legal-body">
          By accessing or using Signpost, you agree to be bound by these Terms.
          If you do not agree, please do not use the Platform.
        </p>
      </section>

      {/* 1 */}
      <section className="legal-section">
        <h2 className="legal-heading">1. Eligibility</h2>
        <p className="legal-body">
          You must be at least 13 years old to create a Signpost account. If
          you are between 13 and 18, you represent that you have your parent
          or guardian&rsquo;s consent to use the Platform, or that your use is
          supervised by your educational institution. Users under 13 may only
          access Signpost with verifiable parental or guardian consent in
          compliance with COPPA.
        </p>
        <p className="legal-body">
          If you are using Signpost through a school or educational program,
          the administrator of that program may have entered into a separate
          agreement with us that governs your use and may override portions of
          these Terms.
        </p>
      </section>

      {/* 2 */}
      <section className="legal-section">
        <h2 className="legal-heading">2. Your Account</h2>
        <p className="legal-body">
          You are responsible for keeping your login credentials secure.
          Signpost is not liable for any unauthorized activity that occurs
          under your account. If you suspect that your account has been
          compromised, notify us immediately at{" "}
          <a
            href="mailto:support@signpost.cv"
            className="text-accent-light hover:underline"
          >
            support@signpost.cv
          </a>
          .
        </p>
        <p className="legal-body">
          You may close your account at any time by contacting us. Upon
          closure, we will delete your personal data in accordance with our{" "}
          <Link
            href="/legal/privacy"
            className="text-accent-light hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2 className="legal-heading">3. Acceptable Use</h2>
        <p className="legal-body">
          Signpost is an educational platform. You agree not to:
        </p>
        <ul className="legal-list">
          <li>
            Reverse-engineer, decompile, or attempt to extract the source code
            of our computer vision models or proprietary systems.
          </li>
          <li>
            Use the Platform to develop a competing product or service.
          </li>
          <li>
            Transmit malware, exploit vulnerabilities, or attempt unauthorized
            access to our infrastructure.
          </li>
          <li>
            Use automated scripts, bots, or scrapers to access the Platform in
            a manner that exceeds reasonable personal use.
          </li>
          <li>
            Misrepresent your identity or impersonate another person.
          </li>
          <li>
            Upload, post, or transmit content that is unlawful, harmful,
            threatening, or otherwise objectionable.
          </li>
        </ul>
        <p className="legal-body">
          We reserve the right to suspend or terminate accounts that violate
          these terms, with or without prior notice depending on the severity
          of the violation.
        </p>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2 className="legal-heading">4. Intellectual Property</h2>
        <p className="legal-body">
          The Signpost name, logo, website design, computer vision models,
          curriculum content, and all underlying technology are the property of
          Signpost App, Inc. or its licensors and are protected by intellectual
          property laws.
        </p>
        <p className="legal-body">
          We grant you a limited, non-exclusive, non-transferable license to
          access and use the Platform for personal, educational purposes. This
          license does not include the right to modify, distribute, or create
          derivative works based on our content without prior written
          permission.
        </p>
        <p className="legal-body">
          Some of our code is open source and available on{" "}
          <a
            href="https://github.com/SignpostApp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light hover:underline"
          >
            GitHub
          </a>
          . Open-source components are governed by their respective licenses,
          which take precedence over these Terms for those specific components.
        </p>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2 className="legal-heading">5. User-Generated Content</h2>
        <p className="legal-body">
          If you provide feedback, suggestions, or bug reports, you grant us a
          non-exclusive, royalty-free, worldwide license to use, modify, and
          incorporate that feedback into the Platform. You won&rsquo;t be
          compensated for feedback unless separately agreed in writing.
        </p>
        <p className="legal-body">
          For clarity: hand landmark data collected during your practice
          sessions is governed by our{" "}
          <Link
            href="/legal/privacy"
            className="text-accent-light hover:underline"
          >
            Privacy Policy
          </Link>
          , not this section. We de-identify landmark data before using it for
          model training.
        </p>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2 className="legal-heading">6. Disclaimers</h2>
        <p className="legal-body">
          Signpost is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. We make no warranties — express or implied —
          regarding the accuracy, completeness, or reliability of our
          sign-recognition technology or curriculum content.
        </p>
        <p className="legal-body">
          While we strive for high accuracy, computer vision is an evolving
          field. Our feedback should be treated as a learning aid, not a
          medical, therapeutic, or professional certification tool. Signpost
          is not a substitute for working with a qualified ASL instructor or
          interpreter where professional proficiency is required.
        </p>
      </section>

      {/* 7 */}
      <section className="legal-section">
        <h2 className="legal-heading">7. Limitation of Liability</h2>
        <p className="legal-body">
          To the maximum extent permitted by applicable law, Signpost App,
          Inc., its founders, employees, and affiliates shall not be liable for
          any indirect, incidental, special, consequential, or punitive
          damages arising out of or relating to your use of the Platform. Our
          total liability for any claim arising from these Terms is limited to
          the amount you paid us (if any) in the 12 months preceding the
          claim.
        </p>
      </section>

      {/* 8 */}
      <section className="legal-section">
        <h2 className="legal-heading">8. Indemnification</h2>
        <p className="legal-body">
          You agree to indemnify and hold harmless Signpost App, Inc. from any
          claims, damages, losses, or expenses (including reasonable
          attorneys&rsquo; fees) arising out of your violation of these Terms
          or your misuse of the Platform.
        </p>
      </section>

      {/* 9 */}
      <section className="legal-section">
        <h2 className="legal-heading">9. Modifications to These Terms</h2>
        <p className="legal-body">
          We may revise these Terms from time to time. For material changes, we
          will provide at least 14 days&rsquo; notice through email or an
          in-platform notification. Continued use after the effective date
          constitutes acceptance. If you disagree with the updated Terms, your
          remedy is to stop using the Platform and delete your account.
        </p>
      </section>

      {/* 10 */}
      <section className="legal-section">
        <h2 className="legal-heading">10. Governing Law &amp; Disputes</h2>
        <p className="legal-body">
          These Terms are governed by and construed in accordance with the
          laws of the Commonwealth of Massachusetts, without regard to its
          conflict-of-law provisions. Any disputes arising under these Terms
          shall be resolved in the state or federal courts located in
          Suffolk County, Massachusetts.
        </p>
      </section>

      {/* 11 */}
      <section className="legal-section">
        <h2 className="legal-heading">11. Severability</h2>
        <p className="legal-body">
          If any provision of these Terms is found to be unenforceable, the
          remaining provisions will continue in full force. The unenforceable
          provision will be modified to reflect the parties&rsquo; original
          intent as closely as possible.
        </p>
      </section>

      {/* Contact */}
      <section className="legal-section">
        <h2 className="legal-heading">12. Contact</h2>
        <p className="legal-body">
          Need clarification on anything? Don&rsquo;t hesitate to reach out.
        </p>
        <div className="glass-card rounded-2xl p-8 mt-6">
          <p className="text-foreground font-medium mb-2">Signpost App, Inc.</p>
          <p className="text-muted text-sm leading-relaxed">
            Email:{" "}
            <a
              href="mailto:legal@signpost.cv"
              className="text-accent-light hover:underline"
            >
              legal@signpost.cv
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
