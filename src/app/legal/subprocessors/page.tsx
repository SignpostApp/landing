import Link from "next/link";

import { ContactCard, LegalHeader, LegalTable, PolicyLinks } from "@/app/_components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Subprocessors",
  description:
    "The companies that process personal data for Signpost, what each one does, what data it handles, and where.",
  path: "/legal/subprocessors",
});

export default function SubprocessorsPage() {
  return (
    <article className="legal-page">
      <LegalHeader title="Subprocessors" />

      <section className="legal-section">
        <p className="legal-body">
          These are the companies that process personal data on our behalf to
          run Signpost. Each one only receives the data it needs to provide its
          service to us, and is bound by data processing terms that limit what
          it can do with it.
        </p>
        <p className="legal-body">
          Signpost&rsquo;s application servers are run by our own team, so
          there&rsquo;s no separate hosting company on this list.
        </p>
        <LegalTable
          columns={["Provider", "What they do for us", "Data they handle", "Location"]}
          rows={[
            [
              "Cloudflare",
              "DNS, content delivery, and security for every Signpost site. All traffic passes through Cloudflare.",
              "IP addresses and request data, while in transit",
              "Global network, US company",
            ],
            [
              "Neon",
              "Hosts our main database.",
              "Account, progress, class, billing, and LMS data",
              "United States (AWS, Oregon)",
            ],
            [
              "Clerk",
              "Sign-in and account management.",
              "Name, email address, profile picture, and sign-in activity",
              "United States",
            ],
            [
              "Stripe",
              "Payments and subscriptions.",
              "Name, email address, payment details, and billing address",
              "United States",
            ],
            [
              "PostHog",
              "Product analytics for the website and app.",
              "Usage events, device and browser details, approximate location, and account ID",
              "United States",
            ],
            [
              "Google (Google Analytics)",
              "Website analytics.",
              "Pages viewed, device and browser details, and IP address",
              "United States and other countries",
            ],
          ]}
        />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Services your browser connects to</h2>
        <p className="legal-body">
          These services aren&rsquo;t subprocessors, because we don&rsquo;t send
          them your account information. Your browser loads content from them
          directly, so they receive your IP address and basic browser details
          when it does.
        </p>
        <LegalTable
          columns={["Service", "Why"]}
          rows={[
            ["YouTube", "Plays embedded sign videos, in privacy-enhanced mode."],
            ["Lifeprint", "Serves sign images and reference pages."],
            ["Google Cloud Storage", "Serves the MediaPipe hand and face tracking models."],
            ["jsDelivr", "Serves the MediaPipe tracking library."],
            ["Better Stack", "Hosts our status page at status.signpostasl.com."],
          ]}
        />
        <p className="legal-body">
          If you use Signpost through school, information is also exchanged
          with your school&rsquo;s learning management system. That system is
          run by or for your school, not by us. Our{" "}
          <Link href="/legal/privacy">Privacy Policy</Link> explains what&rsquo;s
          shared.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Changes to this list</h2>
        <p className="legal-body">
          We update this page when we add or replace a subprocessor. The date at
          the top shows the last change. If you have questions about any
          provider, get in touch.
        </p>
        <ContactCard />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Related</h2>
        <PolicyLinks current="/legal/subprocessors" />
      </section>
    </article>
  );
}
