import Link from "next/link";

import { ContactCard, Email, LegalHeader, PolicyLinks } from "@/app/_components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms for using Signpost, including accounts, paid plans and billing, school and LMS use, acceptable use, and liability.",
  path: "/legal/terms",
});

export default function TermsOfServicePage() {
  return (
    <article className="legal-page">
      <LegalHeader title="Terms of Service" />

      <section className="legal-section">
        <p className="legal-body">
          These terms are an agreement between you and Matrix Studios Software
          (&ldquo;Signpost,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;). They
          cover your use of signpostasl.com, the Signpost app, our LMS
          integration, and anything else we offer under the Signpost name
          (together, &ldquo;Signpost&rdquo;).
        </p>
        <p className="legal-body">
          By using Signpost you agree to these terms and to our{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>. If you don&rsquo;t
          agree, please don&rsquo;t use Signpost.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">1. Who can use Signpost</h2>
        <p className="legal-body">
          You need to be at least 13 to create your own account. If you&rsquo;re
          under 18, you need a parent or guardian&rsquo;s permission, and they
          should read these terms with you. If you&rsquo;re under 13, you can
          only use Signpost with a parent or guardian&rsquo;s consent, or
          through a school that has set it up for your class.
        </p>
        <p className="legal-body">
          If you use Signpost through a school, your school may have its own
          agreement with us. Where that agreement conflicts with these terms,
          the school agreement applies.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">2. Your account</h2>
        <p className="legal-body">
          Keep your login details to yourself. You&rsquo;re responsible for
          what happens under your account, so tell us right away at <Email />{" "}
          if you think someone else has gotten into it.
        </p>
        <p className="legal-body">
          You can stop using Signpost whenever you like. To delete your account
          and its data, email us and we&rsquo;ll handle it as described in our{" "}
          <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">3. Plans and billing</h2>
        <p className="legal-body">
          Signpost has a free plan and paid plans (currently Plus and Pro). The
          plans page in the app shows what each plan includes and what it
          costs. The free plan has usage limits, such as how many units you can
          start within a few hours, and we may change those limits.
        </p>
        <ul className="legal-list">
          <li>
            Paid plans are subscriptions billed monthly or yearly through
            Stripe. They renew automatically at the end of each billing period,
            and we&rsquo;ll charge your payment method for the next period
            unless you cancel before it starts.
          </li>
          <li>
            You can cancel at any time from the Billing page in your account
            settings. After you cancel, you keep your paid features until the
            end of the period you&rsquo;ve paid for, and then your account moves
            to the free plan.
          </li>
          <li>
            Payments aren&rsquo;t refundable, and we don&rsquo;t give refunds or
            credits for unused time, except where the law requires it. If you
            think you were charged by mistake, email us and we&rsquo;ll look
            into it.
          </li>
          <li>
            We may change prices or what a plan includes. A price change
            won&rsquo;t affect a period you&rsquo;ve already paid for, and
            we&rsquo;ll tell you before a new price applies to your
            subscription.
          </li>
          <li>Prices don&rsquo;t include taxes unless we say they do.</li>
        </ul>
        <p className="legal-body">
          If you invite friends who sign up, you may earn free time on a paid
          plan, as described in the app. Referral rewards have no cash value
          and can&rsquo;t be transferred. We may change or end the referral
          program, and we may take back rewards earned through abuse, such as
          fake accounts.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">4. Schools, teachers, and LMS integrations</h2>
        <p className="legal-body">
          Teachers can create classes, invite students, set assignments, import
          rosters from Canvas, and connect Signpost to their school&rsquo;s
          learning management system. If you do any of this, you confirm that
          your school allows it and that you have whatever permission is needed
          to add students and share their information with us.
        </p>
        <p className="legal-body">
          Lesson scores are produced automatically by our sign recognition and
          can be wrong. They&rsquo;re meant to support a teacher&rsquo;s
          judgment, not replace it, so please review scores before relying on
          them as grades.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">5. Acceptable use</h2>
        <p className="legal-body">When using Signpost, please don&rsquo;t:</p>
        <ul className="legal-list">
          <li>
            Copy, extract, or reverse engineer our recognition models, model
            files, or other non-public parts of Signpost.
          </li>
          <li>
            Use Signpost to build a competing product or to train another
            recognition model.
          </li>
          <li>
            Probe or test our systems for vulnerabilities, except as allowed by
            our <Link href="/legal/security#disclosure">disclosure policy</Link>.
          </li>
          <li>
            Overload or interfere with Signpost, or get around rate limits, plan
            limits, or access controls.
          </li>
          <li>
            Use bots or scrapers to access Signpost beyond normal personal use.
          </li>
          <li>Create fake accounts, including to collect referral rewards.</li>
          <li>
            Pretend to be someone else or misrepresent who you are, including
            claiming to be a teacher when you aren&rsquo;t.
          </li>
          <li>
            Post anything illegal, harmful, or harassing, for example in class
            names, assignment instructions, or bug reports.
          </li>
          <li>Use Signpost in a way that breaks the law or violates anyone&rsquo;s rights.</li>
        </ul>
        <p className="legal-body">
          We may suspend or close accounts that break these rules. For serious
          violations we may do this without warning.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">6. Our content and your license to use it</h2>
        <p className="legal-body">
          Signpost, including our recognition models, curriculum, software,
          design, and logos, belongs to Matrix Studios Software or our
          licensors and is protected by intellectual property laws. We give you
          a personal, non-exclusive, non-transferable, revocable license to use
          Signpost for learning and teaching, as these terms allow.
        </p>
        <p className="legal-body">
          Some content in Signpost comes from others, like sign videos embedded
          from YouTube and sign images from Lifeprint, and belongs to its
          owners.
        </p>
        <p className="legal-body">
          Some of our code is public on{" "}
          <a
            href="https://github.com/SignpostApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          . Public code isn&rsquo;t open source unless its repository includes
          an open source license. Where one does, that license governs that
          code.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">7. Your content and feedback</h2>
        <p className="legal-body">
          Things you create in Signpost, like class names and assignment
          instructions, stay yours. You let us store, display, and process them
          as needed to run Signpost. If you send us feedback or ideas, we can
          use them without paying you or owing you anything.
        </p>
        <p className="legal-body">
          Your practice results and other personal information are covered by
          our <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">8. Other services</h2>
        <p className="legal-body">
          Signpost relies on services we don&rsquo;t control, including Clerk
          for sign-in, Stripe for payments, YouTube for sign videos, and your
          school&rsquo;s LMS. Their own terms apply when you use them, and
          we&rsquo;re not responsible for them.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">9. Disclaimers</h2>
        <p className="legal-body">
          Signpost is a learning aid. Sign recognition is imperfect: it can
          mark a correct sign as wrong or a wrong one as right, and it
          can&rsquo;t judge everything that matters in ASL. Signpost isn&rsquo;t
          a substitute for learning from Deaf signers and qualified ASL
          teachers, and it doesn&rsquo;t certify ASL proficiency or qualify
          anyone to interpret.
        </p>
        <p className="legal-body">
          To the extent the law allows, Signpost is provided &ldquo;as
          is&rdquo; and &ldquo;as available,&rdquo; without warranties of any
          kind, including warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We don&rsquo;t promise that
          Signpost will always be available, error-free, or accurate.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">10. Limitation of liability</h2>
        <p className="legal-body">
          To the extent the law allows, Matrix Studios Software and its
          founders, employees, and contractors won&rsquo;t be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          for lost profits, data, or goodwill, arising from your use of
          Signpost. Our total liability for any claim relating to Signpost is
          limited to the greater of the amount you paid us in the 12 months
          before the claim or US$50.
        </p>
        <p className="legal-body">
          Some places don&rsquo;t allow these limits, so they may not fully
          apply to you.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">11. Indemnity</h2>
        <p className="legal-body">
          If you break these terms or misuse Signpost and someone makes a
          claim against us because of it, you agree to cover our resulting
          losses and reasonable legal costs.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">12. Ending these terms</h2>
        <p className="legal-body">
          You can stop using Signpost at any time. We may suspend or end your
          access if you break these terms, if the law requires it, or if we
          stop offering Signpost. If we end a paid plan for any reason other
          than your breaking these terms, we&rsquo;ll refund the unused part of
          your current billing period.
        </p>
        <p className="legal-body">
          Sections that should reasonably continue after your access ends,
          like ownership, disclaimers, limitation of liability, and governing
          law, will continue.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">13. Changes to these terms</h2>
        <p className="legal-body">
          If we make a material change, we&rsquo;ll tell you by email or with a
          notice in Signpost at least 14 days before it takes effect. If you
          keep using Signpost after that, you&rsquo;re agreeing to the new
          terms. If you don&rsquo;t agree, stop using Signpost and ask us to
          delete your account.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">14. Governing law and disputes</h2>
        <p className="legal-body">
          These terms are governed by the laws of the State of California,
          without regard to its conflict of law rules. Any dispute relating to
          these terms or Signpost will be heard in the state or federal courts
          located in Orange County, California, and you and we agree to the
          jurisdiction of those courts.
        </p>
        <p className="legal-body">
          Before filing a claim, please email us so we can try to sort it out
          informally first. If you live outside the US, you may also have
          rights under your local consumer protection laws that these terms
          can&rsquo;t take away.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">15. General</h2>
        <p className="legal-body">
          These terms and our Privacy Policy are the whole agreement between
          you and us about Signpost. If part of these terms turns out to be
          unenforceable, the rest still applies. If we don&rsquo;t enforce part
          of these terms right away, we haven&rsquo;t given up the right to do
          so later. We may transfer these
          terms as part of a merger, acquisition, or sale of assets. You
          can&rsquo;t transfer them without our written permission.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">16. Contact</h2>
        <p className="legal-body">Questions about these terms? Get in touch:</p>
        <ContactCard />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Related</h2>
        <PolicyLinks current="/legal/terms" />
      </section>
    </article>
  );
}
