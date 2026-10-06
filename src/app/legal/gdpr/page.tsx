import Link from "next/link";

import {
  ContactCard,
  Email,
  LegalHeader,
  LegalTable,
  PolicyLinks,
} from "@/app/_components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "GDPR Notice",
  description:
    "Information for people in the EU, UK, and Switzerland: who controls your data at Signpost, our lawful bases, your rights, and international transfers.",
  path: "/legal/gdpr",
});

export default function GDPRPage() {
  return (
    <article className="legal-page">
      <LegalHeader title="GDPR Notice" />

      <section className="legal-section">
        <p className="legal-body">
          If you&rsquo;re in the European Economic Area, the United Kingdom, or
          Switzerland, the GDPR (or the UK or Swiss version of it) gives you
          specific rights over your personal data. This page adds those details
          to our <Link href="/legal/privacy">Privacy Policy</Link>. It
          doesn&rsquo;t replace it, so please read both.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">1. Who&rsquo;s responsible for your data</h2>
        <p className="legal-body">
          Matrix Studios Software is the controller of personal data processed
          through Signpost. The exception is when a school uses Signpost with
          its students. In that case the school is the controller of that
          student data, and we process it on the school&rsquo;s behalf and
          under its instructions.
        </p>
        <ContactCard />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">2. Why we&rsquo;re allowed to use your data</h2>
        <p className="legal-body">
          Article 6 of the GDPR requires a lawful basis for each use of
          personal data. Ours are:
        </p>
        <LegalTable
          columns={["What we do", "Lawful basis"]}
          rows={[
            [
              "Running your account, saving your progress, and providing classes and assignments",
              "Contract, Art. 6(1)(b)",
            ],
            [
              "Processing payments and keeping billing records",
              "Contract and legal obligation, Art. 6(1)(b) and (c)",
            ],
            [
              "Saving your eyebrow calibration to your account",
              "Consent, Art. 6(1)(a). You can withdraw it by resetting your calibration.",
            ],
            [
              "Sending scores to your school's LMS and handling rosters for teachers",
              "Done for the school, which decides the lawful basis",
            ],
            ["Emailing you about launch if you joined the waitlist", "Consent, Art. 6(1)(a)"],
            [
              "Keeping Signpost secure, preventing abuse, and rate-limiting requests",
              "Legitimate interests, Art. 6(1)(f)",
            ],
            [
              "Analytics with Google Analytics and PostHog",
              "Legitimate interests, Art. 6(1)(f)",
            ],
            ["Handling bug reports and support emails", "Legitimate interests, Art. 6(1)(f)"],
            ["Responding to lawful requests from authorities", "Legal obligation, Art. 6(1)(c)"],
          ]}
        />
        <p className="legal-body">
          Where we rely on legitimate interests, it&rsquo;s for things
          you&rsquo;d expect from a service like this, and you can object at
          any time. We&rsquo;re happy to explain how we weighed our interests
          against yours if you ask.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">3. Your rights</h2>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">Access (Art. 15):</strong> get
            a copy of your personal data and information about how we use it.
          </li>
          <li>
            <strong className="text-foreground/90">Rectification (Art. 16):</strong>{" "}
            have inaccurate or incomplete data corrected.
          </li>
          <li>
            <strong className="text-foreground/90">Erasure (Art. 17):</strong> have
            your data deleted, unless we have to keep it by law.
          </li>
          <li>
            <strong className="text-foreground/90">Restriction (Art. 18):</strong>{" "}
            have us limit how we use your data in certain situations.
          </li>
          <li>
            <strong className="text-foreground/90">Portability (Art. 20):</strong>{" "}
            receive your data in a structured, machine-readable format.
          </li>
          <li>
            <strong className="text-foreground/90">Objection (Art. 21):</strong>{" "}
            object to processing based on legitimate interests. We&rsquo;ll
            stop unless we have compelling grounds to continue.
          </li>
          <li>
            <strong className="text-foreground/90">
              Withdrawing consent (Art. 7(3)):
            </strong>{" "}
            withdraw consent at any time. This doesn&rsquo;t affect processing
            that happened before.
          </li>
          <li>
            <strong className="text-foreground/90">Complaints (Art. 77):</strong>{" "}
            complain to the data protection authority where you live or work,
            or to the UK Information Commissioner&rsquo;s Office. We&rsquo;d
            appreciate the chance to fix the problem first.
          </li>
        </ul>
        <p className="legal-body">
          To use any of these rights, email <Email />. We&rsquo;ll respond
          within one month. If a request is complicated or we&rsquo;re handling
          many at once, we may need up to two more months, and we&rsquo;ll let
          you know if so.
        </p>
        <p className="legal-body">
          We don&rsquo;t make decisions about you based only on automated
          processing that have legal or similarly significant effects. Lesson
          scores are calculated automatically, but if your school uses them as
          grades, your teacher and school decide how they count.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">4. International transfers</h2>
        <p className="legal-body">
          Signpost is run from the United States, and our service providers
          store data there. When personal data is transferred from the EEA, UK,
          or Switzerland to the US, it&rsquo;s protected by our providers&rsquo;
          data processing terms, which include the European Commission&rsquo;s
          Standard Contractual Clauses and the UK and Swiss equivalents. Some of
          our providers are also certified under the EU-U.S. Data Privacy
          Framework. You can see who they are on our{" "}
          <Link href="/legal/subprocessors">Subprocessors</Link> page, and you
          can ask us for a copy of the relevant safeguards.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">5. Keeping risk low</h2>
        <p className="legal-body">
          The most sensitive data a camera-based app could collect is video of
          your face and hands. Signpost is built so that video never leaves
          your device: hand and face tracking run locally, and our servers only
          receive lesson results. If we plan any new processing that&rsquo;s
          likely to be high risk, we&rsquo;ll carry out a data protection
          impact assessment before we start.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">6. Service providers</h2>
        <p className="legal-body">
          Every provider that processes personal data for us is bound by data
          processing terms that require it to keep the data secure and use it
          only to provide its service to us. The current list is on our{" "}
          <Link href="/legal/subprocessors">Subprocessors</Link> page.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">7. Data breaches</h2>
        <p className="legal-body">
          If a personal data breach is likely to put your rights and freedoms
          at risk, we&rsquo;ll notify the relevant supervisory authority within
          72 hours of becoming aware of it, as Article 33 requires. If the risk
          to you is high, we&rsquo;ll also tell you directly without undue
          delay.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">8. Children</h2>
        <p className="legal-body">
          The age at which a child can consent to online services ranges from
          13 to 16 across the EEA. To keep things simple, we treat 16 as the
          threshold everywhere in the EEA: users under 16 need a parent or
          guardian&rsquo;s consent, unless they use Signpost through their
          school.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">9. Schools</h2>
        <p className="legal-body">
          If your school uses Signpost, the school controls the student data it
          shares with us, and we act as its processor. Students can make
          requests through their school or directly to us, and we&rsquo;ll work
          with the school to respond. Schools that need a data processing
          agreement can email <Email />.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Related</h2>
        <PolicyLinks current="/legal/gdpr" />
      </section>
    </article>
  );
}
