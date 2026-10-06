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
  title: "Privacy Policy",
  description:
    "What Signpost collects, how it's used, who can see it, and how to get a copy or have it deleted. Camera video and tracking data stay on your device.",
  path: "/legal/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <article className="legal-page">
      <LegalHeader title="Privacy Policy" />

      <section className="legal-section">
        <p className="legal-body">
          This policy covers{" "}
          <a href="https://signpostasl.com">signpostasl.com</a>, the Signpost
          app at <a href="https://demo.signpostasl.com">demo.signpostasl.com</a>
          , and our integration with school learning management systems
          (together, &ldquo;Signpost&rdquo;). Signpost is run by Matrix Studios
          Software (&ldquo;we&rdquo; or &ldquo;us&rdquo;). It explains what we
          collect, why we collect it, who else can see it, and what you can do
          about it.
        </p>
        <p className="legal-body">
          A lot of the people using Signpost are students, including teenagers
          and kids using it at school, so we try to collect only what the
          product actually needs. If anything here is unclear, email us at{" "}
          <Email />.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">The short version</h2>
        <ul className="legal-list">
          <li>
            Your camera feed is processed on your device. We never receive
            video, images, or the hand and face tracking data made from them.
          </li>
          <li>
            If you have an account, we store your profile and your learning
            progress, including which signs you practiced and how accurate they
            were.
          </li>
          <li>
            A small number of service providers help us run Signpost. They&rsquo;re
            listed on our <Link href="/legal/subprocessors">Subprocessors</Link>{" "}
            page.
          </li>
          <li>We don&rsquo;t sell your data, and there are no ads in Signpost.</li>
          <li>
            You can ask us to show you, correct, export, or delete your data at
            any time.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">1. Your camera</h2>
        <p className="legal-body">
          Signpost uses your camera to see your hands while you sign. The video
          is processed in your browser by hand-tracking and sign recognition
          models that run on your device. The video frames, and the hand
          landmarks the models pull out of them, stay on your device. We
          don&rsquo;t record or upload any of it.
        </p>
        <p className="legal-body">
          Some lessons check facial expressions that are part of ASL grammar,
          like raised or furrowed eyebrows. For those, a face-tracking model on
          your device estimates how far your eyebrows are raised or lowered. We
          don&rsquo;t use this to identify you, and we don&rsquo;t create or
          keep a face template.
        </p>
        <p className="legal-body">
          What does reach our servers is the outcome of a lesson: which signs
          you practiced and an accuracy score for each one. That&rsquo;s what
          we use to save your progress.
        </p>
        <p className="legal-body">
          Our recognition models are trained on samples recorded in an internal
          tool that only a few authorized people can use. Your practice
          sessions aren&rsquo;t used to train them. If we ever want to change
          that, we&rsquo;ll ask for your permission first.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">2. Information we collect</h2>

        <h3 className="legal-subheading">Account details</h3>
        <p className="legal-body">
          Sign-in is handled by Clerk. When you create an account we receive
          your name, email address, and profile picture. If you sign in with
          another account, such as Google, those details come from that
          account. You can change the display name Signpost shows. We also
          note whether your email address ends in .edu and whether you&rsquo;ve
          been approved as an educator, which decides which school features
          you see.
        </p>

        <h3 className="legal-subheading">Learning progress</h3>
        <p className="legal-body">
          The lessons you start and finish, how long each one took, the signs
          you practiced with an accuracy score for each, your XP, level, and
          streak, and your lesson history. On the free plan we also record when
          you start each unit, which is how the free plan&rsquo;s practice
          limit works.
        </p>

        <h3 className="legal-subheading">Eyebrow calibration</h3>
        <p className="legal-body">
          If you use the calibration page, Signpost measures your resting,
          raised, and furrowed eyebrows and saves four numbers describing your
          range, plus the date. When you&rsquo;re signed out they&rsquo;re
          saved only in your browser. When you&rsquo;re signed in we also save
          them to your account so they carry over to your other devices. The
          numbers can&rsquo;t be used to recognize you, and the &ldquo;Reset to
          Signpost defaults&rdquo; button on that page deletes them.
        </p>

        <h3 className="legal-subheading">Classes and assignments</h3>
        <p className="legal-body">
          If you create or join a class, we store the class, who&rsquo;s in it,
          its assignments, and which assignments each student has finished.
          Teachers who ask for educator access also give us their first and
          last name and their school.
        </p>

        <h3 className="legal-subheading">Schools and learning management systems</h3>
        <p className="legal-body">
          If your school opens Signpost from its learning management system
          (LMS), such as Canvas, Schoology, Blackboard, Moodle, or Brightspace,
          the LMS sends us your LMS user ID, name, email address, role (for
          example student or instructor), and the course and assignment you
          opened. We use these to sign you in, take you to the right lesson, and
          send your score back to the LMS gradebook.
        </p>
        <p className="legal-body">
          Teachers can also import a class roster from Canvas. That gives us
          each student&rsquo;s name, email address, Canvas user ID, and student
          ID number if Canvas includes it. The teacher&rsquo;s Canvas access
          token is only used for the import and isn&rsquo;t saved.
        </p>

        <h3 className="legal-subheading">Payments</h3>
        <p className="legal-body">
          Plus and Pro are paid through Stripe. Your card details go straight
          to Stripe and never reach our servers. We store your plan, whether
          you pay monthly or yearly, your subscription status and renewal date,
          and the Stripe IDs that link your account to your subscription.
        </p>

        <h3 className="legal-subheading">Referrals</h3>
        <p className="legal-body">
          Your referral code and a record of who signed up with it, so we can
          give out referral rewards.
        </p>

        <h3 className="legal-subheading">Things you send us</h3>
        <p className="legal-body">
          Bug reports (your message, plus your email address if you&rsquo;re
          signed in), emails you send us, and waitlist signups. When you join
          the waitlist we save your email address and how you found us, such as
          a campaign tag in the link you followed or the site that sent you.
        </p>

        <h3 className="legal-subheading">Usage and device information</h3>
        <p className="legal-body">
          Like most websites, we collect some information automatically: the
          pages you visit, the links and buttons you click (such as &ldquo;Try
          the demo&rdquo;), your browser and device type, screen size,
          language, the site that referred you, and a rough location based on
          your IP address. In the app we also record events like finishing a
          lesson, along with the lesson, how long it took, and how many signs
          it had. We use Google Analytics and PostHog for this. Once you sign
          in, PostHog links these events to your account ID (not your name or
          email address) so we can see how people use the app over time.
        </p>
        <p className="legal-body">
          Cloudflare and our servers see your IP address on every request. We
          use it to deliver the site, stop abuse, and apply rate limits.
          Rate-limit counters live in memory for a few minutes and aren&rsquo;t
          saved.
        </p>

        <h3 className="legal-subheading">Browser storage</h3>
        <p className="legal-body">
          Signpost saves a few things in your browser, like your theme and
          whether the sidebar is collapsed. Our{" "}
          <Link href="/legal/cookies">Cookie Policy</Link> lists all of them.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">3. How we use it</h2>
        <ul className="legal-list">
          <li>
            To run Signpost: signing you in, saving your progress, showing your
            stats, and running classes and assignments.
          </li>
          <li>
            To work with your school: sending scores to your LMS and showing
            teachers how their students are doing.
          </li>
          <li>To process payments and give out referral rewards.</li>
          <li>
            To keep Signpost secure, which includes preventing abuse,
            rate-limiting requests, and looking into problems.
          </li>
          <li>To see how Signpost is used and decide what to fix or build next.</li>
          <li>
            To contact you about your account, payments, and anything you&rsquo;ve
            asked us about. If you joined the waitlist, we&rsquo;ll email you
            about launch and access.
          </li>
          <li>To meet legal obligations, like keeping payment records for taxes.</li>
        </ul>
        <p className="legal-body">
          We don&rsquo;t sell personal information. We don&rsquo;t share it for
          targeted advertising, and there are no ads in Signpost.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">4. Who can see your information</h2>

        <h3 className="legal-subheading">Teachers and classmates</h3>
        <p className="legal-body">
          When you join a class, the teacher who owns it can see your name,
          email address, profile picture, XP, level, and which assignments
          you&rsquo;ve finished. If the teacher shows the roster to students,
          your classmates can see your name, profile picture, and level, but not
          your email address.
        </p>

        <h3 className="legal-subheading">Your school&rsquo;s LMS</h3>
        <p className="legal-body">
          If you opened Signpost from an LMS, we send your score for that
          lesson back to the LMS gradebook, where your school can see it.
        </p>

        <h3 className="legal-subheading">Service providers</h3>
        <p className="legal-body">
          Companies that help us run Signpost: Cloudflare (network and
          security), Neon (database), Clerk (sign-in), Stripe (payments), and
          PostHog and Google Analytics (analytics). They may only use your data
          to provide their service to us. The full list, with what each one
          handles, is on our{" "}
          <Link href="/legal/subprocessors">Subprocessors</Link> page.
        </p>

        <h3 className="legal-subheading">Legal reasons</h3>
        <p className="legal-body">
          We&rsquo;ll share information if the law requires it, or if we need
          to in order to protect the safety, rights, or property of our users,
          the public, or Signpost.
        </p>

        <h3 className="legal-subheading">If Signpost changes hands</h3>
        <p className="legal-body">
          If Signpost is sold or merges with another company, your information
          may be transferred as part of the deal. We&rsquo;ll tell you before
          it becomes subject to a different privacy policy.
        </p>

        <h3 className="legal-subheading">With your permission</h3>
        <p className="legal-body">
          In any other case, we&rsquo;ll only share your information if you
          ask us to or agree to it.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">5. Content from other services</h2>
        <p className="legal-body">
          Some parts of Signpost load content directly from other services.
          When that happens, the service receives your IP address and basic
          browser details.
        </p>
        <ul className="legal-list">
          <li>
            Sign videos are embedded from YouTube in privacy-enhanced mode. If
            you play one, YouTube may store cookies or similar data in your
            browser.
          </li>
          <li>Sign images and reference pages come from Lifeprint (lifeprint.com).</li>
          <li>
            The hand and face tracking models are downloaded from Google, and
            the tracking library from jsDelivr.
          </li>
        </ul>
        <p className="legal-body">
          These services have their own privacy policies, which apply to what
          they collect.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">6. How long we keep it</h2>
        <LegalTable
          columns={["Information", "How long we keep it"]}
          rows={[
            [
              "Account, progress, and calibration",
              "Until you delete your account. You can clear your calibration yourself at any time.",
            ],
            [
              "Class membership and assignments",
              "Until the class is deleted, you leave it, or your account is deleted.",
            ],
            ["Canvas roster imports", "Until the teacher deletes the class."],
            [
              "LMS sessions",
              "Sessions last 12 hours. Launch records are deleted about a day after they expire.",
            ],
            [
              "Payment records",
              "As long as tax and accounting rules require. Stripe also keeps its own records.",
            ],
            [
              "Bug reports and emails",
              "Until the issue is handled and we no longer need them.",
            ],
            [
              "Waitlist",
              "Until we no longer need it for launch, or until you ask us to remove you.",
            ],
            [
              "Analytics",
              "According to the retention settings in Google Analytics and PostHog.",
            ],
          ]}
        />
        <p className="legal-body">
          When you delete your account, we delete your personal information
          within 30 days, except for anything we&rsquo;re legally required to
          keep, such as payment records. Copies in our database backups expire
          within another 30 days.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">7. Children and students</h2>
        <p className="legal-body">
          Children under 13 shouldn&rsquo;t create a Signpost account on their
          own. A child under 13 can use Signpost only if a parent or guardian
          has agreed to it, or if their school has set Signpost up for class
          use. In the school case, the school can give consent on
          parents&rsquo; behalf for educational use, as the Children&rsquo;s
          Online Privacy Protection Act (COPPA) allows.
        </p>
        <p className="legal-body">
          We use children&rsquo;s information only to provide Signpost for
          learning. We don&rsquo;t show children ads, sell their information,
          or build profiles of them. We keep their information only as long as
          we need it for that, and a parent, guardian, or school can ask us to
          see or delete it at any time. If we learn that we collected a
          child&rsquo;s information without the right consent, we&rsquo;ll
          delete it.
        </p>
        <p className="legal-body">
          When a school uses Signpost, we handle student records on the
          school&rsquo;s behalf and under its direction, as a &ldquo;school
          official&rdquo; under the Family Educational Rights and Privacy Act
          (FERPA). We use student information only to provide Signpost to the
          school, and never for advertising, in line with state student privacy
          laws such as California&rsquo;s Student Online Personal Information
          Protection Act (SOPIPA). Schools can ask us to export or delete their
          students&rsquo; data at any time.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">8. Your choices and rights</h2>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">Access:</strong> ask what
            information we have about you and get a copy, including in a format
            you can take elsewhere.
          </li>
          <li>
            <strong className="text-foreground/90">Correction:</strong> have
            wrong information fixed. You can change your display name yourself
            in the app.
          </li>
          <li>
            <strong className="text-foreground/90">Deletion:</strong> have your
            account and data deleted.
          </li>
          <li>
            <strong className="text-foreground/90">Objection:</strong> ask us to
            stop or limit certain uses of your data, or withdraw consent
            you&rsquo;ve given.
          </li>
          <li>
            <strong className="text-foreground/90">Analytics:</strong> block
            analytics with your browser settings or an extension. The{" "}
            <Link href="/legal/cookies">Cookie Policy</Link> explains how.
          </li>
        </ul>
        <p className="legal-body">
          To make a request, email <Email />. We may need to confirm the request
          is really from you, usually by asking you to write from the email
          address on your account. We aim to reply within 15 business days. We
          honor these requests wherever you live, and making one won&rsquo;t
          change how we treat you.
        </p>
        <p className="legal-body">
          If you&rsquo;re in the EU, UK, or Switzerland, our{" "}
          <Link href="/legal/gdpr">GDPR Notice</Link> covers your additional
          rights. If you live in California or another US state with a privacy
          law, you can use the rights above. We don&rsquo;t sell or share
          personal information as the California Consumer Privacy Act defines
          those terms.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">9. Security</h2>
        <p className="legal-body">
          We protect your information with HTTPS on every connection,
          encryption at rest in our database, limited internal access, and the
          other measures described on our{" "}
          <Link href="/legal/security">Security</Link> page. No system is
          perfectly secure, but if a breach affects your information,
          we&rsquo;ll tell you.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">10. Where your data is processed</h2>
        <p className="legal-body">
          We&rsquo;re based in the United States, and we and our service
          providers store and process data in the US. If you use Signpost from
          another country, your information will be transferred to the US.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">11. Changes to this policy</h2>
        <p className="legal-body">
          If we make a material change, we&rsquo;ll tell you by email or with a
          notice in Signpost at least 14 days before it takes effect. The date
          at the top of this page shows when it was last updated.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">12. Contact us</h2>
        <p className="legal-body">
          For questions, requests, or complaints about privacy, write to us at:
        </p>
        <ContactCard />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Related</h2>
        <PolicyLinks current="/legal/privacy" />
      </section>
    </article>
  );
}
