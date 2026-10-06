import Link from "next/link";

import { ContactCard, LegalHeader, LegalTable, PolicyLinks } from "@/app/_components/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "Every cookie and browser storage item Signpost uses on signpostasl.com and the Signpost app, what each one is for, and how to control them.",
  path: "/legal/cookies",
});

function Key({ children }: { children: string }) {
  return (
    <code className="font-mono text-[0.8rem] text-slate-800 break-all">{children}</code>
  );
}

export default function CookiePolicyPage() {
  return (
    <article className="legal-page">
      <LegalHeader title="Cookie Policy" />

      <section className="legal-section">
        <p className="legal-body">
          This page lists the cookies and other browser storage that Signpost
          uses on signpostasl.com and in the Signpost app at
          demo.signpostasl.com, what each one does, and how you can control
          them.
        </p>
        <p className="legal-body">
          Cookies are small files a website saves in your browser. Sites can
          also save data using local storage, which stays until it&rsquo;s
          cleared, and session storage, which is cleared when you close the
          tab. We use all three, and this page covers all of them.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">1. Necessary</h2>
        <p className="legal-body">
          These keep you signed in and keep the app working. Signpost
          won&rsquo;t work properly without them.
        </p>
        <LegalTable
          columns={["Name", "Set by", "What it does", "How long"]}
          rows={[
            [
              <>
                <Key>__session</Key>, <Key>__client_uat</Key>, <Key>__client</Key>, and
                related cookies
              </>,
              "Clerk, in the app and on clerk.signpostasl.com",
              "Keeps you signed in and protects your session.",
              "While you're signed in. The session token itself is short-lived and renewed automatically.",
            ],
            [
              <Key key="lti">signpost_lti</Key>,
              "Signpost app",
              "Links a launch from your school's LMS to the right account and lesson.",
              "12 hours",
            ],
          ]}
        />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">2. Preferences and app state</h2>
        <p className="legal-body">
          These are saved in your browser&rsquo;s local and session storage in
          the Signpost app. They never leave your device unless noted.
        </p>
        <LegalTable
          columns={["Name", "Type", "What it does"]}
          rows={[
            [<Key key="theme">signpost-theme</Key>, "Local storage", "Remembers light or dark mode."],
            [
              <Key key="sidenav">signpost-sidenav-collapsed</Key>,
              "Local storage",
              "Remembers whether the sidebar is collapsed.",
            ],
            [
              <Key key="gates">signpost-nav-gates</Key>,
              "Local storage",
              "Remembers whether to show the Classes and Dashboard menu items, so the menu doesn't jump while it loads.",
            ],
            [
              <Key key="brow">signpost.brow-calibration</Key>,
              "Local storage",
              "Your eyebrow calibration numbers. If you're signed in, they're also saved to your account.",
            ],
            [
              <Key key="memory">signpost-memory-best:*</Key>,
              "Local storage",
              "Your best scores in the memory games.",
            ],
            [
              <Key key="debug">signpost.debug-info</Key>,
              "Local storage",
              "Whether the lesson debug panel is open.",
            ],
            [
              <Key key="handoff">signpost.pendingChallenge</Key>,
              "Session storage",
              "Passes a drill or assignment to the lesson page when you start it.",
            ],
          ]}
        />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">3. Analytics</h2>
        <p className="legal-body">
          These help us understand how people find and use Signpost. Blocking
          them won&rsquo;t affect how Signpost works.
        </p>
        <LegalTable
          columns={["Name", "Set by", "What it does", "How long"]}
          rows={[
            [
              <>
                <Key>_ga</Key>, <Key>_ga_7DW69BDLXM</Key>
              </>,
              "Google Analytics, on both sites",
              "Counts visits and tells returning visitors apart from new ones.",
              "2 years",
            ],
            [
              <Key key="ph">{"ph_<project key>_posthog"}</Key>,
              "PostHog, on both sites",
              "Keeps a random visitor ID so we can see how people move through the site and app. After you sign in, it's linked to your account ID. PostHog also keeps a copy in local storage and a little in session storage.",
              "1 year",
            ],
            [
              <Key key="attr">sp_attr</Key>,
              "signpostasl.com (session storage)",
              "Remembers how you arrived, such as a campaign tag or the site that linked you, so it can be saved with your email if you join the waitlist.",
              "Until you close the tab",
            ],
          ]}
        />
        <p className="legal-body">
          We use Google Analytics to measure traffic, not for advertising. We
          don&rsquo;t use advertising or retargeting cookies, and we don&rsquo;t
          let ad networks track you on Signpost.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">4. Cookies from other services</h2>
        <p className="legal-body">
          A few services we use set their own cookies on their own domains,
          under their own policies:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">Stripe</strong> sets cookies
            on its checkout and billing pages to process payments and prevent
            fraud.
          </li>
          <li>
            <strong className="text-foreground/90">YouTube</strong> sign videos
            are embedded in privacy-enhanced mode (youtube-nocookie.com). If
            you play one, YouTube may store cookies or similar data in your
            browser.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">5. Your choices</h2>
        <p className="legal-body">
          You can see, block, and delete cookies and site data in your
          browser&rsquo;s settings. Look for &ldquo;Cookies and site
          data&rdquo; or &ldquo;Website data&rdquo; in Chrome, Firefox, Safari,
          or Edge. Private or incognito windows clear everything when you close
          them.
        </p>
        <ul className="legal-list">
          <li>
            Blocking analytics cookies, or using a content blocker, won&rsquo;t
            change how Signpost works.
          </li>
          <li>
            Google offers a{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              browser add-on
            </a>{" "}
            that opts you out of Google Analytics on every site.
          </li>
          <li>
            Blocking Clerk&rsquo;s cookies will stop you from signing in to the
            app.
          </li>
        </ul>
        <p className="legal-body">
          We don&rsquo;t sell your information or use it for targeted ads, which
          is what Global Privacy Control signals ask sites to stop. We
          don&rsquo;t change what we do based on Do Not Track signals.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">6. Changes</h2>
        <p className="legal-body">
          We update this page when we add or remove cookies or storage. The
          date at the top shows the last change. For more about how we handle
          your data, see our <Link href="/legal/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">7. Questions</h2>
        <ContactCard />
      </section>

      <section className="legal-section">
        <h2 className="legal-heading">Related</h2>
        <PolicyLinks current="/legal/cookies" />
      </section>
    </article>
  );
}
