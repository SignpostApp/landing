/**
 * Blog content + data layer.
 *
 * Each post's body is stored as plain-data "blocks" (not JSX) so the copy stays
 * easy to edit and free of JSX entity-escaping rules. Inline markup inside a
 * block supports **bold** and [label](/href) links — see PostBody.tsx.
 *
 * ── Banner images ───────────────────────────────────────────────────────────
 * Each post can show a header banner. Drop an image in /public/blog/ and set the
 * post's `image` field to its path (e.g. image: "/blog/asl-alphabet.jpg").
 * If `image` is left undefined, an on-brand gradient placeholder is shown.
 *
 *   Recommended banner size: 2400 × 1000 px  (12:5 ratio, i.e. 2.4:1)
 *   Format: JPG or WebP, ideally under ~400 KB.
 *   Safe zone: keep important content in the centered 80% — the edges crop on
 *   narrow screens. See /public/blog/README.md for the full spec.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type Tint = "blue" | "indigo" | "sky" | "cyan" | "violet";

export interface Post {
  slug: string;
  title: string;
  /** Meta description (~150–160 chars) for <head> and social cards. */
  description: string;
  /** Short hook shown on the index card and as the post's lede. */
  excerpt: string;
  category: string;
  tint: Tint;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  /** Optional banner path under /public, e.g. "/blog/asl-alphabet.jpg". */
  image?: string;
  imageAlt: string;
  body: Block[];
}

export const AUTHOR = {
  name: "Max Castagnoli",
  role: "Co-founder & CTO",
  bio: "Max is the co-founder and CTO of Signpost. He built the computer vision pipeline that watches a learner's hands in real time, and has spent two years living the problem of learning ASL without enough feedback.",
  url: "https://www.linkedin.com/in/max-castagnoli-1b18b923b/",
};

/**
 * Shared header/banner used at the top of every post and on every index card.
 * A post can still override it by setting its own `image` field below.
 */
export const DEFAULT_BANNER = "/blog/banner.png";
export const DEFAULT_BANNER_ALT =
  "Signpost — learn American Sign Language online with real-time machine learning feedback.";

/** Resolves a post's banner path: its own `image`, else the shared default. */
export function bannerSrc(post: Post): string {
  return post.image ?? DEFAULT_BANNER;
}

/** Alt text matching whatever bannerSrc() returns. */
export function bannerAlt(post: Post): string {
  return post.image ? post.imageAlt : DEFAULT_BANNER_ALT;
}

/* Newest first. The index re-sorts by date, but keep this ordered for sanity. */
export const POSTS: Post[] = [
  {
    slug: "our-origin-story",
    title: "Signpost's Origin Story and Mission",
    description:
      "How Signpost came to be and the steps that we are taking to improve American Sign Language for the future.",
    excerpt:
      "Signpost came from very humble beginnings, but those beginnings, we hope, will carry us to a future where learning ASL is as easy as learning any other language.",
    category: "About Us",
    tint: "blue",
    date: "2026-09-10",
    imageAlt: "",
    body: [
      { type: "h2", text: "Who We Are" },
      {
        type: "p",
        text: "Signpost is a small company started by me, Max, one of my good friends, Jerry, and a longtime software development partner of mine, Rhiley. I came up with the concept in the shower one night during my Senior year of high school. I had an ASL test the next day on one of our ASL 2 units, and I thought, \"I feel like someone could cheat on ASL tests if they had some way to understand what was being signed in real time,\" and that's where this entire idea was born. I hopped onto my computer and wrote the prototype of our machine learning model. It couldn't do gestures at all and was literally just a hold-and-guess model, but it actually worked. Ever since that day, I have been more and more interested in this concept and have gotten others, who have no ASL knowledge at all, to learn using this tool and give me feedback as we go.",
      },
      { type: "h2", text: "Our Mission" },
      {
        type: "p",
        text: "When I originally made Signpost, I noticed a gap in how ASL learning was translated to students. Finding an instructor who could sit with you one-on-one was ruining the total productivity of each individual student. There is one teacher for 30-35 students, and traditional practice methods of ASL are not nearly advanced enough to be meaningful practice. I saw firsthand how some students would just not practice at all because they were unsupervised, and I always felt bad for my teacher because there was nothing she could really do about it.",
      },
      {
        type: "p",
        text: "Ever since then, we have been working on a way to bring Signpost into the classroom as a tool for students, educators, and people who just want a platform to learn on. We see so many innovations nowadays that are trying to take Deaf people out of their comfortable environment. We are currently in a world where \"AI translation tools\" and \"Auto-translating gloves\" are cool things, sure, but they are costly, and I believe they defeat the point of why the Deaf community is such a strong place. We shouldn't take people out of the Deaf community to accommodate them in a hearing world; we should give people resources to help them better understand the Deaf community.",
      },
      {
        type: "p",
        text: "We are not here to do this for the money, fame, or because we think that someday we are going to exit this company and sell it to some language giant and basically just take away the core principles of why we started this in the first place. We genuinely see a place where a tool like Signpost can empower without overriding the good that the Deaf community has done, and we strive to keep this true.",
      },
    ],
  },
  {
    slug: "how-real-time-sign-feedback-works",
    title: "How Our Feedback Engine Works",
    description:
      "A look under the hood at how Signpost is able to recognize what you are signing",
    excerpt:
      "Every sign you make is scored before you have finished thinking about it. Here is what actually happens between your hand and that result.",
    category: "Under the Hood",
    tint: "blue",
    date: "2026-09-06",
    imageAlt:
      "Hand landmark tracking overlaid on a webcam view of a person signing in American Sign Language.",
    body: [
      {
        type: "p",
        text: "The core claim behind Signpost is simple to state and harder to build: you sign, and within about a tenth of a second you know whether you got it right. This post walks through what happens in that tenth of a second.",
      },
      { type: "h2", text: "From webcam frame to hand landmarks" },
      {
        type: "p",
        text: "Every frame from your webcam is passed to a hand-tracking model that returns a set of numerical landmarks: the coordinates of each joint in your hand. Nothing about this step leaves your device. The image itself is discarded immediately; what moves forward is a small array of numbers describing where your fingers are.",
      },
      { type: "h2", text: "From landmarks to a graded sign" },
      {
        type: "p",
        text: "A sign in ASL is not a single pose. It is a handshape, a location relative to your body, an orientation, and often a movement over time. The model compares all of those against the target sign and produces a score, which is why a near-miss reads as a near-miss rather than silently passing.",
      },
      { type: "h2", text: "Why latency is the whole game" },
      {
        type: "p",
        text: "Feedback that arrives a second late is not feedback, it is a grade. To correct a motor skill, the signal has to land while you can still feel what your hand was doing. That is the reason the entire pipeline runs locally instead of round-tripping to a server, and it is the reason the target is under 100 milliseconds rather than under a second.",
      },
      { type: "h2", text: "What we store, and what we do not" },
      {
        type: "p",
        text: "Your webcam feed is never uploaded, recorded, or stored. The only data saved server-side is numerical landmark coordinates used to improve recognition, never images or video. More detail is in our [security overview](/legal/security).",
      },
    ],
  },
  {
    slug: "learn-asl-on-your-own",
    title: "How Signpost Enables You To Self-Teach ASL",
    description:
      "A practical guide to how our product allows you to teach yourself ASL with no outside assistance.",
    excerpt:
      "Teaching yourself ASL is genuinely possible, but the parts that make or break it are not the parts most people focus on. Here is how to structure it.",
    category: "Self-Teaching",
    tint: "blue",
    date: "2026-09-03",
    imageAlt:
      "A person practicing American Sign Language at home in front of a laptop webcam.",
    body: [
      {
        type: "p",
        text: "Most people who want to learn ASL do not have a class available to them. They have an interest, a laptop, and whatever time they can carve out in the evening. That is a completely workable starting point, but self-teaching fails for predictable reasons, and almost all of them come down to practicing without the feedback of an actual instructor.",
      },
      { type: "h2", text: "Start with the alphabet, but do not stop there" },
      {
        type: "p",
        text: "The manual alphabet is the natural first step, and it is worth learning properly rather than quickly. Clean handshapes early save you from unlearning bad ones later. The full breakdown is in [how to learn the ASL alphabet](/blog/how-to-learn-the-asl-alphabet).",
      },
      { type: "h2", text: "The piece self-teachers are missing" },
      {
        type: "p",
        text: "In a classroom, an instructor catches your errors within seconds. Alone, nothing catches them at all. That gap is the single biggest reason self-taught signers plateau, and it is the gap Signpost was built to close: your webcam watches your hands and tells you, in real time, whether the sign you made is the sign you meant.",
      },
    ],
  },
  {
    slug: "asl-for-homeschoolers",
    title: "How Signpost Can Work Alongside Your Homeschool Program",
    description:
      "How to add American Sign Language to a homeschool curriculum by using our platform.",
    excerpt:
      "ASL is one of the most practical languages you can add to a homeschool, and one of the hardest to assess if you do not sign yourself. Here is how to handle both.",
    category: "For Families",
    tint: "indigo",
    date: "2026-08-27",
    imageAlt:
      "A parent and child learning American Sign Language together at a kitchen table.",
    body: [
      {
        type: "p",
        text: "American Sign Language is an appealing homeschool subject: it counts as a foreign language credit in most states, it is immediately useful, and it suits some learners who struggle with a spoken second language. The hard part is not choosing it. The hard part is teaching a language you may not know yourself.",
      },
      { type: "h2", text: "The assessment problem" },
      {
        type: "p",
        text: "With a written language you can check a worksheet. With ASL, correctness lives in handshape, position, and movement, and a parent who does not sign has no reliable way to tell a correct sign from a near-miss. Video courses do not solve this, because they only show what the sign should look like, never what your student actually did.",
      },
      { type: "h2", text: "What to teach first" },
      {
        type: "p",
        text: "Start with the manual alphabet and fingerspelling, then move to high-frequency everyday vocabulary before attempting sentence structure. Short daily practice beats long weekly sessions, and receptive practice (reading signs) needs as much time as expressive practice (producing them).",
      },
    ],
  },
  {
    slug: "asl-for-schools-and-districts",
    title: "Bringing ASL to Your School or District",
    description:
      "How schools add American Sign Language instruction as a tool for educators and students.",
    excerpt:
      "Most schools that want to offer ASL cannot staff it. Here is what it takes to run a credible ASL course when a certified instructor is not available.",
    category: "For Schools",
    tint: "sky",
    date: "2026-08-20",
    imageAlt:
      "A classroom of students practicing American Sign Language on their laptops.",
    body: [
      {
        type: "p",
        text: "Demand for ASL in secondary schools has outrun the supply of certified instructors by a wide margin. Districts that want to offer it are usually stuck between an unstaffed course and no course at all. Signpost is allowing schools and districts to arm one teacher with enough tooling to teach hundreds of kids at different skill levels.",
      },
      { type: "h2", text: "Fitting into what you already run" },
      {
        type: "p",
        text: "Signpost ships with full LTI 1.3 support, so lessons are placed directly into Canvas, Blackboard, or Schoology. Students roster automatically and grades flow back into the gradebook your teachers already use. There is no separate account system to administer.",
      },
      { type: "h2", text: "Measuring progress honestly" },
      {
        type: "p",
        text: "Because every sign a student performs is scored by the model, progress is measured on actual signing rather than on multiple-choice recall. That gives a department head something defensible to report, and gives students feedback on the days a teacher cannot reach everyone.",
      },
    ],
  },
  {
    slug: "asl-for-educators",
    title: "Signpost for ASL Educators: Feedback That Scales Alongside Your Class",
    description:
      "How ASL teachers use real-time sign feedback to extend practice beyond class time, catch form errors earlier, and spend contact hours on language rather than drills.",
    excerpt:
      "No ASL teacher can watch thirty pairs of hands at once. The question is what students practice on the days you cannot correct them.",
    category: "For Educators",
    tint: "cyan",
    date: "2026-08-13",
    imageAlt:
      "An ASL instructor teaching a class of students in a language classroom.",
    body: [
      {
        type: "p",
        text: "Every ASL instructor runs into the same ceiling. Correction is the highest-value thing you do, and it is the thing you have the least time for. With a full class, each student gets a few seconds of individual attention, and the rest of their practice happens unsupervised and often uncorrectly.",
      },
      { type: "h2", text: "Where the model helps, and where it does not" },
      {
        type: "p",
        text: "Signpost is not a replacement for an instructor, and we do not present it as one. It handles the mechanical layer, whether a handshape, location, and movement match the target sign, so that class time can go to the things a model cannot teach: register, cultural context, facial grammar, and real conversation.",
      },
      { type: "h2", text: "Built with teachers, not at them" },
      {
        type: "p",
        text: "The curriculum and lesson order were reviewed by ASL educators who are both Deaf and hearing. If something in the sequence does not match how you teach, we want to hear it.",
      },
    ],
  },
  {
    slug: "learn-asl-when-your-school-doesnt-offer-it",
    title: "How Signpost Brings ASL To Underexposed Students",
    description:
      "How Signpost is able to help students learn ASL by giving them easy lessons and straightforward feedback.",
    excerpt:
      "Wanting to learn ASL and having nowhere to learn it is the most common story we hear. It does not have to end there.",
    category: "Learning ASL",
    tint: "violet",
    date: "2026-08-06",
    imageAlt:
      "A student practicing American Sign Language alone with a laptop webcam.",
    body: [
      {
        type: "p",
        text: "The most common message we get is some version of the same sentence: my school does not offer ASL, but I want to learn it. Usually the person has already tried an app or a few video series, made some early progress, and then stalled.",
      },
      { type: "h2", text: "Why the stall happens" },
      {
        type: "p",
        text: "It is rarely motivation. It is that nothing in a video course tells you when you are wrong. You copy a sign, it feels close enough, and you move on. Weeks later the errors have set, and there is no way to tell which of the hundred signs you know are actually readable.",
      },
      { type: "h2", text: "What changes with feedback" },
      {
        type: "p",
        text: "Practicing with something that watches your hands turns an open loop into a closed one. You find out within a fraction of a second whether the sign registered, which is the same information a classroom gives you, without the classroom.",
      },
    ],
  },
  {
    slug: "how-to-learn-the-asl-alphabet",
    title: "How to Learn the ASL Alphabet: A Practical Guide to Fingerspelling",
    description:
      "Learn the ASL alphabet the right way: the 26 fingerspelling handshapes, the letters that trip beginners up, and how to actually get clear and fast.",
    excerpt:
      "Almost everyone starts ASL with the alphabet, then quietly gets stuck. Here is what it actually takes to fingerspell clearly, and the part most beginners rush past.",
    category: "Fundamentals",
    tint: "blue",
    date: "2026-05-28",
    // image: "/blog/how-to-learn-the-asl-alphabet.jpg",
    imageAlt:
      "A hand forming letters of the American Sign Language manual alphabet.",
    body: [
      {
        type: "p",
        text: "It has long been understood that the first thing anyone learns in American Sign Language is the alphabet. Almost every person who picks up ASL begins by memorizing the twenty-six handshapes, one for each letter, and feels like they have made real progress. But how much of fingerspelling is actually memorizing those shapes, and how much of it is everything that comes after? In this post, I want to walk through what it really takes to learn the ASL alphabet, and why the part most beginners skip is the part that matters most.",
      },
      { type: "h2", text: "What fingerspelling is actually for" },
      {
        type: "p",
        text: "Before we get into the handshapes, let us be clear about what fingerspelling does. The manual alphabet is not a replacement for the language. Fluent signers do not spell out every word. Fingerspelling is used for specific jobs: names of people and places, brands, titles, and words that do not have an established sign yet. Think of it as a tool you reach for in the middle of a conversation, not the conversation itself.",
      },
      {
        type: "p",
        text: "This matters because a lot of beginners treat the alphabet as the whole mountain. They learn twenty-six shapes, then wonder why they still cannot follow a signed sentence. The alphabet is the doorway, not the room. Knowing it well makes everything after it easier, but it was never meant to carry the entire language on its own.",
      },
      { type: "h2", text: "The twenty-six handshapes, and the two that move" },
      {
        type: "p",
        text: "The manual alphabet is twenty-six handshapes, one per letter. Twenty-four of them are static, meaning the hand holds a single shape and does not travel. The two exceptions are J and Z, which both require movement: J traces the curve of the letter and Z draws it in the air. That small detail trips up more people than you would think, because it is the first sign that ASL is built on motion as much as on shape.",
      },
      {
        type: "p",
        text: "A handful of letters look almost identical to a beginner and are worth extra attention. A, S, and T are all closed fists with the thumb in slightly different positions. M and N differ only by how many fingers fold over the thumb. K and P are the same shape pointed in different directions. What people get wrong is assuming that close enough is good enough. To a fluent reader, the difference between an A and an S is not a small detail, it is a different letter.",
      },
      { type: "h2", text: "Producing is easy, reading is hard" },
      {
        type: "p",
        text: "Here is the split almost no one warns you about. There are two separate skills hiding inside fingerspelling. The first is **expressive** (producing the letters with your own hand). The second is **receptive** (reading the letters off of someone else's hand). Most beginners get reasonably good at the first and almost completely neglect the second.",
      },
      {
        type: "p",
        text: "Producing letters feels like progress because you control the pace. You can take as long as you want to form each shape. Reading is harder because a real signer spells at conversational speed, the letters blur together, and you have to recognize them as a flowing shape rather than a slideshow of frozen poses. It is a good rule of thumb to spend at least as much time reading fingerspelling as you spend producing it. If you only ever practice your own hand, you will be the person who can spell their own name but freezes the moment someone spells theirs back.",
      },
      { type: "h2", text: "Clarity comes before speed" },
      {
        type: "p",
        text: "Almost every new signer wants to be fast. You see people online ripping through the alphabet in a couple of seconds and you assume that speed is the goal. It is not. Speed without clarity is just a blur that no one can read, and chasing it early is one of the fastest ways to build habits you will have to unlearn later.",
      },
      {
        type: "p",
        text: "The signers who are genuinely fast got there by being clear first. They locked in clean, distinct handshapes, held a steady hand position, and let speed come on its own as the shapes became automatic. More is not necessarily better here. A slow, readable name is worth far more than a fast one nobody can catch.",
      },
      { type: "h2", text: "The problem with practicing alone" },
      {
        type: "p",
        text: "This is where most self-teaching quietly breaks down. You can memorize all twenty-six shapes from a chart, practice them in the mirror, and still be forming several of them wrong without any idea that you are. A mirror only shows you what you already think the shape looks like. It cannot tell you that your T is reading as an A, or that your hand is drifting out of position. Without something checking your form, a small error just gets repeated until it feels normal.",
      },
      {
        type: "p",
        text: "This is the same reason watching videos only takes you so far, which I get into in [why watching videos isn't enough to learn ASL](/blog/why-watching-videos-isnt-enough-to-learn-asl). The fix is feedback: some way of finding out, while you are practicing, whether the shape your hand is making is actually the letter you mean. The sooner you catch a wrong handshape, the less time you spend grooving it in.",
      },
      { type: "h2", text: "Make the alphabet yours" },
      {
        type: "p",
        text: "If you take one thing from this, let it be that the ASL alphabet is not a box you check on day one and move past. Learn the shapes, yes, but then put real time into reading other people's spelling, keep your handshapes clean before you worry about speed, and find a way to check that what your hand is doing matches what you intend. Tailor the practice to where you actually struggle, not to whatever looks impressive in a video. Do that, and the alphabet stops being a hurdle and becomes the reliable tool it was meant to be. In the end, you control how solid your foundation is.",
      },
    ],
  },
  {
    slug: "how-long-does-it-take-to-learn-asl",
    title: "How Long Does It Normally Take to Learn ASL?",
    description:
      "How long does it take to learn ASL? An honest look at realistic timelines, what 'fluent' really means, and the one factor that decides how fast you progress.",
    excerpt:
      "It is the first question almost everyone asks, and the honest answer is “it depends.” Here is what it actually depends on, how you can accelerate, and where the bottlenecks are.",
    category: "Getting Started",
    tint: "indigo",
    date: "2026-05-21",
    // image: "/blog/how-long-does-it-take-to-learn-asl.jpg",
    imageAlt:
      "A calendar and a pair of hands signing, representing the time it takes to learn ASL.",
    body: [
      {
        type: "p",
        text: "It is the first question almost everyone asks before they start: how long is this going to take? It is a fair question, and it deserves a real answer instead of an aspirational one. The honest response is that it depends, but that is only a useful answer if we are specific about what it depends on. So let us break down what actually shapes the timeline of learning American Sign Language, and what you can do about it.",
      },
      { type: "h2", text: "First, define what “learning ASL” even means" },
      {
        type: "p",
        text: "Part of why this question is so hard to answer is that being fluent is not one thing. There is a wide gap between fingerspelling your name, holding a slow conversation about everyday topics, and signing comfortably with a Deaf person at full speed about anything that comes up. Those are three very different finish lines, and people quote wildly different timelines because they are quietly measuring different ones.",
      },
      {
        type: "p",
        text: "This is the same problem that makes “how good are you at ASL” hard to answer honestly. Without a shared definition of the goal, every estimate is really a guess about which goal you mean. So before you ask how long it takes, decide what you are actually aiming for.",
      },
      { type: "h2", text: "An actual rough range for a beginner learner" },
      {
        type: "p",
        text: "With that said, here are some general ranges. Treat them as rough guides, not promises. The alphabet and basic fingerspelling can come together in a few hours of focused practice. A working set of everyday vocabulary and the ability to hold a simple, patient conversation usually takes a few months of regular practice. Becoming genuinely conversational, where you can follow a Deaf signer moving at natural speed, is more often a matter of a year or more, the same ballpark as reaching conversational ability in any spoken second language.",
      },
      {
        type: "p",
        text: "Notice that these are ranges, not numbers. Anyone who promises you fluency in thirty days is selling something. ASL is a full language with its own grammar and structure, not a set of gestures to memorize, and real languages do not collapse into a month. If part of what is slowing you down is the worry that it is simply too hard, I pull that fear apart in [is ASL hard to learn](/blog/is-asl-hard-to-learn).",
      },
      { type: "h2", text: "Why two people get such different results" },
      {
        type: "p",
        text: "If the timeline depends on anything, it depends on the learner. A few factors explain most of the difference between someone who progresses quickly and someone who stalls:",
      },
      {
        type: "ul",
        items: [
          "**Prior language learning.** People who have already learned a second language tend to pick up a third faster, because building grammar from scratch is familiar territory.",
          "**Consistency.** Someone practicing twenty minutes a day will almost always outpace someone who does one three-hour session a week, even though the weekly total is similar.",
          "**Exposure to real signing.** Watching and interacting with fluent signers, rather than only studying charts, trains the receptive skill that no textbook can.",
          "**Quality of feedback.** Whether anything is actually catching your mistakes, or whether you are quietly repeating them, makes an enormous difference over months.",
        ],
      },
      { type: "h2", text: "The one variable you actually control" },
      {
        type: "p",
        text: "Of everything on that list, the one you have the most direct control over is consistency. You cannot change how many languages you already speak, and you may not have a Deaf community nearby. But you can decide to show up for a short session every day instead of saving it all for the weekend.",
      },
      {
        type: "p",
        text: "This is not just motivational filler, it is how memory works. Spreading practice out over many short sessions, sometimes called **spaced practice**, builds more durable memory than cramming the same total time into one long block. More is not necessarily better, in the sense that one marathon session does less for you than the same hours split across a week. Twenty focused minutes a day will quietly beat almost any heroic weekend effort.",
      },
      { type: "h2", text: "Feedback decides how much of that time counts" },
      {
        type: "p",
        text: "There is one more thing that quietly stretches or shrinks your timeline, and that is whether your practice is actually correct. Time spent repeating a sign wrong does not just fail to help, it actively sets you back, because you then have to notice the habit and unlearn it. Practice only pays off at full value when something is telling you whether you are getting it right. I make the fuller case for that in [why watching videos isn't enough to learn ASL](/blog/why-watching-videos-isnt-enough-to-learn-asl).",
      },
      { type: "h2", text: "Your timeline is yours" },
      {
        type: "p",
        text: "So how long does it take to learn ASL? Long enough that you should respect it as a real language, and short enough that consistent daily practice will carry you further than you expect. Pick a clear goal, show up in small regular doses, get real feedback on your form, and stop comparing your week three to someone else's year two. The clock is not the point. The only timeline that matters is the one you are actually willing to keep, and that one is entirely yours.",
      },
    ],
  },
  {
    slug: "is-asl-hard-to-learn",
    title: "Is ASL Hard to Learn? How beginners often get stuck",
    description:
      "Is ASL hard to learn? Not the way people think. The five parts of every sign, why beginners stall, and the real obstacle that holds most learners back.",
    excerpt:
      "ASL is not harder than any other language, but it is harder than people expect, and for a reason almost no beginner sees coming.",
    category: "Learning ASL",
    tint: "sky",
    date: "2026-05-14",
    // image: "/blog/is-asl-hard-to-learn.jpg",
    imageAlt:
      "Close-up of expressive hands and face mid-sign, illustrating the parts of an ASL sign.",
    body: [
      {
        type: "p",
        text: "There are two myths about how hard American Sign Language is to learn, and they sit at opposite extremes. The first is that it is easy, just gestures and pointing, something you can pick up from a weekend of videos. The second is that it is impossibly hard, a whole new language you could never really master as an adult. The truth, as usual, sits in between. ASL is not harder than learning any other second language, but it is harder than most beginners expect, and understanding why is the first step to getting unstuck.",
      },
      { type: "h2", text: "It is a real language, not gestures" },
      {
        type: "p",
        text: "The single biggest misconception is that ASL is just English acted out with your hands. It is not. ASL is its own language with its own grammar, word order, and structure, and that grammar is genuinely different from English. You do not sign word for word in English order. Information that English carries through word endings and helper words, ASL often carries through space, timing, and the body.",
      },
      {
        type: "p",
        text: "This is where people who assumed it would be easy hit a wall. Memorizing a pile of individual signs feels productive, but stringing them together in English order produces something a Deaf signer would find awkward or unclear. Accepting early that you are learning a new grammar, not relabeling English, saves you from that wall.",
      },
      { type: "h2", text: "Every sign has five parts" },
      {
        type: "p",
        text: "Here is a framework that makes the difficulty concrete. Linguists describe every sign as a combination of five parameters: **handshape**, **palm orientation**, **location**, **movement**, and **non-manual markers** (the facial expressions and body movements that go with the sign). Change any one of those five and you can change the meaning of the sign entirely, or turn it into nonsense.",
      },
      {
        type: "p",
        text: "Beginners almost always focus on the first one, handshape, and neglect the other four. They get the shape of the hand right but sign it in the wrong location, or with no movement, or with a blank face. To them it feels like they made the sign. To a fluent signer, they made something that is slightly off in a way that is hard to read. Most of the “I am doing everything right and still not being understood” frustration comes from quietly dropping one of these five parameters.",
      },
      { type: "h2", text: "The face is not optional" },
      {
        type: "p",
        text: "Of those five parameters, the one hearing beginners resist the most is the last one. Non-manual markers are not decoration or drama. In ASL, your face and body carry grammar. Raised eyebrows can mark a question. A specific expression can turn a statement into a conditional. Leaving your face blank while you sign is not neutral, it is like speaking in a flat monotone that strips the punctuation out of your sentences.",
      },
      {
        type: "p",
        text: "Many people coming from a hearing background find this genuinely uncomfortable at first, because they were raised to keep a controlled, polite face. Learning to let your expression do grammatical work is one of the real difficulties of ASL, and it has nothing to do with your hands.",
      },
      { type: "h2", text: "The real reason people get stuck" },
      {
        type: "p",
        text: "Notice that none of these difficulties are about intelligence or talent. The thing that actually stalls most learners is more practical: there is usually nothing telling them which of these pieces they are getting wrong. You can feel like you are signing correctly while dropping the movement, mislocating the sign, or freezing your face, and simply never find out. Without feedback, you do not just fail to improve, you reinforce the exact mistakes that are holding you back.",
      },
      {
        type: "p",
        text: "That is the honest answer to whether ASL is hard. The grammar is learnable. The five parameters are learnable. What makes it feel hard is practicing in the dark, with no signal about what to fix. Solve the feedback problem and most of the difficulty becomes ordinary, the same kind of work any language takes. I dig into that specific gap in [why watching videos isn't enough to learn ASL](/blog/why-watching-videos-isnt-enough-to-learn-asl).",
      },
      { type: "h2", text: "Hard, but not the way you feared" },
      {
        type: "p",
        text: "So is ASL hard to learn? It is real work, the same as any language is real work. But it is not hard for the reasons beginners fear. It is not too late, and you are not bad at it. You are probably just missing feedback on one of the five parts of the sign. Learn the grammar as its own system, give all five parameters their due, let your face do its job, and find a way to catch your mistakes early. Do that, and ASL turns out to be exactly as hard as it should be, and entirely within your reach.",
      },
    ],
  },
  {
    slug: "best-way-to-learn-sign-language-at-home",
    title: "The Best Way to Learn Sign Language at Home",
    description:
      "The best way to learn sign language at home without a classroom: how to choose resources, build a routine that sticks, and avoid the trap that stalls self-teachers.",
    excerpt:
      "You do not need a classroom to learn ASL, but self-teaching at home has one trap that stalls most people. Here is how to set yourself up so it actually works.",
    category: "Self-Teaching",
    tint: "cyan",
    date: "2026-05-07",
    // image: "/blog/best-way-to-learn-sign-language-at-home.jpg",
    imageAlt:
      "A person practicing sign language at home in front of a laptop.",
    body: [
      {
        type: "p",
        text: "More people than ever are trying to learn sign language at home, on their own schedule, without ever setting foot in a classroom. That is genuinely possible now in a way it was not a decade ago. But learning at home comes with one specific trap that quietly stalls most self-teachers, and the goal of this post is to help you set up a home practice that actually works instead of one that fizzles out in a month. Let us start with the tools.",
      },
      { type: "h2", text: "The resources, and where each one falls short" },
      {
        type: "p",
        text: "Most people learning at home reach for some combination of the same resources. Each is useful, and each has a blind spot worth naming:",
      },
      {
        type: "ul",
        items: [
          "**Video lessons and YouTube.** Excellent for seeing how a sign is supposed to look and for learning from fluent and Deaf signers. The blind spot is that they only show you the target; they cannot see what your hands are doing.",
          "**Apps and courses.** Good for structure and steady progress through vocabulary and grammar. Many still rely on you watching a clip and assuming you copied it correctly.",
          "**Sign dictionaries.** Perfect for looking up a single sign on demand. They are a reference, not a curriculum, and they will not build skill on their own.",
          "**Practice with other people.** The most valuable of all, especially with Deaf signers, but also the hardest to arrange if there is no community near you.",
        ],
      },
      {
        type: "p",
        text: "None of these is wrong. The mistake is assuming any single one is enough on its own. A strong home setup borrows from several: structure from a course, real signing to watch from video, and as much human practice as you can find.",
      },
      { type: "h2", text: "Watching is not the same as doing" },
      {
        type: "p",
        text: "Here is the gap at the center of self-teaching. It is easy to spend an hour watching ASL content, feel like you studied, and have produced almost nothing with your own hands. Watching trains your eyes, which is the receptive side of the language. It does very little for the expressive side, the actual production of signs, which only improves when you make them yourself.",
      },
      {
        type: "p",
        text: "This is one of the most misunderstood parts of learning a language at home. Passive input feels like progress because it is comfortable and you understand a little more each time. But understanding a sign when you see it and being able to produce it cleanly are two different skills. It is a good rule of thumb that if your hands are not moving for a good portion of your practice, you are studying ASL more than you are learning it.",
      },
      { type: "h2", text: "Build a routine that survives a busy week" },
      {
        type: "p",
        text: "The learners who succeed at home almost never rely on motivation. They rely on a routine small enough to survive a bad week. A short daily session beats an occasional long one, both because it fits into real life and because spreading practice out builds more durable memory than cramming, the same principle I cover in [how long it takes to learn ASL](/blog/how-long-does-it-take-to-learn-asl).",
      },
      {
        type: "p",
        text: "More is not necessarily better here. A realistic fifteen or twenty minutes a day that you will actually keep is worth more than an ambitious hour you abandon by week two. Build the habit first and let the duration grow once it is automatic.",
      },
      { type: "h2", text: "The trap: nothing at home is checking your form" },
      {
        type: "p",
        text: "Now the trap I promised you. In a classroom, a teacher catches your mistakes. At home, by default, nothing does. You can practice a sign wrong fifty times and the only feedback you get is your own belief that it looked right. A mirror does not help much, because it only reflects the shape you already think you are making. This is the single biggest reason self-teaching stalls, and it is not a motivation problem, it is an information problem.",
      },
      {
        type: "p",
        text: "So the most important thing you can add to a home setup is some source of correction. That might be a patient Deaf friend, a tutor, a practice group, or technology that can actually watch your hands and tell you whether the sign is right. Whatever form it takes, you need something outside your own head confirming that what you are practicing is correct, or you risk getting very good at the wrong version.",
      },
      { type: "h2", text: "One more thing: respect the language" },
      {
        type: "p",
        text: "A quick but important note. ASL belongs to the Deaf community, and the best home learners treat it as a language to be respected, not a party trick to collect. Learn from Deaf creators when you can. Pay attention to the culture, not only the vocabulary. And be skeptical of viral videos promising to teach you to sign anything in ten minutes. Those buzzwords sell views, not skill, and copying them blindly is how people pick up sloppy or flat-out wrong signs.",
      },
      { type: "h2", text: "Set the room up so you can win" },
      {
        type: "p",
        text: "Learning sign language at home absolutely works, but only if you account for what home is missing. Pull structure, real signing, and human contact from several resources instead of leaning on one. Keep your hands moving instead of just watching. Build a small daily habit you can actually keep. And above all, find a way to get your form checked so you are not practicing mistakes into permanence. Set the room up that way and the lack of a classroom stops mattering. You are in control of your own ASL journey, so build the practice that fits your life.",
      },
    ],
  },
  {
    slug: "why-watching-videos-isnt-enough-to-learn-asl",
    title: "Why Watching Videos Isn't Enough to Learn ASL",
    description:
      "Watching ASL videos trains your eyes but not your hands. Why real-time feedback is the missing piece when you learn sign language, and how to actually build skill.",
    excerpt:
      "The most common way people learn ASL online is by watching videos. It is also why so many people stall. Watching trains your eyes, not your hands.",
    category: "Learning Science",
    tint: "violet",
    date: "2026-04-30",
    // image: "/blog/why-watching-videos-isnt-enough-to-learn-asl.jpg",
    imageAlt:
      "A laptop playing an ASL video next to a hand attempting to copy the sign.",
    body: [
      {
        type: "p",
        text: "By far the most common way people try to learn American Sign Language online is by watching videos. You find a clip, you watch the sign, you nod along, and you move to the next one. It feels like studying, and to be fair, it is not useless. But watching video is also one of the most common reasons people plateau, and the explanation comes down to a basic fact about how skills are built. Let us get into why watching is not enough, and what is actually missing.",
      },
      { type: "h2", text: "Skills are built by doing, then correcting" },
      {
        type: "p",
        text: "Any physical skill, from a tennis serve to a handshape, is learned through a loop: you attempt the movement, you find out how close you got, and you adjust on the next attempt. That second step, finding out how close you got, is the feedback, and it is not optional. It is the part of the loop that tells your body what to change. Remove it and you are not really practicing, you are just repeating.",
      },
      {
        type: "p",
        text: "Watching a video gives you a perfect picture of the target and zero information about your own attempt. It is all model and no correction. You can watch the ideal version of a sign a hundred times and still produce it wrong, because nothing in those hundred views ever told you how your version differed from the one on screen.",
      },
      { type: "h2", text: "The silent error problem" },
      {
        type: "p",
        text: "This leads to what I think of as the silent error problem. When you practice a sign by copying a video, any mistake you make is invisible to you. You think you matched it. Nothing says otherwise. So you repeat the mistake, and every clean repetition makes it more automatic. You are not failing to learn, you are successfully learning the wrong thing.",
      },
      {
        type: "p",
        text: "This is worse than it sounds, because mistakes that get practiced in are expensive to remove later. You first have to notice the habit, then consciously override it, then rebuild the correct version, all while the wrong one keeps trying to fire. An error caught on the first attempt costs you seconds. The same error caught after a month of practice can cost you weeks. More repetition is not necessarily better when you are repeating something wrong.",
      },
      { type: "h2", text: "Video trains the wrong half of the language" },
      {
        type: "p",
        text: "There is also a lopsidedness to learning from video. As I mention in [the best way to learn sign language at home](/blog/best-way-to-learn-sign-language-at-home), every language has a receptive side (understanding what others produce) and an expressive side (producing it yourself). Watching video almost exclusively trains the receptive side. Your eyes get better at recognizing signs while your hands stay roughly where they started.",
      },
      {
        type: "p",
        text: "That imbalance is sneaky because it feels like real progress. Each week you understand more of what you watch, so you assume you are getting better at the language as a whole. But the day you have to sign back, the gap shows up immediately. Recognition and production are different skills, and only one of them improves from the couch.",
      },
      { type: "h2", text: "What actually closes the loop" },
      {
        type: "p",
        text: "So what is the missing piece? Feedback that is specific, immediate, and tied to your own attempt. Specific, meaning it tells you what was wrong, not just that something was. Immediate, meaning it arrives while the attempt is still fresh, before you have moved on and grooved the error. And tied to your attempt, meaning it is responding to what your hands actually did, not to a generic ideal.",
      },
      {
        type: "p",
        text: "Traditionally the only thing that could provide that was a person: a teacher, a tutor, or a Deaf friend patient enough to correct you. That is still the gold standard, and nothing here is meant to replace human signers or the Deaf community. But it is also exactly the thing most self-teachers do not have on hand at eleven at night when they finally sit down to practice. The promising development is that technology can now watch your hands through a webcam and close part of that loop in real time, turning solo practice from blind repetition into something that can actually correct you.",
      },
      { type: "h2", text: "Be skeptical of the copy-this crowd" },
      {
        type: "p",
        text: "One last warning that follows directly from all this. Because watching is so passive, it is easy to fall into copying whatever signer happens to have the most views, and to assume popularity means correctness. It does not. Plenty of viral “learn ASL fast” content is sloppy, oversimplified, or simply wrong, and copying it without any way to check your form just spreads those errors to your own hands. Watch widely, lean toward Deaf creators, and never let a view count stand in for accuracy.",
      },
      { type: "h2", text: "Watch, but do not only watch" },
      {
        type: "p",
        text: "Video has a place. It is a great way to see fluent signing and to learn what a sign should look like. The mistake is treating it as the whole method instead of one input. Watching trains your eyes, but ASL lives in your hands and your face, and those only improve when you produce signs and find out, quickly and specifically, whether you got them right. Close that loop, by whatever means you can, and you stop plateauing. In the end, the difference between watching ASL and learning it is feedback, and that is something you can choose to go get.",
      },
    ],
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-05-28" -> "May 28, 2026" (locale-independent, no timezone drift). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Estimated reading time in whole minutes (~200 wpm). */
export function readingMinutes(post: Post): number {
  const words = post.body.reduce((n, b) => {
    if (b.type === "ul" || b.type === "ol") {
      return n + b.items.join(" ").split(/\s+/).filter(Boolean).length;
    }
    return n + b.text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Up to `count` other posts, newest first, excluding `slug`. */
export function getOtherPosts(slug: string, count = 2): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, count);
}
