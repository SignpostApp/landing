import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — Signpost",
  description:
    "How Signpost uses cookies and similar technologies on its ASL learning platform.",
};

export default function CookiePolicyPage() {
  return (
    <article className="legal-page">
      {/* Header */}
      <header className="mb-16">
        <p className="font-mono-upper mb-4">Legal</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl gradient-text-warm mb-6">
          Cookie Policy
        </h1>
        <p className="font-subtext text-muted text-sm">
          Last updated: April 12, 2026 &middot; Effective immediately
        </p>
      </header>

      {/* Intro */}
      <section className="legal-section">
        <p className="legal-body">
          This Cookie Policy explains what cookies and similar tracking
          technologies Signpost App, Inc. (&ldquo;Signpost&rdquo;) uses, why
          we use them, and what choices you have. We believe in keeping things
          minimal — we only set cookies that are actually necessary for the
          site to function or that help us understand how to improve the
          experience.
        </p>
      </section>

      {/* 1 */}
      <section className="legal-section">
        <h2 className="legal-heading">1. What Are Cookies?</h2>
        <p className="legal-body">
          Cookies are small text files placed on your device by a website.
          They allow the site to remember information about your visit — like
          your preferences or login status — so you don&rsquo;t have to
          re-enter that information every time. Some cookies expire at the end
          of your session (session cookies), while others persist across visits
          (persistent cookies).
        </p>
      </section>

      {/* 2 */}
      <section className="legal-section">
        <h2 className="legal-heading">2. Cookies We Use</h2>
        <p className="legal-body">
          Here&rsquo;s an honest breakdown of every cookie category on our
          platform:
        </p>

        {/* Table */}
        <div className="overflow-x-auto mt-8 mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-mono-upper text-[10px] text-muted">
                  Category
                </th>
                <th className="text-left py-3 pr-4 font-mono-upper text-[10px] text-muted">
                  Purpose
                </th>
                <th className="text-left py-3 font-mono-upper text-[10px] text-muted">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="text-muted leading-relaxed">
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4 text-foreground/80 font-medium whitespace-nowrap">
                  Strictly Necessary
                </td>
                <td className="py-4 pr-4">
                  Authentication tokens, CSRF protection, and session
                  management. The site cannot function without these.
                </td>
                <td className="py-4 whitespace-nowrap">Session / 30 days</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4 text-foreground/80 font-medium whitespace-nowrap">
                  Functional
                </td>
                <td className="py-4 pr-4">
                  Remembering your preferences — like dark mode selection,
                  language, or curriculum progress. These make your experience
                  smoother but are not required for core functionality.
                </td>
                <td className="py-4 whitespace-nowrap">1 year</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 pr-4 text-foreground/80 font-medium whitespace-nowrap">
                  Analytics
                </td>
                <td className="py-4 pr-4">
                  Vercel Analytics — anonymized, aggregate usage data. No
                  personal identifiers. Helps us understand which features
                  people actually use so we can prioritize development.
                </td>
                <td className="py-4 whitespace-nowrap">Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="legal-body">
          Notice what&rsquo;s <em>not</em> on that list: advertising cookies,
          social media tracking pixels, cross-site identifiers, or fingerprinting
          scripts. We don&rsquo;t use any of those. Signpost is an educational
          tool, not an ad platform.
        </p>
      </section>

      {/* 3 */}
      <section className="legal-section">
        <h2 className="legal-heading">3. Third-Party Cookies</h2>
        <p className="legal-body">
          We currently use <strong className="text-foreground">Vercel Analytics</strong>,
          which may place its own first-party-scoped cookies for anonymized
          traffic measurement. No other third-party cookies are set by our
          platform. We do not embed third-party social widgets, ad networks,
          or tracking pixels.
        </p>
      </section>

      {/* 4 */}
      <section className="legal-section">
        <h2 className="legal-heading">4. Managing Your Cookie Preferences</h2>
        <p className="legal-body">
          You can control cookies through your browser settings:
        </p>
        <ul className="legal-list">
          <li>
            <strong className="text-foreground/90">Chrome:</strong> Settings →
            Privacy and Security → Cookies and other site data
          </li>
          <li>
            <strong className="text-foreground/90">Firefox:</strong> Settings →
            Privacy &amp; Security → Cookies and Site Data
          </li>
          <li>
            <strong className="text-foreground/90">Safari:</strong> Preferences
            → Privacy → Manage Website Data
          </li>
          <li>
            <strong className="text-foreground/90">Edge:</strong> Settings →
            Cookies and site permissions → Manage and delete cookies
          </li>
        </ul>
        <p className="legal-body">
          Blocking strictly necessary cookies may prevent you from logging in
          or using core Platform features. Blocking functional or analytics
          cookies will not prevent you from using Signpost — it just means we
          won&rsquo;t remember your preferences and we&rsquo;ll have less
          insight into how people use the product.
        </p>
      </section>

      {/* 5 */}
      <section className="legal-section">
        <h2 className="legal-heading">5. Do Not Track</h2>
        <p className="legal-body">
          Some browsers send a &ldquo;Do Not Track&rdquo; (DNT) signal with
          each request. While there is no industry consensus on how to
          interpret DNT, Signpost already does not engage in cross-site
          tracking, so our behavior is consistent with the spirit of DNT
          regardless.
        </p>
      </section>

      {/* 6 */}
      <section className="legal-section">
        <h2 className="legal-heading">6. Updates to This Policy</h2>
        <p className="legal-body">
          If we start using new cookie categories (for example, if we
          introduce an optional cookie consent banner), we&rsquo;ll update
          this page and notify users through our standard communication
          channels. The &ldquo;last updated&rdquo; date at the top reflects
          the most recent revision.
        </p>
      </section>

      {/* Contact */}
      <section className="legal-section">
        <h2 className="legal-heading">7. Questions?</h2>
        <div className="glass-card rounded-2xl p-8 mt-6">
          <p className="text-foreground font-medium mb-2">Signpost App, Inc.</p>
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
