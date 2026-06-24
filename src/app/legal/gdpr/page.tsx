import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GDPR Compliance — Signpost",
  description:
    "How Signpost complies with the EU General Data Protection Regulation (GDPR) and your rights as a data subject.",
};

export default function GDPRPage() {
  return (
    <article className="legal-page">
      {/* Header */}
      <header className="mb-16">
        <p className="font-mono-upper mb-4">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm mb-6">
          GDPR Compliance
        </h1>
        <p className="font-subtext text-muted text-sm">
          Last updated: April 12, 2026 &middot; Effective immediately
        </p>
      </header>

      {/* Intro */}
      <section className="legal-section">
        <p className="legal-body">
          The General Data Protection Regulation (GDPR) is a European Union
          regulation that gives individuals control over their personal data.
          Even though Matrix Studios Software is based in the United States, we
          serve users worldwide — including the EU and EEA — and we are
          committed to fulfilling our obligations under the GDPR.
        </p>
        <p className="legal-body">
          This page supplements our{" "}
          <Link
            href="/legal/privacy"
            className="text-accent-light hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          with specific information about how we handle personal data of EU/EEA
          residents.
        </p>
      </section>

      {/* 1 */}
      <section className="legal-section">
        <h2 className="legal-heading">1. Data Controller</h2>
        <p className="legal-body">
          Matrix Studios Software acts as the data controller for personal data
          processed through the Platform. This means we determine the purposes
          and means of processing your personal data.
        </p>
        <div className="glass-card rounded-2xl p-8 mt-6 mb-4">
          <p className="text-foreground font-medium mb-2">Data Controller</p>
          <p className="text-muted text-sm leading-relaxed">
            Matrix Studios Software
            <br />
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

      {/* 2 */}
      <section className="legal-section">
        <h2 className="legal-heading">2. Lawful Bases for Processing</h2>
        <p className="legal-body">
          Under Article 6 of the GDPR, we process personal data based on the
          following lawful bases:
        </p>

        <div className="overflow-x-auto mt-8 mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-mono-upper text-[10px] text-muted">
                  Processing Activity
                </th>
                <th className="text-left py-3 font-mono-upper text-[10px] text-muted">
                  Lawful Basis
                </th>
              </tr>
            </thead>
            <tbody className="text-muted leading-relaxed">
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4">
                  Account creation &amp; authentication
                </td>
                <td className="py-4 text-foreground/80">
                  Contract performance (Art. 6(1)(b))
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4">
                  Hand landmark data for sign recognition
                </td>
                <td className="py-4 text-foreground/80">
                  Consent (Art. 6(1)(a))
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4">
                  Aggregated landmark data for model training
                </td>
                <td className="py-4 text-foreground/80">
                  Legitimate interest (Art. 6(1)(f))
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4">
                  Anonymized usage analytics
                </td>
                <td className="py-4 text-foreground/80">
                  Legitimate interest (Art. 6(1)(f))
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4">
                  Product update emails
                </td>
                <td className="py-4 text-foreground/80">
                  Consent (Art. 6(1)(a))
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4">
                  Security monitoring &amp; fraud prevention
                </td>
                <td className="py-4 text-foreground/80">
                  Legitimate interest (Art. 6(1)(f))
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="legal-body">
          Where we rely on legitimate interest, we have conducted balancing
          tests to ensure our interests do not override your fundamental
          rights and freedoms. You may request details of these assessments at
          any time.
        </p>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2 className="legal-heading">3. Your GDPR Rights</h2>
        <p className="legal-body">
          As an EU/EEA resident, you have the following data protection rights
          under the GDPR:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">
              Right of Access (Art. 15):
            </strong>{" "}
            Request a copy of the personal data we hold about you, along with
            information about how and why we process it.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Rectification (Art. 16):
            </strong>{" "}
            Request that we correct any inaccurate or incomplete personal data.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Erasure (Art. 17):
            </strong>{" "}
            Request deletion of your personal data, subject to legal retention
            obligations.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Restrict Processing (Art. 18):
            </strong>{" "}
            Request that we limit how we use your data in certain circumstances.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Data Portability (Art. 20):
            </strong>{" "}
            Receive your personal data in a structured, commonly used, and
            machine-readable format.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Object (Art. 21):
            </strong>{" "}
            Object to processing based on legitimate interest. We will cease
            processing unless we demonstrate compelling legitimate grounds.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Withdraw Consent (Art. 7(3)):
            </strong>{" "}
            Where we process data based on consent, you may withdraw that
            consent at any time without affecting the lawfulness of prior
            processing.
          </li>
          <li>
            <strong className="text-foreground/90">
              Right to Lodge a Complaint (Art. 77):
            </strong>{" "}
            You have the right to file a complaint with your local data
            protection authority (e.g., the Irish Data Protection Commission,
            the French CNIL, etc.).
          </li>
        </ul>
        <p className="legal-body">
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:privacy@signpost.cv"
            className="text-accent-light hover:underline"
          >
            privacy@signpost.cv
          </a>
          . We will respond within 30 days, as required by the GDPR. If your
          request is complex or we receive a large number of requests, we may
          extend this period by an additional 60 days with prior notice.
        </p>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2 className="legal-heading">4. International Data Transfers</h2>
        <p className="legal-body">
          Signpost is hosted on infrastructure provided by Vercel, which may
          process data in the United States and other countries. When
          transferring personal data outside of the EU/EEA, we rely on:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">
              Standard Contractual Clauses (SCCs):
            </strong>{" "}
            Pre-approved contractual terms adopted by the European Commission
            that provide adequate safeguards for data transfers.
          </li>
          <li>
            <strong className="text-foreground/90">
              Adequacy Decisions:
            </strong>{" "}
            Where the European Commission has determined that a country
            provides an adequate level of data protection.
          </li>
        </ul>
        <p className="legal-body">
          You may request a copy of the relevant transfer mechanisms by
          emailing{" "}
          <a
            href="mailto:privacy@signpost.cv"
            className="text-accent-light hover:underline"
          >
            privacy@signpost.cv
          </a>
          .
        </p>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2 className="legal-heading">5. Data Protection Impact Assessments</h2>
        <p className="legal-body">
          We conduct Data Protection Impact Assessments (DPIAs) for processing
          activities that are likely to pose a high risk to individuals. Our
          hand landmark data processing pipeline has undergone a DPIA to
          confirm that appropriate safeguards are in place — including on-device
          processing, de-identification, and strict access controls.
        </p>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2 className="legal-heading">6. Data Processing Agreements</h2>
        <p className="legal-body">
          We maintain Data Processing Agreements (DPAs) with all sub-processors
          that handle personal data on our behalf. These agreements ensure that
          each sub-processor meets GDPR standards for data security,
          confidentiality, and lawful processing.
        </p>
      </section>

      {/* 7 */}
      <section className="legal-section">
        <h2 className="legal-heading">7. Data Breach Notification</h2>
        <p className="legal-body">
          In the event of a personal data breach that poses a risk to your
          rights and freedoms, we will notify the relevant supervisory
          authority within 72 hours of becoming aware of the breach, as
          required by Article 33 of the GDPR. If the breach is likely to
          result in a high risk to your rights, we will also notify you
          directly without undue delay.
        </p>
      </section>

      {/* 8 */}
      <section className="legal-section">
        <h2 className="legal-heading">8. Children Under GDPR</h2>
        <p className="legal-body">
          Under Article 8 of the GDPR, processing of a child&rsquo;s personal
          data based on consent requires authorization from the holder of
          parental responsibility. The age threshold varies by EU member state
          (between 13 and 16). We follow a baseline age of 16 for EU/EEA users
          and require parental or guardian consent for users below this
          threshold.
        </p>
      </section>

      {/* Contact */}
      <section className="legal-section">
        <h2 className="legal-heading">9. Contact Our Data Protection Team</h2>
        <div className="glass-card rounded-2xl p-8 mt-6">
          <p className="text-foreground font-medium mb-2">Matrix Studios Software</p>
          <p className="text-muted text-sm leading-relaxed">
            Data Protection Inquiries
            <br />
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
