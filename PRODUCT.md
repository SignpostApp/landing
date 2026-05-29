# Product

## Register

brand

## Users

Self-taught adult and older-teen ASL learners. They're studying at home with no teacher in the room, on a laptop or phone, in stolen 10–30 minute sessions. They've usually tried at least one of Lingvano, ASL Bloom, or YouTube playlists and bounced because nothing tells them whether their hands are actually right. They land on signpost.cv because someone mentioned it, they searched "best free ASL app," or they came from a YC / press mention. The job they're trying to get done in the next 60 seconds: decide whether this is serious enough to be worth their time, then start the demo or join the waitlist.

Secondary surfaces (hearing allies learning for a Deaf relative, K-12 schools running pilots, investors/press) get acknowledged in copy but the visual hierarchy is tuned to the consumer learner.

## Product Purpose

Signpost is an AI-powered American Sign Language platform that watches the learner's hands through their webcam and corrects their form in real time, with under 100ms feedback. The landing page exists to do three things, in order: convince a stranger this is a real, technically credible product (not a demo-ware academic project); show them the live computer vision working, not just described; and convert them into a waitlist signup or demo session.

Success is signups per visitor with high retention to the demo, not vanity traffic. The page must hold up under hard scrutiny from a YC reviewer or a developer reading the codebase, because that audience is real and currently looking.

## Brand Personality

Confident, technical, premium. Adult voice. Direct and specific (numbers, latencies, real claims) over emotional or aspirational. Confidence comes from showing the product working, not from adjective stacking. Closest reference: **Stripe** — soft tinted off-white surface, deep ink type, occasional gradient or visual proof used sparingly as a feature illustration, dense feature blocks that read as polished rather than cluttered, and headlines that say what the product does, not how it makes you feel.

What this brand sounds like in copy: *"Computer vision watches your hands and corrects your signs in under 100ms."* What it does not sound like: *"Unleash your ASL journey,"* *"Supercharge your signing,"* or anything ending in an em-dash aphorism.

## Anti-references

- **Generic dark-SaaS-blue-glass.** The current site's near-black bg + cobalt blue + blurred glass cards + gradient text + uppercase mono eyebrows is the 2024-25 startup template. It looks AI-generated. Light theme only. SaaS-style yes, the dark slop default no.
- **Kid-cartoon edtech.** No Duolingo green, no mascot, no rounded-cartoon illustrations, no gamification streak language. The audience is adults choosing to study; treating them as children loses them.
- **Academic / institutional.** No university-website look. Not a course catalog. Not stiff or dense in a textbook way.
- **Wellness pastel / cream-AI-default.** No beige/sand/parchment body bg, no soft serif headline + warm tinted everything. That's the saturated AI move for "warm and traditional"; it would read as a meditation app.
- **Clip-art-of-hands as decoration.** Fingerspelling and ASL imagery is only legitimate when it's a real product screenshot, a real demo frame, or content the user is meant to read. Never as background flourish.

## Design Principles

1. **Show the product working, don't describe it.** Computer vision is the entire thesis. The hero has to make the visitor *see* the technology — a real or convincing-stylized demo frame, hand landmarks rendered live, latency surfaced as a tangible number. Stock photos of hands and screenshots-on-laptops are the lazy answer.
2. **Latency is the brand.** "Under 100ms feedback" isn't a stat to bury in a card grid; it's the single most defensible claim on the page. Treat it as the headline-grade fact and let other elements support it.
3. **Earn the credibility, then ask.** The waitlist CTA only converts if the visitor already believes the product is real. Order the page so proof (demo, accuracy, founders, integrations) lands before the conversion ask, not after.
4. **Expert confidence over edtech cute.** Adult voice in all copy. Specific numbers over adjectives. No "level up your ASL game." No mascots. No streak counters in the hero. The reference is a competent infrastructure product, not a course platform.
5. **Respect the Deaf community.** ASL is a language used by real people. Avoid treating fingerspelling as a typographic flourish, avoid using sign-language imagery as background decoration, and never imply the AI replaces human ASL instructors — it supplements them. Hearing-allies-for-Deaf-family-members is a real secondary audience; copy should not erase them.

## Accessibility & Inclusion

WCAG 2.2 AA across the landing surface. Specifically:

- Body text ≥4.5:1 against its background; large text ≥3:1. No light-gray-on-tinted-white body copy.
- Visible, on-brand focus rings on every interactive element. Never `outline: none` without an alternative.
- Real `prefers-reduced-motion` alternatives for every GSAP scroll reveal and any decorative animation — typically crossfade or instant transition. Critical because motion-sensitive users do reach this page.
- Semantic markup: real headings in order, real `<button>` and `<a>` elements, real form labels on the waitlist modal.
- If video assets are added later (founder video, product demo reel), they ship with captions. Non-negotiable for an ASL product.
- Keyboard navigation works for every interactive surface, including the FAQ accordion, the waitlist modal, and the LMS carousel.
