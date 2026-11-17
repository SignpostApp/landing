import Image from "next/image";
import Link from "next/link";

import Breadcrumbs from "@/app/_components/Breadcrumbs";
import { DEMO_URL } from "@/app/_components/navData";
import { SITE_URL, ogImage, pageMetadata } from "@/lib/seo";
import { getCategoryBySlug, signPath, type Sign } from "@/lib/signs";

const TITLE = "ASL Alphabet: All 26 Handshapes and a Free Printable Chart";
const DESCRIPTION =
  "Every letter of the American Sign Language alphabet with an illustration, the two letters that move, the pairs beginners mix up, a free chart, and webcam practice.";

const CHART = {
  png: "/asl-alphabet/asl-alphabet-chart.png",
  pdf: "/asl-alphabet/asl-alphabet-chart.pdf",
  svg: "/asl-alphabet/asl-alphabet-chart.svg",
  width: 2200,
  height: 1700,
};

const MIX_UPS = [
  {
    letters: "A, S, and T",
    text: "All three are closed fists. The thumb tells them apart: resting beside the fingers for A, crossed in front of them for S, and tucked between the index and middle fingers for T.",
  },
  {
    letters: "M and N",
    text: "Both tuck the thumb under the fingers. Three fingers over the thumb is M, two is N. Count your fingers before you worry about your speed.",
  },
  {
    letters: "K and P",
    text: "The same handshape, index up and middle finger angled out with the thumb between them. Pointed up it is K. Pointed down it is P.",
  },
  {
    letters: "G and Q",
    text: "Index finger and thumb extended parallel to each other. Pointed sideways it is G. Pointed down it is Q.",
  },
  {
    letters: "U, V, R, and H",
    text: "All four use the index and middle fingers. Together and up is U, spread apart is V, crossed is R, and together but pointing sideways is H.",
  },
  {
    letters: "D and F",
    text: "In D the index finger stands alone while the other fingertips rest on the thumb. In F the index finger and thumb touch while the other three fingers stand up. F is also the number 9.",
  },
  {
    letters: "I and Y",
    text: "I is the little finger alone. Let the thumb drift out and you are signing Y.",
  },
  {
    letters: "W and the number 4",
    text: "W raises three fingers with the thumb and little finger touching. Four fingers up with the thumb tucked is the number 4, not a letter.",
  },
];

const RULES = [
  {
    title: "Pick one spot and stay there",
    text: "Hold your dominant hand at shoulder height, slightly to the side, palm toward the person reading you. Only the fingers change between letters. Bouncing the whole hand is the most common beginner habit and the hardest one to unlearn.",
  },
  {
    title: "Clarity before speed",
    text: "Fluent signers spell fast because every handshape is clean, not the other way around. A slow, readable name is worth more than a fast blur nobody can catch.",
  },
  {
    title: "Mouth the word, not the letters",
    text: "Fluent signers mouth the whole word while they spell it. Mouthing each letter slows you down and looks like you are sounding it out.",
  },
  {
    title: "Handle double letters with a small slide",
    text: "For double letters like the L L in HELLO, slide the hand slightly to the side or give it a small bounce rather than re-forming the letter from scratch.",
  },
  {
    title: "Spell what has no sign",
    text: "Fingerspelling is for names, places, brands, titles, and words without an established sign. Spelling out a word that has a sign is slower for everyone.",
  },
];

const FAQS = [
  {
    q: "How many letters in the ASL alphabet move?",
    a: "Two. J traces the hook of the letter with the little finger, and Z draws the letter in the air with the index finger. The other 24 handshapes are held still.",
  },
  {
    q: "Which hand do I fingerspell with?",
    a: "Your dominant hand. Right-handed signers use the right hand, left-handed signers use the left. Pick one and stay consistent so readers know which hand to watch.",
  },
  {
    q: "How long does it take to learn the ASL alphabet?",
    a: "Most people can memorize the 26 handshapes in a few hours of practice spread over a week. Reading other people's fingerspelling at conversational speed takes longer, usually several weeks of regular practice.",
  },
  {
    q: "Is the ASL alphabet the same as the British Sign Language alphabet?",
    a: "No. ASL fingerspelling uses one hand. BSL, Auslan, and New Zealand Sign Language use a two-handed alphabet. The two systems are not mutually readable.",
  },
  {
    q: "Do I have to spell every word?",
    a: "No. Fingerspelling is a tool for names, places, brands, and words without an established sign. Most of an ASL conversation is signs, not spelling.",
  },
  {
    q: "Can I practice the alphabet with my webcam for free?",
    a: "Yes. The Signpost demo runs in your browser with no account. Turn on your webcam, form a letter, and the model tells you within 100 milliseconds whether your handshape matches. Hand tracking runs on your device and no video is uploaded.",
  },
];

function handshapePhrase(sign: Sign): string {
  const match = sign.summary.match(/formed with (.+?)\. It is one of/);
  return match ? match[1] : sign.summary;
}

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/asl-alphabet",
  image: ogImage("The ASL Alphabet", "All 26 fingerspelling handshapes, a free printable chart, and how to practice."),
});

export default function AslAlphabetPage() {
  const letters = getCategoryBySlug("alphabet")?.signs ?? [];
  const url = `${SITE_URL}/asl-alphabet`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: { "@id": `${url}#chart` },
        about: { "@type": "Thing", name: "American Sign Language manual alphabet" },
      },
      {
        "@type": "ImageObject",
        "@id": `${url}#chart`,
        contentUrl: `${SITE_URL}${CHART.png}`,
        url: `${SITE_URL}${CHART.png}`,
        width: CHART.width,
        height: CHART.height,
        name: "ASL alphabet chart",
        description: "All 26 handshapes of the American Sign Language manual alphabet on one printable chart.",
        encodingFormat: "image/png",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "ASL Dictionary", item: `${SITE_URL}/signs` },
          { "@type": "ListItem", position: 3, name: "ASL Alphabet", item: url },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");

  const downloadClass =
    "inline-flex items-center gap-2 rounded-lg bg-surface px-4 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition-colors hover:ring-slate-300 hover:text-accent-strong";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <article className="pb-20">
        <div className="mx-auto max-w-[1100px] px-6 pt-10 sm:pt-14 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "ASL Dictionary", href: "/signs" },
              { label: "ASL Alphabet" },
            ]}
          />

          <header className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Fundamentals</p>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 text-balance sm:text-4xl lg:text-[2.75rem]">
              The ASL alphabet: all 26 handshapes and how to actually learn them
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">
              The American Sign Language manual alphabet is 26 handshapes, one per English letter. You use it
              to fingerspell names, places, brands, and any word that has no sign yet. Below is every letter
              with an illustration and a plain description of the handshape, the two letters that move, the
              pairs beginners confuse, a chart you can print, and a way to check your handshapes with your
              webcam.
            </p>
          </header>

          <section aria-labelledby="chart-heading" className="mt-12 grid gap-8 rounded-2xl bg-slate-100 p-6 sm:p-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
            <a href={CHART.png} target="_blank" rel="noopener" className="block overflow-hidden rounded-xl bg-surface ring-1 ring-slate-200/70">
              <Image
                src={CHART.png}
                alt="Chart of the 26 ASL alphabet handshapes from A to Z, with J and Z marked as the letters that move"
                width={CHART.width}
                height={CHART.height}
                sizes="(min-width: 1024px) 620px, 100vw"
                priority
                className="h-auto w-full"
              />
            </a>
            <div>
              <h2 id="chart-heading" className="text-xl font-semibold tracking-tight text-slate-900">
                Free printable ASL alphabet chart
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                All 26 handshapes on one page, sized for a landscape letter sheet. Print it, stick it by your
                desk, or keep the PDF on your phone. Free for personal and classroom use.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={CHART.pdf} download className={downloadClass}>
                  Download PDF
                </a>
                <a href={CHART.png} download className={downloadClass}>
                  Download PNG
                </a>
                <a href={CHART.svg} download className={downloadClass}>
                  Download SVG
                </a>
              </div>
            </div>
          </section>

          <section aria-labelledby="letters-heading" className="mt-16">
            <h2 id="letters-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              The 26 handshapes
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 text-pretty">
              Hold your dominant hand up at shoulder height with the palm facing the person you are talking to.
              Click any letter for the full breakdown, the mistakes to avoid, and webcam practice.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {letters.map((sign) => (
                <li key={sign.slug}>
                  <Link
                    href={signPath(sign)}
                    className="group flex h-full flex-col rounded-2xl bg-surface p-5 ring-1 ring-slate-200/70 transition-colors hover:ring-slate-300"
                  >
                    <div className="flex h-28 items-center justify-center">
                      {sign.image ? (
                        <Image
                          src={sign.image.src}
                          alt={sign.image.alt}
                          width={120}
                          height={120}
                          unoptimized
                          className="h-24 w-auto dark:invert"
                        />
                      ) : null}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-2">
                      <span className="text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-accent-strong">
                        {sign.label}
                      </span>
                      {sign.label === "J" || sign.label === "Z" ? (
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent">
                          Moves
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{handshapePhrase(sign)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-16">
              <section aria-labelledby="moving-heading">
                <h2 id="moving-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  The two letters that move
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600 text-pretty">
                  Twenty-four letters are held still. J and Z are the exceptions, and they are the first hint
                  that ASL is built on movement as much as on shape.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="rounded-2xl bg-slate-100 p-6">
                    <p className="font-semibold text-slate-900">J</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-600">
                      Start with the I handshape, little finger up. Then trace the hook of a J downward and
                      around with the little finger. The handshape never changes. Only the wrist draws the curve.{" "}
                      <Link href="/sign/letter-j" className="font-medium text-accent hover:text-accent-strong">
                        How to sign J
                      </Link>
                    </p>
                  </li>
                  <li className="rounded-2xl bg-slate-100 p-6">
                    <p className="font-semibold text-slate-900">Z</p>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-600">
                      Point your index finger and draw a Z in the air: across, down at an angle, and across
                      again. Keep it small and crisp, drawn with the finger rather than the whole arm.{" "}
                      <Link href="/sign/letter-z" className="font-medium text-accent hover:text-accent-strong">
                        How to sign Z
                      </Link>
                    </p>
                  </li>
                </ul>
              </section>

              <section aria-labelledby="mixups-heading">
                <h2 id="mixups-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Letters beginners mix up
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600 text-pretty">
                  To a fluent reader, the difference between an A and an S is not a small detail. It is a
                  different letter. These are the pairs that cause the most trouble and the one thing that
                  separates each of them.
                </p>
                <dl className="mt-6 divide-y divide-slate-200">
                  {MIX_UPS.map((item) => (
                    <div key={item.letters} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="font-semibold text-slate-900">{item.letters}</dt>
                      <dd className="text-[0.95rem] leading-relaxed text-slate-600">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="rules-heading">
                <h2 id="rules-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  How to fingerspell clearly
                </h2>
                <ol className="mt-6 space-y-5">
                  {RULES.map((rule, index) => (
                    <li key={rule.title} className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 font-mono text-xs font-medium text-accent">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{rule.title}</p>
                        <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-600">{rule.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="reading-heading">
                <h2 id="reading-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Reading fingerspelling is the harder half
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600 text-pretty">
                  There are two skills hiding inside the alphabet. Producing letters with your own hand is the
                  first, and it feels like progress because you control the pace. Reading letters off someone
                  else&apos;s hand is the second, and most self-taught signers neglect it. A real signer spells
                  at conversational speed, the letters blur into a shape, and you have to recognize the whole
                  word rather than a slideshow of frozen poses.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600 text-pretty">
                  Spend at least as much time reading as producing. Watch fingerspelled names in videos, pause,
                  and guess before you check. If you only ever practice your own hand, you will be the person
                  who can spell their own name but freezes the moment someone spells theirs back. We go deeper
                  on this in{" "}
                  <Link href="/blog/how-to-learn-the-asl-alphabet" className="font-medium text-accent hover:text-accent-strong">
                    our practical guide to fingerspelling
                  </Link>
                  .
                </p>
              </section>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-blue-50 p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Practice with feedback</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">
                  Check your handshapes with your webcam
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  A chart shows you what the letter should look like. It cannot tell you that your T is reading
                  as an A. Signpost watches your hand and grades each letter in under 100 milliseconds, so you
                  fix the shape before it becomes a habit. Free, in the browser, nothing uploaded.
                </p>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-700 active:bg-blue-800"
                >
                  Start the alphabet lessons
                  <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </a>
              </div>
              <div className="mt-4 rounded-2xl bg-surface p-6 ring-1 ring-slate-200/70">
                <p className="text-sm font-semibold text-slate-900">Related</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link href="/signs/numbers" className="text-slate-600 hover:text-accent-strong">
                      ASL numbers 0 to 9
                    </Link>
                  </li>
                  <li>
                    <Link href="/signs" className="text-slate-600 hover:text-accent-strong">
                      The full ASL dictionary
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/is-asl-hard-to-learn" className="text-slate-600 hover:text-accent-strong">
                      Is ASL hard to learn?
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <section aria-labelledby="faq-heading" className="mt-20 max-w-3xl">
            <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Questions about the ASL alphabet
            </h2>
            <dl className="mt-6 divide-y divide-slate-200">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-5">
                  <dt className="font-semibold text-slate-900">{faq.q}</dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="mt-16 text-xs leading-relaxed text-slate-400">
            Handshape illustrations are in the public domain, originally published by wpclipart.com and
            distributed through Wikimedia Commons. Letter descriptions were written and reviewed by the
            Signpost team with Deaf and hearing ASL educators.
          </p>
        </div>
      </article>
    </>
  );
}
