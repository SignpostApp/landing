export interface AuthoredSign {
  category: string;
  summary: string;
  steps: string[];
  tips: string[];
  aka?: string[];
}

export interface SignCategory {
  name: string;
  slug: string;
  blurb: string;
}

export const CATEGORIES: SignCategory[] = [
  {
    name: "Greetings",
    slug: "greetings",
    blurb: "The signs every conversation opens with: hello, goodbye, nice to meet you, and introducing yourself by name.",
  },
  {
    name: "Question Words",
    slug: "question-words",
    blurb: "Who, what, where, when, why, and how. In ASL these come with lowered eyebrows, and the expression is part of the sign.",
  },
  {
    name: "Pronouns",
    slug: "pronouns",
    blurb: "Pointing is grammar in ASL. These are the signs for I, you, my, and your, and how the direction of your hand carries the meaning.",
  },
  {
    name: "People & Family",
    slug: "people-and-family",
    blurb: "Family signs follow a pattern: male signs start at the forehead and female signs start at the chin. Learn the pattern once and most of these come free.",
  },
  {
    name: "Responses",
    slug: "responses",
    blurb: "Yes, no, please, sorry, and the short replies that keep a signed conversation moving.",
  },
  {
    name: "Everyday Signs",
    slug: "everyday-signs",
    blurb: "High-frequency vocabulary for daily life: home, time, phone, book, and the small words that glue sentences together.",
  },
  {
    name: "Actions",
    slug: "actions",
    blurb: "Common verbs: eat, drink, go, come, read, write, work, and study. Most of these mime the action, which makes them some of the easiest signs to remember.",
  },
  {
    name: "Time & Days",
    slug: "time-and-days",
    blurb: "Days of the week use the first letter of the English word in a small circle, and ASL places the past behind you and the future in front of you.",
  },
  {
    name: "Feelings",
    slug: "feelings",
    blurb: "Happy, sad, tired, nervous, excited. These signs live on the chest, and your face has to match the feeling or the sign reads wrong.",
  },
  {
    name: "Colors",
    slug: "colors",
    blurb: "Most ASL colors are the first letter of the English word given a small twist of the wrist. Red, black, and white are the exceptions worth learning first.",
  },
  {
    name: "Food & Drink",
    slug: "food-and-drink",
    blurb: "Eat, drink, water, coffee, and the three meals of the day, which are compound signs built from EAT plus a time of day.",
  },
  {
    name: "Body & Health",
    slug: "body-and-health",
    blurb: "Pointing to a body part is usually the sign for it. The health vocabulary here covers what you need to describe a problem and ask for help.",
  },
  {
    name: "Describing People & Things",
    slug: "describing",
    blurb: "Tall, short, old, beautiful, hot, and warm. Adjectives in ASL often come after the noun and are intensified with your face.",
  },
  {
    name: "Work & Travel",
    slug: "work-and-travel",
    blurb: "Boss, police, library, airplane, and luggage: the signs you reach for at work, in town, and on the way somewhere.",
  },
  {
    name: "Weather",
    slug: "weather",
    blurb: "Sun, hot, warm, and summer. Weather signs are a good first topic for small talk because they pair naturally with facial expression.",
  },
  {
    name: "Alphabet",
    slug: "alphabet",
    blurb: "The 26 handshapes of the ASL manual alphabet, used to fingerspell names, places, and any word without a sign.",
  },
  {
    name: "Numbers",
    slug: "numbers",
    blurb: "The handshapes for 0 through 9. Numbers 1 through 5 face your own body when counting, which surprises most beginners.",
  },
];

export const SIGN_CONTENT: Record<string, AuthoredSign> = {
  please: {
    category: "Responses",
    summary: "PLEASE rubs a flat hand in a small circle on the chest, the same way you might smooth your shirt.",
    steps: [
      "Place your dominant hand flat against the center of your chest, palm in.",
      "Rub the hand in one or two slow circles.",
    ],
    tips: [
      "Keep the pressure light. The circle is the sign, not the rubbing.",
      "Your expression does the asking. A flat face turns PLEASE into a statement.",
    ],
  },
  sorry: {
    category: "Responses",
    summary: "SORRY circles a closed fist on the chest, with the thumb resting beside the fingers in an A handshape.",
    steps: [
      "Make an A handshape: a fist with the thumb resting along the side.",
      "Place it on your chest and move it in a couple of small circles.",
    ],
    tips: [
      "Let your face show the regret. The same movement with a neutral face reads as odd.",
      "The sign also covers APOLOGIZE and REGRET, and context tells them apart.",
    ],
    aka: ["Apologize", "Regret"],
  },
  bad: {
    category: "Responses",
    summary: "BAD starts like GOOD, with fingertips at the mouth, then flips the hand so the palm faces down and away.",
    steps: [
      "Touch the fingertips of a flat hand to your lips or chin, palm facing you.",
      "Move the hand down and away while turning it over so the palm faces the floor.",
    ],
    tips: [
      "GOOD moves down with the palm still facing up. The flip is what makes it BAD.",
      "Add a slight frown or wrinkled nose. Signing BAD with a smile confuses the meaning.",
    ],
  },
  eat: {
    category: "Actions",
    summary: "EAT taps a flattened O handshape against the mouth, as if putting food in it.",
    steps: [
      "Bring your fingertips and thumb together into a flattened O.",
      "Tap the fingertips to your lips once or twice.",
    ],
    tips: [
      "FOOD is the same sign, usually repeated. One tap for the verb, a double tap for the noun is a safe habit.",
      "Keep the movement small and near the mouth, not out in front of you.",
    ],
    aka: ["Food"],
  },
  drink: {
    category: "Actions",
    summary: "DRINK tips a C handshape toward the mouth, exactly like lifting a cup.",
    steps: [
      "Shape your dominant hand into a C, as though holding a glass.",
      "Bring it to your mouth and tip it as if taking a sip.",
    ],
    tips: [
      "The size of the C and the speed of the tip can change the meaning from a sip to a gulp.",
      "Thumb on top as you tip, the way a real cup would sit in your hand.",
    ],
  },
  sleep: {
    category: "Actions",
    summary: "SLEEP draws an open hand down over the face, closing into a flattened O at the chin as your eyes close.",
    steps: [
      "Hold an open hand in front of your face, palm toward you.",
      "Pull it down toward your chin while closing the fingers to meet the thumb.",
      "Let your eyes close and your head tilt slightly as the hand comes down.",
    ],
    tips: [
      "The face is half the sign. Eyes open and head upright reads as a different motion.",
      "One slow pass is enough. Repeating it quickly looks like wiping your face.",
    ],
  },
  talk: {
    category: "Actions",
    summary: "TALK moves an upright hand forward from the mouth and back, with the fingers extended, as words leaving the lips.",
    steps: [
      "Hold your dominant hand at your chin with the fingers extended and the palm facing sideways.",
      "Move it forward and back from the mouth a couple of times.",
      "Use both hands alternating to show a two-way conversation.",
    ],
    tips: [
      "Alternating two hands means CONVERSE or CHAT. One hand is plain TALK.",
      "Keep the hand close to the mouth so the sign reads as speech rather than a wave.",
    ],
  },
  listen: {
    category: "Actions",
    summary: "LISTEN cups a hand behind or beside the ear, the universal gesture for trying to hear.",
    steps: [
      "Cup your dominant hand slightly, palm forward.",
      "Hold it just beside your ear, and tilt your head a touch toward it.",
    ],
    tips: [
      "Hold the hand still. Tapping the ear is the sign for HEAR or EAR, not LISTEN.",
      "Lean in with your head and the sign reads as attentive listening.",
    ],
  },
  grandmother: {
    category: "People & Family",
    summary: "GRANDMOTHER starts as MOTHER, with the thumb of an open hand at the chin, then bounces forward in two small arcs.",
    steps: [
      "Open your dominant hand with the fingers spread and touch the thumb to your chin.",
      "Move the hand forward and away from the chin in two small bounces.",
    ],
    tips: [
      "The chin is the female location in ASL family signs. Starting at the forehead makes it GRANDFATHER.",
      "Two bounces, not one. A single move forward is just MOTHER with extra motion.",
    ],
    aka: ["Grandma"],
  },
  grandfather: {
    category: "People & Family",
    summary: "GRANDFATHER starts as FATHER, with the thumb of an open hand at the forehead, then bounces forward in two small arcs.",
    steps: [
      "Open your dominant hand with the fingers spread and touch the thumb to your forehead.",
      "Move the hand forward and away in two small bounces.",
    ],
    tips: [
      "Forehead means male in ASL family signs. The same movement from the chin is GRANDMOTHER.",
      "Keep the fingers spread so the handshape stays readable as it moves away.",
    ],
    aka: ["Grandpa"],
  },
  aunt: {
    category: "People & Family",
    summary: "AUNT wiggles an A handshape near the cheek, on the female side of the face.",
    steps: [
      "Make an A handshape: a fist with the thumb resting along the side.",
      "Hold it beside your cheek, near the jaw, and shake it gently side to side.",
    ],
    tips: [
      "The lower face marks female relatives. Move the same shake up to the temple and it becomes UNCLE with a U.",
      "A small wiggle is enough. Big movements look like a different sign.",
    ],
  },
  uncle: {
    category: "People & Family",
    summary: "UNCLE wiggles a U handshape beside the temple, on the male side of the face.",
    steps: [
      "Extend your index and middle fingers together in a U handshape.",
      "Hold the hand beside your temple and shake it gently.",
    ],
    tips: [
      "Temple for male, cheek for female. AUNT is the same movement lower down with an A.",
      "Keep the two fingers pressed together or the handshape drifts toward V.",
    ],
  },
  sister: {
    category: "People & Family",
    summary: "SISTER touches the thumb of an open hand to the jaw, then both hands become index fingers that come together side by side.",
    steps: [
      "Touch the thumb of your dominant hand to your jaw, near the chin, with the index finger extended.",
      "Bring the hand down while changing both hands to index fingers.",
      "Land the dominant index finger on top of the non-dominant one so they lie side by side.",
    ],
    tips: [
      "Starting at the jaw marks it female. The same sign from the forehead is BROTHER.",
      "The two index fingers landing together is the SAME part of the sign. Make it clear.",
    ],
  },
  brother: {
    category: "People & Family",
    summary: "BROTHER touches the thumb of an open hand to the forehead, then both hands become index fingers that come together side by side.",
    steps: [
      "Touch the thumb of your dominant hand to your forehead, with the index finger extended, like the brim of a cap.",
      "Bring the hand down while changing both hands to index fingers.",
      "Land the dominant index finger on top of the non-dominant one so they lie side by side.",
    ],
    tips: [
      "Forehead for male, jaw for female. Check where you start before you worry about the rest.",
      "Many signers blend the two parts into one quick movement, so watch the clip at full speed too.",
    ],
  },
  baby: {
    category: "People & Family",
    summary: "BABY cradles one arm in the other and rocks them gently from side to side.",
    steps: [
      "Rest your dominant arm on top of your non-dominant arm as if holding an infant.",
      "Rock both arms together side to side a couple of times.",
    ],
    tips: [
      "Keep the rock small. Big swings read as exaggeration or a joke.",
      "Soften your face. BABY is one of the few signs where a tender expression is expected.",
    ],
  },
  friend: {
    category: "People & Family",
    summary: "FRIEND hooks two bent index fingers together, then flips the hands and hooks them the other way.",
    steps: [
      "Bend both index fingers into hooks and link them, dominant on top.",
      "Unhook, flip the hands over, and link them again with the other hand on top.",
    ],
    tips: [
      "Think of the two hooks as two people holding on to each other.",
      "Repeating the linking several times intensifies it toward BEST FRIEND or CLOSE FRIEND.",
    ],
  },
  husband: {
    category: "People & Family",
    summary: "HUSBAND starts with the hand at the forehead for male, then comes down to clasp the other hand in the sign for MARRY.",
    steps: [
      "Touch the thumb of an open hand to your forehead, like the start of FATHER or BOY.",
      "Bring the hand down into a curved shape and clasp it onto your non-dominant hand in front of you.",
    ],
    tips: [
      "MARRY is the clasp. Starting from the forehead makes it HUSBAND, from the jaw makes it WIFE.",
      "Keep the clasp firm and still at the end so the sign has a clear finish.",
    ],
  },
  wife: {
    category: "People & Family",
    summary: "WIFE starts with the thumb along the jaw for female, then comes down to clasp the other hand in the sign for MARRY.",
    steps: [
      "Trace the thumb of an open hand down your jaw, like the start of GIRL.",
      "Bring the hand down into a curved shape and clasp it onto your non-dominant hand in front of you.",
    ],
    tips: [
      "The jaw is the female marker. Starting at the forehead changes the sign to HUSBAND.",
      "Clasp once and hold. Repeated clasping looks like a different sign.",
    ],
  },
  neighbor: {
    category: "People & Family",
    summary: "NEIGHBOR signs NEAR, with one bent hand moving up to the other, then PERSON, with both flat hands moving down.",
    steps: [
      "Hold both hands bent, palms toward you, and move the dominant hand in toward the non-dominant one until they almost touch.",
      "Open both hands flat, palms facing each other, and move them straight down together for PERSON.",
    ],
    tips: [
      "The PERSON ending shows up in many signs, including TEACHER and STUDENT. Learn it once and reuse it.",
      "Keep NEAR small. It is about the closeness, not a big sweeping motion.",
    ],
  },
  family: {
    category: "People & Family",
    summary: "FAMILY starts with two F handshapes touching, then circles them outward until the little fingers meet.",
    steps: [
      "Make an F with each hand, index finger and thumb touching, and hold the two hands together at the index fingers.",
      "Circle both hands outward and around until the little fingers touch.",
    ],
    tips: [
      "The circle is the idea of a group. The F initial is what makes it FAMILY rather than GROUP, TEAM, or CLASS.",
      "Finish with the hands touching again so the circle closes cleanly.",
    ],
  },
  child: {
    category: "People & Family",
    summary: "CHILD pats a flat hand downward once, as if resting a hand on a small child's head.",
    steps: [
      "Hold your dominant hand flat with the palm facing down, out to your side at roughly waist height.",
      "Pat down gently once.",
    ],
    tips: [
      "Patting at several spots in a row makes it CHILDREN.",
      "A short, single pat is enough. Keep it relaxed.",
    ],
  },
  partner: {
    category: "People & Family",
    summary: "PARTNER is one of the signs that varies by region. The clip shows the common version, and many signers also fingerspell it.",
    steps: [
      "Watch the reference clip and copy the handshape and movement exactly as the signer makes them.",
      "If you are unsure in conversation, fingerspelling P-A-R-T-N-E-R is always understood.",
    ],
    tips: [
      "Ask the Deaf signers you spend time with which version they use, and match them.",
      "Context carries the meaning, so a romantic partner and a business partner may get different signs.",
    ],
  },
  cousin: {
    category: "People & Family",
    summary: "COUSIN wiggles a C handshape beside the head: at the temple for a male cousin, at the cheek for a female cousin.",
    steps: [
      "Shape your dominant hand into a C.",
      "Hold it beside your temple or cheek and shake it gently side to side.",
    ],
    tips: [
      "Signing it at the side of the head, between temple and cheek, keeps it gender-neutral.",
      "The movement matches AUNT and UNCLE. Only the handshape changes.",
    ],
  },
  what: {
    category: "Question Words",
    summary: "WHAT holds both open hands in front of you, palms up, and shakes them slightly side to side with the eyebrows down.",
    steps: [
      "Hold both hands open in front of your body, palms facing up.",
      "Shake them a little side to side while lowering your eyebrows.",
    ],
    tips: [
      "Lowered eyebrows are what make it a question. Without them it reads as a shrug.",
      "An older form drags the dominant index finger across the non-dominant palm. You will still see it in some clips.",
    ],
  },
  have: {
    category: "Everyday Signs",
    summary: "HAVE touches the fingertips of both bent hands to the chest.",
    steps: [
      "Bend both hands at the knuckles, fingers together.",
      "Bring the fingertips in to touch your upper chest.",
    ],
    tips: [
      "This is possession, as in I HAVE A CAR. It is not used as a helper verb the way English uses have.",
      "One touch is enough. Tapping repeatedly is a different sign.",
    ],
  },
  need: {
    category: "Everyday Signs",
    summary: "NEED bends an X handshape downward from the wrist twice, as if pressing the point home.",
    steps: [
      "Bend your index finger into a hook with the rest of the hand closed, forming an X.",
      "Hold it in front of you and bend the wrist down sharply, twice.",
    ],
    tips: [
      "A single, stronger bend turns it into MUST or HAVE TO.",
      "Keep the movement in the wrist. Moving the whole arm reads as emphasis you may not intend.",
    ],
    aka: ["Should"],
  },
  think: {
    category: "Everyday Signs",
    summary: "THINK touches the tip of the index finger to the forehead.",
    steps: [
      "Point your index finger with the rest of the hand closed.",
      "Touch the fingertip to the side of your forehead.",
    ],
    tips: [
      "A small circle at the forehead instead of a touch means WONDER or THINKING IT OVER.",
      "Many mental signs start here, including KNOW, REMEMBER, and FORGET.",
    ],
  },
  forget: {
    category: "Everyday Signs",
    summary: "FORGET wipes a flat hand across the forehead, closing into an A handshape at the side of the head.",
    steps: [
      "Place the fingertips of a flat hand on one side of your forehead, palm in.",
      "Drag the hand across the forehead, closing the fingers into a fist as it leaves the other side.",
    ],
    tips: [
      "Think of wiping a thought away. The closing fist is the thought disappearing.",
      "Starting with the fingertips on the forehead and ending beside the head keeps the path clear.",
    ],
  },
  take: {
    category: "Everyday Signs",
    summary: "TAKE reaches out with an open hand and closes it into a fist while pulling back toward the body.",
    steps: [
      "Extend an open hand out in front of you with the fingers spread.",
      "Close the hand into a fist as you pull it back toward you.",
    ],
    tips: [
      "The direction matters. Pulling toward you is TAKE, reaching out and placing is GIVE.",
      "A quick grab reads as TAKE or GRAB. Slower and it drifts toward ACCEPT.",
    ],
  },
  look: {
    category: "Everyday Signs",
    summary: "LOOK, as taught in this lesson, is LOOK FOR: a C handshape circles in front of the face as if scanning for something you have lost.",
    steps: [
      "Shape your dominant hand into a C and hold it in front of your face, palm facing sideways.",
      "Move it in a few small circles while your eyes follow the hand, as though searching.",
    ],
    tips: [
      "This is the same sign as SEARCH and SEEK.",
      "Plain LOOK, meaning to look at something, points a V handshape from your eyes toward what you see.",
    ],
    aka: ["Look for", "Search"],
  },
  sign: {
    category: "Everyday Signs",
    summary: "SIGN circles both index fingers alternately toward the body, with the palms facing out.",
    steps: [
      "Point both index fingers upward in front of you, palms facing away.",
      "Circle them alternately back toward your body, one after the other.",
    ],
    tips: [
      "Add LANGUAGE after it and you have SIGN LANGUAGE.",
      "Keep the circles relaxed and continuous rather than jerky.",
    ],
  },
  time: {
    category: "Time & Days",
    summary: "TIME taps the index finger on the back of the opposite wrist, where a watch would sit.",
    steps: [
      "Hold your non-dominant arm in front of you, wrist up.",
      "Tap the back of the wrist once or twice with your dominant index finger.",
    ],
    tips: [
      "With raised eyebrows this becomes the question WHAT TIME IS IT?",
      "Tap the wrist, not the forearm, so the reference to a watch is clear.",
    ],
  },
  up: {
    category: "Everyday Signs",
    summary: "UP, as taught in this lesson, is GET UP: a V handshape lying on the flat palm of the other hand rises until the two fingers stand on their tips.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing up.",
      "Lay a V handshape, index and middle fingers extended, on its back across that palm, like a person lying down.",
      "Swing the V up until the two fingertips stand on the palm.",
    ],
    tips: [
      "The two fingers are legs. Lying down, then standing, is the whole picture.",
      "Plain UP, meaning the direction, is simply an index finger pointing up and lifting a few inches.",
    ],
    aka: ["Get up", "Stand up"],
  },
  down: {
    category: "Everyday Signs",
    summary: "DOWN points the index finger toward the floor and moves it down a short distance.",
    steps: [
      "Point your index finger toward the floor with the rest of the hand closed.",
      "Lower the hand a few inches.",
    ],
    tips: [
      "Keep it short. A long downward sweep can read as a different sign.",
      "The same handshape moving up is UP.",
    ],
  },
  phone: {
    category: "Everyday Signs",
    summary: "PHONE holds a Y handshape against the cheek with the thumb at the ear and the little finger at the mouth.",
    steps: [
      "Extend your thumb and little finger with the other fingers folded down, forming a Y.",
      "Rest the hand against the side of your face, thumb by your ear.",
    ],
    tips: [
      "Hold it still for the noun. Tapping it to the ear a couple of times means CALL.",
      "The same handshape near the ear is how you ask someone to call you.",
    ],
    aka: ["Call"],
  },
  watch: {
    category: "Everyday Signs",
    summary: "WATCH, as in watching something, points a V handshape from the eyes toward the thing you are watching and holds it there.",
    steps: [
      "Make a V with the index and middle fingers and hold it just in front of your eyes.",
      "Move the V outward toward what you are watching and hold it steady for a beat.",
    ],
    tips: [
      "LOOK is the same movement without the hold. Holding the V is what makes it WATCH.",
      "For a wristwatch, tap the back of your wrist instead. Context tells the two apart.",
    ],
  },
  book: {
    category: "Everyday Signs",
    summary: "BOOK brings both flat hands together palm to palm, then opens them like the covers of a book.",
    steps: [
      "Place your hands together, palm to palm, with the fingers pointing forward.",
      "Keep the little fingers touching and open the hands outward so the palms face up.",
    ],
    tips: [
      "Opening and closing repeatedly can mean OPEN THE BOOK or READING through pages.",
      "The little fingers stay together. They are the spine of the book.",
    ],
  },
  cup: {
    category: "Food & Drink",
    summary: "CUP sets a C handshape down onto the flat palm of the other hand.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing up.",
      "Shape your dominant hand into a C and set it down on the palm, as if placing a cup on a table.",
    ],
    tips: [
      "Setting it down once is enough. The C is the cup and the palm is the table.",
      "Tipping the C toward your mouth instead is DRINK.",
    ],
  },
  car: {
    category: "Everyday Signs",
    summary: "CAR grips an imaginary steering wheel with two fists and turns it a short way, the same shape as DRIVE with less movement.",
    steps: [
      "Make two fists and hold them in front of you as if gripping a steering wheel.",
      "Turn the wheel a small amount back and forth.",
    ],
    tips: [
      "Small movement for the noun CAR, larger steering for the verb DRIVE.",
      "Keep the fists at wheel height, around chest level.",
    ],
  },
  tree: {
    category: "Everyday Signs",
    summary: "TREE rests the elbow of an open hand on the back of the other hand and twists the fingers, like branches moving in the wind.",
    steps: [
      "Hold your non-dominant arm flat across your body, palm down.",
      "Set the elbow of your dominant arm on the back of that hand, with the hand open and the fingers spread.",
      "Twist the open hand back and forth at the wrist.",
    ],
    tips: [
      "The forearm is the trunk and the spread fingers are the branches.",
      "A forward sweep of the arm, in the same position, means FOREST.",
    ],
  },
  history: {
    category: "Everyday Signs",
    summary: "HISTORY is an initialized sign: an H handshape moves down in two short bounces.",
    steps: [
      "Extend your index and middle fingers together in an H handshape.",
      "Hold the hand in front of you and move it down in two short bounces.",
    ],
    tips: [
      "Initialized signs borrow the first letter of the English word. Watch the clip for the exact angle of the H.",
      "Keep the two fingers pressed together so it stays an H rather than a V.",
    ],
  },
  monday: {
    category: "Time & Days",
    summary: "MONDAY circles an M handshape in a small circle with the palm facing out.",
    steps: [
      "Tuck your thumb under the first three fingers to make an M.",
      "Hold it in front of you, palm facing away, and move it in a small circle.",
    ],
    tips: [
      "Every weekday except Sunday follows this pattern: first letter, small circle.",
      "Three fingers over the thumb for M. Two makes it N, which is not a day.",
    ],
  },
  tuesday: {
    category: "Time & Days",
    summary: "TUESDAY circles a T handshape in a small circle with the palm facing out.",
    steps: [
      "Tuck your thumb between your index and middle fingers to make a T.",
      "Hold it in front of you, palm facing away, and move it in a small circle.",
    ],
    tips: [
      "Check the thumb position. A thumb beside the fist is A, not T.",
      "Keep the circle small, about the size of a coin.",
    ],
  },
  wednesday: {
    category: "Time & Days",
    summary: "WEDNESDAY circles a W handshape in a small circle with the palm facing out.",
    steps: [
      "Raise your index, middle, and ring fingers with the thumb and little finger touching, making a W.",
      "Hold it in front of you, palm facing away, and move it in a small circle.",
    ],
    tips: [
      "Three fingers up for W. Four fingers up is the number 4.",
      "Same circle as the other weekdays, so once Monday is clean the rest follow.",
    ],
  },
  thursday: {
    category: "Time & Days",
    summary: "THURSDAY is usually signed with an H handshape in a small circle, and some signers add a quick T before it.",
    steps: [
      "Extend your index and middle fingers together to make an H.",
      "Hold it in front of you, palm facing away, and move it in a small circle.",
    ],
    tips: [
      "Because T is Tuesday, Thursday borrows the H. Some signers flick T then H to be explicit.",
      "Keep the two fingers together or the H turns into a V.",
    ],
  },
  friday: {
    category: "Time & Days",
    summary: "FRIDAY circles an F handshape in a small circle with the palm facing out.",
    steps: [
      "Touch your index finger and thumb together with the other three fingers up, making an F.",
      "Hold it in front of you, palm facing away, and move it in a small circle.",
    ],
    tips: [
      "Keep the three raised fingers spread so the F circle stays visible.",
      "Same small circle as the other weekdays.",
    ],
  },
  saturday: {
    category: "Time & Days",
    summary: "SATURDAY circles an S handshape in a small circle with the palm facing out.",
    steps: [
      "Make a fist with the thumb crossing in front of the fingers, an S handshape.",
      "Hold it in front of you, palm facing away, and move it in a small circle.",
    ],
    tips: [
      "Thumb in front for S. Thumb beside the fist is A, which is not a day.",
      "Keep the circle small and steady.",
    ],
  },
  sunday: {
    category: "Time & Days",
    summary: "SUNDAY breaks the weekday pattern: both open hands face forward and move in small circles or a short downward motion.",
    steps: [
      "Hold both hands open in front of you, palms facing away, about shoulder width apart.",
      "Move them together in small circles, or in one smooth motion downward.",
    ],
    tips: [
      "It is the only day that does not use a letter handshape. Some say it shows hands raised in worship.",
      "Keep both hands moving together so the sign reads as one unit.",
    ],
  },
  yesterday: {
    category: "Time & Days",
    summary: "YESTERDAY touches the thumb of an A or Y handshape to the chin, then moves it back toward the ear.",
    steps: [
      "Make an A handshape, or a Y with the thumb and little finger out.",
      "Touch the thumb to your chin, then move the hand back along your jaw toward your ear.",
    ],
    tips: [
      "In ASL the past is behind you. YESTERDAY moves back, TOMORROW moves forward.",
      "Both the A and the Y versions are common. The movement is what matters.",
    ],
  },
  tomorrow: {
    category: "Time & Days",
    summary: "TOMORROW rests the thumb of an A handshape on the cheek, then arcs forward and away from the face.",
    steps: [
      "Make an A handshape and touch the thumb to your cheek near the chin.",
      "Move the hand forward in a small arc, away from your face.",
    ],
    tips: [
      "The future is in front of you in ASL. The forward arc is the sign's whole meaning.",
      "Keep the arc short. A long sweep forward means FUTURE or LATER ON.",
    ],
  },
  today: {
    category: "Time & Days",
    summary: "TODAY signs NOW, with both bent hands dropping down palms up, often twice, or NOW followed by DAY.",
    steps: [
      "Hold both hands bent or in Y handshapes in front of you, palms facing up.",
      "Drop them down a short distance once or twice.",
    ],
    tips: [
      "A single drop is NOW. Repeating it, or adding DAY, is how most signers say TODAY.",
      "Keep the drop small and in front of your body.",
    ],
  },
  morning: {
    category: "Time & Days",
    summary: "MORNING raises a flat hand, palm up, in the crook of the other arm, like the sun coming up over the horizon.",
    steps: [
      "Hold your non-dominant arm across your body, palm down, as the horizon.",
      "Rest the elbow of your dominant arm on it with the hand flat and the palm facing up.",
      "Raise the dominant hand toward you, like the sun rising.",
    ],
    tips: [
      "The horizon arm stays still. Only the sun hand moves.",
      "Compare it to NIGHT, where the hand drops over the horizon instead.",
    ],
  },
  afternoon: {
    category: "Time & Days",
    summary: "AFTERNOON rests a flat hand, palm down, on top of the other arm at an angle, showing the sun past its highest point.",
    steps: [
      "Hold your non-dominant arm across your body, palm down.",
      "Set your dominant forearm on the back of that hand with the hand flat and angled forward and down.",
    ],
    tips: [
      "The angle is the time of day. Straight up would be NOON, lower and lower heads toward evening.",
      "A small bounce of the angled hand is common and does not change the meaning.",
    ],
  },
  night: {
    category: "Time & Days",
    summary: "NIGHT drapes a bent hand, palm down, over the edge of the other hand, like the sun dipping below the horizon.",
    steps: [
      "Hold your non-dominant arm across your body, palm down.",
      "Bend your dominant hand at the wrist and rest it over the edge of the non-dominant hand, fingers pointing down.",
    ],
    tips: [
      "The hand going over the horizon is the whole idea. Keep the bottom arm still.",
      "Signing it twice with a small movement is a common way to say TONIGHT when paired with NOW.",
    ],
  },
  birthday: {
    category: "Time & Days",
    summary: "BIRTHDAY has several regional versions. A common one touches the middle finger of an open hand to the chin and then to the chest.",
    steps: [
      "Extend an open hand with the middle finger slightly bent forward.",
      "Touch the middle fingertip to your chin, then bring it down to touch your chest.",
    ],
    tips: [
      "Other regions sign BIRTH followed by DAY. Match whichever version the signers around you use.",
      "Watch the clip closely for the exact version Signpost uses in lessons.",
    ],
  },
  feel: {
    category: "Feelings",
    summary: "FEEL brushes the middle finger of an open hand upward on the chest.",
    steps: [
      "Extend an open hand with the middle finger bent slightly forward.",
      "Touch the middle fingertip to your chest and brush it upward once or twice.",
    ],
    tips: [
      "The bent middle finger is used for many feeling signs, including EXCITED and SENSITIVE.",
      "Your face sets the meaning. FEEL with a frown and FEEL with a smile are read differently.",
    ],
  },
  bored: {
    category: "Feelings",
    summary: "BORED presses an index finger to the side of the nose and twists it.",
    steps: [
      "Point your index finger and touch it to the side of your nose.",
      "Twist the finger a quarter turn, as if boring a hole.",
    ],
    tips: [
      "A flat, uninterested face is part of the sign.",
      "Keep the twist small. It is the touch and turn, not a drilling motion.",
    ],
  },
  fine: {
    category: "Feelings",
    summary: "FINE taps the thumb of an open hand against the center of the chest.",
    steps: [
      "Spread the fingers of your dominant hand and point the thumb toward you.",
      "Tap the thumb against your chest once or twice.",
    ],
    tips: [
      "A single relaxed tap means FINE or OKAY. Wiggling the fingers while tapping adds enthusiasm.",
      "Keep the fingers spread so the handshape is clearly a 5 and not a flat hand.",
    ],
    aka: ["Okay"],
  },
  proud: {
    category: "Feelings",
    summary: "PROUD draws the thumb of an A handshape up the center of the chest.",
    steps: [
      "Make an A handshape with the thumb pointing down.",
      "Place the thumb at the lower chest and draw it straight up toward your collarbone.",
    ],
    tips: [
      "Lift your chin slightly as the hand rises and the sign reads as pride.",
      "One smooth upward stroke is enough.",
    ],
  },
  lonely: {
    category: "Feelings",
    summary: "LONELY holds an upright index finger at the lips and draws it down once or twice.",
    steps: [
      "Point your index finger up and hold it in front of your lips, palm facing sideways.",
      "Draw the finger slowly down past your chin, once or twice.",
    ],
    tips: [
      "A slow movement with a wistful face reads as LONELY. Fast and neutral, it reads as ALONE.",
      "Keep the finger close to the face throughout.",
    ],
    aka: ["Alone"],
  },
  happy: {
    category: "Feelings",
    summary: "HAPPY brushes a flat hand upward on the chest in a couple of circular strokes.",
    steps: [
      "Hold your dominant hand flat against your chest, palm toward you.",
      "Brush it upward and out in a small circle, twice.",
    ],
    tips: [
      "Smile. HAPPY without a smile is confusing to read.",
      "Using both hands at once makes it bigger and more joyful.",
    ],
  },
  sad: {
    category: "Feelings",
    summary: "SAD lowers both open hands in front of the face as the expression falls.",
    steps: [
      "Hold both hands open in front of your face, palms toward you, fingers spread.",
      "Move both hands slowly down a few inches while letting your face fall.",
    ],
    tips: [
      "The hands should look like your features sinking. Match it with a sad expression.",
      "Keep the movement slow. A quick drop changes the feel of the sign entirely.",
    ],
  },
  angry: {
    category: "Feelings",
    summary: "ANGRY pulls clawed hands sharply upward from the stomach, with a matching face.",
    steps: [
      "Bend both hands into claws and hold them against your stomach or lower chest, palms in.",
      "Pull them up and out sharply, as if the anger is rising out of you.",
    ],
    tips: [
      "A clawed hand in front of the face that closes slightly is MAD. ANGRY starts lower and pulls up.",
      "Furrow your brows and tighten your mouth. The face carries the intensity.",
    ],
    aka: ["Mad"],
  },
  excited: {
    category: "Feelings",
    summary: "EXCITED brushes the bent middle fingers of both hands up the chest, alternating.",
    steps: [
      "Extend both hands with the middle fingers bent slightly forward.",
      "Brush the middle fingertips upward on your chest, alternating hands, in quick circles.",
    ],
    tips: [
      "It is FEEL done with both hands and energy. Let your face match it.",
      "Speed up the alternating strokes to show more excitement.",
    ],
  },
  tired: {
    category: "Feelings",
    summary: "TIRED rests the fingertips of both bent hands on the chest and then lets the hands sag downward.",
    steps: [
      "Bend both hands and touch the fingertips to your upper chest.",
      "Let the hands rotate down and sag while your shoulders drop.",
    ],
    tips: [
      "The sag is the whole point. Keep the fingertips in contact as the hands droop.",
      "Drop your shoulders and let your eyes half-close. The body sells the sign.",
    ],
  },
  surprised: {
    category: "Feelings",
    summary: "SURPRISED flicks pinched fingers open beside both eyes, like eyes going wide.",
    steps: [
      "Pinch the index finger and thumb of each hand together and hold them beside your eyes.",
      "Flick both open into L shapes while raising your eyebrows and widening your eyes.",
    ],
    tips: [
      "The flick should be quick. Slow opening reads as waking up.",
      "Raise the eyebrows. Flat eyebrows with the same hands read as a different sign.",
    ],
  },
  love: {
    category: "Feelings",
    summary: "LOVE crosses two fists over the heart, as if hugging something to your chest.",
    steps: [
      "Make fists with both hands.",
      "Cross your arms at the wrists and press the fists against your chest.",
    ],
    tips: [
      "Hold it for a beat. It is a still sign, not a squeeze.",
      "This is the verb and noun LOVE. The ILY handshape, with thumb, index, and little finger out, is a separate expression that means I LOVE YOU.",
    ],
  },
  scared: {
    category: "Feelings",
    summary: "SCARED pops two closed fists open into spread hands in front of the chest, with a startled face.",
    steps: [
      "Make two fists and hold them at the sides of your chest.",
      "Snap them open into spread hands that move toward each other in front of you.",
    ],
    tips: [
      "The face does half the work. Wide eyes and an open mouth are expected.",
      "The faster the snap, the more sudden the fear. A slow version reads as nervous or worried.",
    ],
    aka: ["Afraid", "Frightened"],
  },
  nervous: {
    category: "Feelings",
    summary: "NERVOUS trembles both open hands in front of the body with the palms facing down.",
    steps: [
      "Hold both hands open in front of you, palms facing the floor, fingers spread.",
      "Shake them with a small, quick tremble.",
    ],
    tips: [
      "Keep the tremble tight and fast. Big shakes look like SCARED.",
      "A tense face finishes the sign.",
    ],
  },
  confused: {
    category: "Feelings",
    summary: "CONFUSED touches the forehead for THINK, then scrambles two clawed hands around each other for MIXED UP.",
    steps: [
      "Touch your index finger to your forehead.",
      "Drop both hands into claw shapes, palms facing each other, and circle them around one another a couple of times.",
    ],
    tips: [
      "The circling claws alone mean MIXED or MIXED UP. The forehead touch makes it a mental state.",
      "A puzzled expression is part of the sign.",
    ],
  },
  color: {
    category: "Colors",
    summary: "COLOR wiggles the spread fingers of an open hand against the chin.",
    steps: [
      "Spread the fingers of your dominant hand and touch the fingertips to your chin, palm toward you.",
      "Wiggle the fingers while they stay in contact with the chin.",
    ],
    tips: [
      "Keep the fingertips on the chin. Wiggling in the air is a different sign.",
      "With raised eyebrows it becomes the question WHAT COLOR?",
    ],
  },
  red: {
    category: "Colors",
    summary: "RED brushes the index finger down the lips, once or twice.",
    steps: [
      "Point your index finger and touch it to your lips.",
      "Brush the finger downward off the lips, once or twice.",
    ],
    tips: [
      "The lips are the reference, the color of the mouth.",
      "Some signers bend the finger into an X as it comes down. Both are standard.",
    ],
  },
  blue: {
    category: "Colors",
    summary: "BLUE shakes a B handshape by twisting the wrist back and forth.",
    steps: [
      "Hold your dominant hand flat with the fingers together and the thumb tucked across the palm, a B handshape.",
      "Twist the hand back and forth at the wrist a couple of times.",
    ],
    tips: [
      "Most ASL colors are the English first letter plus this twist. Learn the twist once.",
      "Keep the thumb tucked. A thumb out to the side turns the B into an open hand.",
    ],
  },
  green: {
    category: "Colors",
    summary: "GREEN shakes a G handshape by twisting the wrist back and forth.",
    steps: [
      "Extend your index finger and thumb parallel to each other, pointing sideways, in a G handshape.",
      "Twist the hand back and forth at the wrist a couple of times.",
    ],
    tips: [
      "Same twist as BLUE and YELLOW. The letter is the only difference.",
      "Keep the gap between thumb and finger visible so the G reads clearly.",
    ],
  },
  yellow: {
    category: "Colors",
    summary: "YELLOW shakes a Y handshape by twisting the wrist back and forth.",
    steps: [
      "Extend your thumb and little finger with the other fingers folded down, a Y handshape.",
      "Twist the hand back and forth at the wrist a couple of times.",
    ],
    tips: [
      "The same twist with a P is PURPLE and with a G is GREEN.",
      "Keep the three middle fingers folded tight so the Y stays clear while it moves.",
    ],
  },
  orange: {
    category: "Colors",
    summary: "ORANGE squeezes a fist open and closed in front of the chin, like squeezing the fruit.",
    steps: [
      "Hold a loose fist in front of your chin.",
      "Open the hand into a C and squeeze it back into a fist, twice.",
    ],
    tips: [
      "The sign covers both the fruit and the color.",
      "Keep the squeezing hand at the chin. Lower, it looks like MILK.",
    ],
  },
  purple: {
    category: "Colors",
    summary: "PURPLE shakes a P handshape by twisting the wrist back and forth.",
    steps: [
      "Make a K handshape, with the index up, middle finger angled out, and thumb between them, then point it down to make a P.",
      "Twist the hand back and forth at the wrist a couple of times.",
    ],
    tips: [
      "P is K pointed downward. If the P feels awkward, fix the K first.",
      "Same twist as the other letter colors.",
    ],
  },
  black: {
    category: "Colors",
    summary: "BLACK draws the index finger across the forehead, just above the eyebrow.",
    steps: [
      "Point your index finger and touch it to one side of your forehead.",
      "Draw it across the forehead to the other side in one stroke.",
    ],
    tips: [
      "Think of drawing a dark eyebrow. One stroke, not back and forth.",
      "Keep the finger just above the brow, not on the hairline.",
    ],
  },
  white: {
    category: "Colors",
    summary: "WHITE places an open hand on the chest and pulls it away while closing the fingers to the thumb.",
    steps: [
      "Spread the fingers of your dominant hand and touch them to your chest.",
      "Pull the hand straight out while bringing the fingertips together into a flattened O.",
    ],
    tips: [
      "The movement is said to come from pulling at a white shirt.",
      "One pull is enough. Keep it short and in front of the chest.",
    ],
  },
  brown: {
    category: "Colors",
    summary: "BROWN slides a B handshape down the side of the cheek.",
    steps: [
      "Hold your hand flat with the fingers together and the thumb tucked, a B handshape.",
      "Place the index finger side against your cheek and slide the hand straight down.",
    ],
    tips: [
      "One slide down, not a twist. The cheek contact is what makes it BROWN rather than BLUE.",
      "Keep the hand flat as it slides.",
    ],
  },
  pink: {
    category: "Colors",
    summary: "PINK brushes the middle finger of a P handshape down the lips.",
    steps: [
      "Make a P handshape, a K pointed downward.",
      "Touch the middle finger to your lips and brush it down, once or twice.",
    ],
    tips: [
      "It is RED with a P. The lips are the same reference point.",
      "Keep the brush short so it stays near the mouth.",
    ],
  },
  food: {
    category: "Food & Drink",
    summary: "FOOD taps a flattened O handshape to the mouth twice, the same movement as EAT.",
    steps: [
      "Bring the fingertips and thumb of your dominant hand together into a flattened O.",
      "Tap the fingertips to your lips twice.",
    ],
    tips: [
      "EAT and FOOD share the sign. The double tap leans toward the noun.",
      "Keep the hand close to the mouth for both.",
    ],
    aka: ["Eat"],
  },
  water: {
    category: "Food & Drink",
    summary: "WATER taps a W handshape against the chin.",
    steps: [
      "Raise your index, middle, and ring fingers with the thumb and little finger touching, a W handshape.",
      "Tap the side of the index finger against your chin once or twice.",
    ],
    tips: [
      "The W is for water and the chin is where you drink. Keep both in place.",
      "Three fingers up. Four is the number 4.",
    ],
  },
  milk: {
    category: "Food & Drink",
    summary: "MILK squeezes a fist open and closed in front of the body, like milking a cow.",
    steps: [
      "Hold a loose fist in front of you at chest height.",
      "Open the hand partly and squeeze it back into a fist, twice.",
    ],
    tips: [
      "Same squeeze as ORANGE, but lower. ORANGE is at the chin.",
      "Keep the squeezes rhythmic rather than fast.",
    ],
  },
  apple: {
    category: "Food & Drink",
    summary: "APPLE presses the knuckle of a bent index finger into the cheek and twists it.",
    steps: [
      "Bend your index finger into an X with the rest of the hand closed.",
      "Press the knuckle into your cheek and twist the hand forward a quarter turn, once or twice.",
    ],
    tips: [
      "The knuckle, not the fingertip, touches the cheek.",
      "FRUIT uses the same place and movement with an F handshape.",
    ],
  },
  fruit: {
    category: "Food & Drink",
    summary: "FRUIT twists an F handshape against the cheek, the same place and movement as APPLE.",
    steps: [
      "Touch your index finger and thumb together with the other three fingers up, an F handshape.",
      "Touch the F to your cheek and twist it forward a quarter turn, once or twice.",
    ],
    tips: [
      "APPLE is the same sign with a bent index finger instead of an F.",
      "Keep the three raised fingers spread so the F is readable.",
    ],
  },
  bread: {
    category: "Food & Drink",
    summary: "BREAD slices the edge of a bent hand down the back of the other hand several times, like cutting a loaf.",
    steps: [
      "Hold your non-dominant hand flat in front of you with the palm facing you.",
      "Bend your dominant hand and draw its fingertips down the back of the non-dominant hand two or three times.",
    ],
    tips: [
      "The slices move slightly along the hand each time, like cutting several pieces.",
      "Keep the non-dominant hand still. It is the loaf.",
    ],
  },
  cookie: {
    category: "Food & Drink",
    summary: "COOKIE presses a clawed hand onto the flat palm of the other hand and twists it, like a cookie cutter.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing up.",
      "Bend your dominant hand into a claw, press the fingertips onto the palm, lift, twist a quarter turn, and press again.",
    ],
    tips: [
      "Lift between presses. The twist happens in the air, not on the palm.",
      "Two presses is standard.",
    ],
  },
  soda: {
    category: "Food & Drink",
    summary: "SODA pushes the bent middle finger into the top of a closed fist, then slaps a flat hand down on it, like popping a bottle cap.",
    steps: [
      "Make a loose fist with your non-dominant hand, thumb side up, like the neck of a bottle.",
      "Bend your dominant middle finger and poke it into the top of the fist.",
      "Open the dominant hand flat and slap it down on top of the fist.",
    ],
    tips: [
      "Both parts matter: the poke and the slap. Either one alone is a different sign.",
      "Also used for POP and SODA POP depending on the region.",
    ],
    aka: ["Pop"],
  },
  coffee: {
    category: "Food & Drink",
    summary: "COFFEE grinds one fist on top of the other in small circles, like turning an old coffee mill.",
    steps: [
      "Make two fists and stack the dominant one on top of the non-dominant one.",
      "Move the top fist in small circles while the bottom one stays still.",
    ],
    tips: [
      "Only the top hand moves. The bottom fist is the base of the grinder.",
      "Two or three circles is enough.",
    ],
  },
  breakfast: {
    category: "Food & Drink",
    summary: "BREAKFAST is a compound: EAT, tapping a flattened O at the mouth, followed by MORNING, a flat hand rising in the crook of the arm.",
    steps: [
      "Tap a flattened O handshape to your lips for EAT.",
      "Rest your dominant elbow on your non-dominant arm and raise the flat hand, palm up, for MORNING.",
    ],
    tips: [
      "Compounds are signed quickly, with the two parts blending into one motion.",
      "Some signers use an initialized B handshape at the mouth instead. The clip shows the version Signpost teaches.",
    ],
  },
  lunch: {
    category: "Food & Drink",
    summary: "LUNCH is a compound: EAT at the mouth, then NOON, with the forearm held straight up on the back of the other hand.",
    steps: [
      "Tap a flattened O handshape to your lips for EAT.",
      "Hold your non-dominant arm flat and stand your dominant forearm straight up on the back of that hand, palm forward, for NOON.",
    ],
    tips: [
      "NOON is the sun straight overhead. Keep the forearm vertical.",
      "An initialized L at the mouth is a common shortcut you will also see.",
    ],
  },
  dinner: {
    category: "Food & Drink",
    summary: "DINNER is a compound: EAT at the mouth, then NIGHT, with a bent hand draped over the edge of the other hand.",
    steps: [
      "Tap a flattened O handshape to your lips for EAT.",
      "Hold your non-dominant arm flat and drape your bent dominant hand over its edge, fingers down, for NIGHT.",
    ],
    tips: [
      "The three meals share the EAT part and differ only in the time of day that follows.",
      "An initialized D at the mouth is a common regional shortcut.",
    ],
    aka: ["Supper"],
  },
  hungry: {
    category: "Food & Drink",
    summary: "HUNGRY draws a C handshape down the center of the chest, from the throat toward the stomach.",
    steps: [
      "Shape your dominant hand into a C and place it at the base of your throat, palm toward you.",
      "Draw it straight down the chest a few inches, once.",
    ],
    tips: [
      "One downward stroke is HUNGRY. Repeating it quickly shifts the meaning toward WISH or CRAVE.",
      "Keep the C open so the shape reads as a passage for food.",
    ],
  },
  thirsty: {
    category: "Food & Drink",
    summary: "THIRSTY traces the index finger down the front of the throat.",
    steps: [
      "Point your index finger and touch it just under your chin.",
      "Draw it straight down the throat toward your collarbone.",
    ],
    tips: [
      "Tilt your head back slightly and the sign reads more clearly.",
      "One stroke down. It is the dry throat, not a cut.",
    ],
  },
  delicious: {
    category: "Food & Drink",
    summary: "DELICIOUS touches the bent middle finger to the lips and then twists the hand away.",
    steps: [
      "Extend an open hand with the middle finger bent slightly forward.",
      "Touch the middle fingertip to your lips, then move the hand forward and twist it outward.",
    ],
    tips: [
      "A pleased face is expected. It is hard to sign DELICIOUS convincingly without one.",
      "Keep the twist small and quick.",
    ],
    aka: ["Tasty"],
  },
  head: {
    category: "Body & Health",
    summary: "HEAD touches the fingertips of a bent hand to the temple and then to the jaw, framing the side of the head.",
    steps: [
      "Bend your dominant hand so the fingertips point toward your head.",
      "Touch the fingertips to your temple, then move down and touch them to your jaw.",
    ],
    tips: [
      "Two touches, top then bottom, on the same side of the head.",
      "A single tap on the forehead is a different sign.",
    ],
  },
  eye: {
    category: "Body & Health",
    summary: "EYE points the index finger at the eye.",
    steps: [
      "Point your index finger and bring it up just below one eye.",
      "Point to the eye, or tap just under it, without touching the eye itself.",
    ],
    tips: [
      "Pointing to both eyes in turn makes it EYES.",
      "The same handshape moving outward from the eyes is SEE or LOOK.",
    ],
  },
  ear: {
    category: "Body & Health",
    summary: "EAR pinches or touches the earlobe with the index finger and thumb.",
    steps: [
      "Bring your index finger and thumb to your earlobe.",
      "Pinch or tug the lobe gently.",
    ],
    tips: [
      "Touching the ear with a pointed index finger instead means HEAR.",
      "One quick pinch is enough.",
    ],
  },
  hair: {
    category: "Body & Health",
    summary: "HAIR pinches a strand of hair between the thumb and index finger.",
    steps: [
      "Pinch a bit of your hair, near the front, between your thumb and index finger.",
      "Hold or tug it very slightly.",
    ],
    tips: [
      "Pointing at the hair without pinching is more often read as HEAD.",
      "Shaking the pinch slightly is fine and does not change the meaning.",
    ],
  },
  stomach: {
    category: "Body & Health",
    summary: "STOMACH pats a flat hand against the stomach.",
    steps: [
      "Hold your dominant hand flat with the palm toward you.",
      "Pat your stomach once or twice.",
    ],
    tips: [
      "Add a pained face and it becomes STOMACHACHE.",
      "A pat on the chest instead is a different sign, so keep it low.",
    ],
    aka: ["Belly"],
  },
  heart: {
    category: "Body & Health",
    summary: "HEART taps the bent middle finger over the heart, and some signers trace a heart shape on the chest instead.",
    steps: [
      "Extend an open hand with the middle finger bent slightly forward.",
      "Tap the middle fingertip on your chest over the heart, once or twice.",
    ],
    tips: [
      "Tracing a heart shape with both index fingers is the other common version.",
      "LOVE is different: two crossed fists held on the chest.",
    ],
  },
  fever: {
    category: "Body & Health",
    summary: "FEVER places the back of a flat hand against the forehead, the way you check someone's temperature.",
    steps: [
      "Hold your dominant hand flat.",
      "Touch the back of the hand to your forehead and hold for a moment.",
    ],
    tips: [
      "Another version runs the dominant index finger up and down the non-dominant index finger, like a thermometer. The clip shows which one Signpost uses.",
      "A slightly ill expression completes the sign.",
    ],
    aka: ["Temperature"],
  },
  hospital: {
    category: "Body & Health",
    summary: "HOSPITAL draws a small cross on the upper arm with an H handshape.",
    steps: [
      "Extend your index and middle fingers together in an H handshape.",
      "Draw a short vertical line on your upper arm, then a short horizontal line across it.",
    ],
    tips: [
      "The cross is the medical symbol. The H is for hospital.",
      "Keep the two strokes small and on the same spot of the arm.",
    ],
  },
  emergency: {
    category: "Body & Health",
    summary: "EMERGENCY shakes an E handshape held up in front of the body.",
    steps: [
      "Curl your fingers down so the fingertips rest on the thumb, forming an E.",
      "Hold the hand up at shoulder height and shake it quickly side to side.",
    ],
    tips: [
      "Urgency shows in the face and the speed of the shake.",
      "Keep the E tight so it does not loosen into a C as it moves.",
    ],
  },
  tall: {
    category: "Describing People & Things",
    summary: "TALL slides the index finger up the flat palm of the other hand, from the base to above the fingertips.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing forward and fingers pointing up.",
      "Place your dominant index finger at the base of that palm and slide it up past the fingertips.",
    ],
    tips: [
      "How far the finger travels shows how tall. Going well past the fingertips means VERY TALL.",
      "For a person, some signers simply raise a flat hand to show the height.",
    ],
  },
  short: {
    category: "Describing People & Things",
    summary: "SHORT, for height, lowers a flat hand with the palm down. For length or time, two H handshapes rub against each other.",
    steps: [
      "For a short person or thing, hold a flat hand palm down at chest height and lower it a few inches.",
      "For a short length or a short time, rest a dominant H handshape on top of a non-dominant H and slide it back and forth.",
    ],
    tips: [
      "Check the clip to see which meaning this lesson covers.",
      "The height version pairs with raised shoulders or a slight squint for emphasis.",
    ],
  },
  beautiful: {
    category: "Describing People & Things",
    summary: "BEAUTIFUL circles an open hand around the face, closes it to a flattened O at the chin, and opens it again.",
    steps: [
      "Hold an open hand in front of your face, fingers spread, palm toward you.",
      "Circle it once around your face, closing the fingers toward the thumb as it comes down to the chin.",
      "Open the hand outward as it leaves the chin.",
    ],
    tips: [
      "A pleased expression is part of the sign.",
      "PRETTY is the same movement done smaller and faster.",
    ],
    aka: ["Pretty"],
  },
  handsome: {
    category: "Describing People & Things",
    summary: "HANDSOME circles an open hand in front of the face, and many signers simply sign LOOK GOOD instead.",
    steps: [
      "Watch the reference clip and copy the handshape and path around the face exactly.",
      "If in doubt, sign LOOK followed by GOOD, which is always understood.",
    ],
    tips: [
      "Regional variation is real here. Match the signers around you.",
      "Keep the hand near the face, where appearance signs live.",
    ],
  },
  old: {
    category: "Describing People & Things",
    summary: "OLD grips an imaginary beard at the chin with a C or S handshape and pulls it down.",
    steps: [
      "Shape your dominant hand into a loose C or fist just under your chin.",
      "Pull the hand straight down a few inches, as if stroking a long beard.",
    ],
    tips: [
      "A longer pull means OLDER or VERY OLD.",
      "With a questioning face and raised eyebrows it asks HOW OLD?",
    ],
    aka: ["Age"],
  },
  hot: {
    category: "Weather",
    summary: "HOT holds a clawed hand at the mouth and flips it quickly away and down, like spitting out food that burned your tongue.",
    steps: [
      "Bend your dominant hand into a claw and hold it in front of your mouth, palm toward you.",
      "Turn the hand sharply away and down in one quick motion.",
    ],
    tips: [
      "Speed is the sign. A slow version reads as WARM or as a different movement.",
      "A tight, strained face finishes the picture.",
    ],
  },
  warm: {
    category: "Weather",
    summary: "WARM opens a flattened O slowly upward from the mouth, like warm breath rising.",
    steps: [
      "Bring your fingertips and thumb together into a flattened O and hold it at your mouth.",
      "Open the hand slowly while moving it up and slightly forward.",
    ],
    tips: [
      "Slow is the point. The same shape flipped away fast is HOT.",
      "Keep the opening gentle, like letting out a warm breath.",
    ],
  },
  boss: {
    category: "Work & Travel",
    summary: "BOSS taps a clawed hand on the shoulder, like a pair of epaulettes.",
    steps: [
      "Bend your dominant hand into a claw.",
      "Tap the fingertips on the top of your opposite shoulder, once or twice.",
    ],
    tips: [
      "The same sign also means CAPTAIN or CHIEF. Context decides.",
      "Keep the fingers clawed. A flat hand on the shoulder is a different sign.",
    ],
    aka: ["Captain", "Chief"],
  },
  police: {
    category: "Work & Travel",
    summary: "POLICE taps a modified C handshape on the left side of the chest, where a badge would sit.",
    steps: [
      "Shape your dominant hand into a C, with the thumb and index finger slightly bent.",
      "Tap it against the upper left side of your chest, once or twice.",
    ],
    tips: [
      "The C stands in for the badge. Keep it on the chest, not the shoulder.",
      "Also used for COP and OFFICER.",
    ],
    aka: ["Cop", "Officer"],
  },
  hire: {
    category: "Work & Travel",
    summary: "HIRE sweeps a flat hand, palm up, in toward the body, inviting someone in.",
    steps: [
      "Hold your dominant hand flat and out to the side, palm facing up.",
      "Sweep it in toward your body in a smooth arc.",
    ],
    tips: [
      "The same movement means INVITE and WELCOME. Context carries HIRE.",
      "Keep the palm up throughout the sweep.",
    ],
    aka: ["Invite", "Welcome"],
  },
  library: {
    category: "Work & Travel",
    summary: "LIBRARY makes a small circle in the air with an L handshape.",
    steps: [
      "Extend your index finger and thumb at a right angle, an L handshape.",
      "Hold it in front of you, palm facing forward, and move it in a small circle.",
    ],
    tips: [
      "Keep the L square. A collapsed angle reads as a bent index finger.",
      "One or two small circles is enough.",
    ],
  },
  airplane: {
    category: "Work & Travel",
    summary: "AIRPLANE extends the thumb, index, and little finger and moves the hand forward and upward like a plane taking off.",
    steps: [
      "Extend your thumb, index finger, and little finger with the middle and ring fingers folded down.",
      "Hold the hand palm down and move it forward and slightly up in a short glide.",
    ],
    tips: [
      "Two short glides is AIRPLANE. One long glide is FLY or FLIGHT.",
      "The handshape looks like I LOVE YOU with the index finger tilted forward as the nose of the plane.",
    ],
    aka: ["Plane"],
  },
  luggage: {
    category: "Work & Travel",
    summary: "LUGGAGE grips an imaginary suitcase handle with a fist and gives it a small lift and drop.",
    steps: [
      "Make a fist with your dominant hand and hold it down by your side, as if carrying a suitcase.",
      "Lift it slightly and let it drop, once or twice.",
    ],
    tips: [
      "Keep the arm down. Lifting the fist to chest height changes the sign.",
      "Also used for SUITCASE and BAGGAGE.",
    ],
    aka: ["Suitcase", "Baggage"],
  },
  sun: {
    category: "Weather",
    summary: "SUN draws a small circle in the air above the head, then opens the fingers downward like rays of light.",
    steps: [
      "Point your index finger up and to the side of your head and draw a small circle in the air.",
      "Open the hand and bring it down with the fingers spread, as rays shining down.",
    ],
    tips: [
      "Some signers skip the circle and only do the rays. Both are understood.",
      "Keep the circle up high, where the sun would be.",
    ],
  },
  summer: {
    category: "Weather",
    summary: "SUMMER wipes a bent index finger across the forehead, like wiping away sweat.",
    steps: [
      "Point your index finger and place it on one side of your forehead.",
      "Drag it across the forehead to the other side while bending it into an X.",
    ],
    tips: [
      "The bend at the end is what separates SUMMER from BLACK, which keeps the finger straight.",
      "Add a hot, tired face and the sign is unmistakable.",
    ],
  },
  work: {
    category: "Actions",
    summary: "WORK taps the wrist of one fist on the back of the other fist, twice.",
    steps: [
      "Make two fists and hold the non-dominant one still in front of you, palm down.",
      "Tap the heel of your dominant fist on the back of the non-dominant wrist, twice.",
    ],
    tips: [
      "Keep the bottom fist still. All the movement is in the top hand.",
      "Repeated tapping that goes on and on means WORKING or KEEP WORKING.",
    ],
    aka: ["Job"],
  },
  study: {
    category: "Actions",
    summary: "STUDY wiggles the fingers of an open hand toward the flat palm of the other hand, like eyes scanning a page.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing up.",
      "Hold your dominant hand above it with the fingers spread, and wiggle the fingers while moving the hand slightly toward the palm.",
    ],
    tips: [
      "The wiggling fingers are the studying. Keep them loose.",
      "Without the wiggle, the same movement is a different sign.",
    ],
  },
  go: {
    category: "Actions",
    summary: "GO points both index fingers and moves them away from the body in the direction you are going.",
    steps: [
      "Point both index fingers up, one slightly in front of the other.",
      "Flick them forward and down together, away from your body.",
    ],
    tips: [
      "Direction is grammar. Point toward the place you are going.",
      "One hand alone works for a quick GO or LEAVE.",
    ],
  },
  come: {
    category: "Actions",
    summary: "COME points both index fingers away from the body and beckons them in toward yourself.",
    steps: [
      "Point both index fingers out in front of you.",
      "Curl them in toward your body in a beckoning motion.",
    ],
    tips: [
      "It is the mirror of GO. Toward you is COME, away is GO.",
      "A single hand beckoning is a casual COME HERE.",
    ],
  },
  walk: {
    category: "Actions",
    summary: "WALK moves two flat hands forward alternately, palms down, like feet taking steps.",
    steps: [
      "Hold both hands flat in front of you with the palms facing down.",
      "Move them forward one at a time, as if each hand is a foot stepping.",
    ],
    tips: [
      "Speed and size of the steps show how you walked. Slow and heavy, quick and light.",
      "Keep the palms down. Palms facing each other is a different sign.",
    ],
  },
  drive: {
    category: "Actions",
    summary: "DRIVE grips an imaginary steering wheel with two fists and turns it back and forth with a forward motion.",
    steps: [
      "Make two fists and hold them in front of you at wheel height.",
      "Turn the wheel back and forth while moving the hands slightly forward.",
    ],
    tips: [
      "The forward motion is what makes it the verb DRIVE instead of the noun CAR.",
      "Keep both fists on the wheel throughout.",
    ],
  },
  run: {
    category: "Actions",
    summary: "RUN hooks the index finger of one L handshape around the thumb of the other and moves both hands forward with a quick flicking motion.",
    steps: [
      "Make an L with each hand, palms facing each other, and hook your dominant index finger around the non-dominant thumb.",
      "Move both hands forward together while flicking the index fingers and thumbs.",
    ],
    tips: [
      "The flicking is the running. Without it, the sign reads as a different motion.",
      "Faster flicking shows faster running.",
    ],
  },
  read: {
    category: "Actions",
    summary: "READ moves a V handshape down the flat palm of the other hand, like eyes scanning lines on a page.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing you, like a page.",
      "Make a V with your dominant index and middle fingers, point it at the palm, and move it down the page.",
    ],
    tips: [
      "The two fingers are your eyes. Point them at the page the whole time.",
      "Moving back and forth across the palm instead means reading line by line.",
    ],
  },
  write: {
    category: "Actions",
    summary: "WRITE pinches the thumb and index finger together and moves them across the flat palm of the other hand, like holding a pen.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing up, as the paper.",
      "Pinch your dominant thumb and index finger together and move them across the palm in a short writing motion.",
    ],
    tips: [
      "A single stroke is WRITE. Repeated scribbling is WRITING or a long piece of writing.",
      "Keep the pinch tight so it reads as a pen.",
    ],
  },
  draw: {
    category: "Actions",
    summary: "DRAW traces the little finger of an I handshape down the flat palm of the other hand in a wavy line.",
    steps: [
      "Hold your non-dominant hand flat with the palm facing sideways or up.",
      "Extend your dominant little finger and trace a small wavy line down the palm.",
    ],
    tips: [
      "The little finger is the pencil. Keep the rest of the hand closed.",
      "The same sign means ART with a slightly longer stroke.",
    ],
    aka: ["Art"],
  },
};
