// ═══════════════════════════════════════════════════════════════════════════════
// WORD POOLS - Organized by function, with themed bonuses
// Themed entries appear 3x more often when matching ghost themes are active
// ═══════════════════════════════════════════════════════════════════════════════

export const WORD_POOLS = {

  // ═══════════════════════════════════════════════════════════════════════════
  // NOUNS & THINGS
  // ═══════════════════════════════════════════════════════════════════════════

  pathetic_nouns: {
    base: [
      // Food/consumables
      "gas station sushi",
      "airport birthday cake",
      "a hotel & conference center breakfast buffet",
      "the last donut nobody wanted",
      "a Costco sample on an empty stomach",
      "vending machine dinner",
      "lukewarm pizza at a work meeting",
      // Objects
      "a participation trophy",
      "a 'hang in there' poster in a foreclosure",
      "a LinkedIn motivational post",
      "a standing desk nobody uses",
      "a motivational calendar in December",
      "a self-help book with a cracked spine on page 3",
      "an 'I voted' sticker three weeks later",
      "a company values poster",
      "a gym membership in February",
      "a New Year's resolution on January 3rd",
      // Events/situations
      "a company pizza party during layoffs",
      "an office birthday card signed 'from everyone'",
      "a group project carried by one person",
      "a mandatory fun event",
      "a WebMD diagnosis at 3am",
      "a 'We Need to Talk' text",
      "a GoFundMe with $0 raised",
      "a corporate retreat trust fall",
      "a printer jam during a deadline",
      // Communications
      "a 'per my last email' opener",
      "a cover letter that starts with 'To Whom It May Concern'",
      "a passive-aggressive Post-it note",
      "a 'let's circle back' email",
      "a 'you up?' text at 2am",
      "a read receipt with no reply",
      "an unread terms and conditions page",
      "a spam folder"
    ],
    themed: {
      crypto: [
        "a WAGMI tattoo in 2024",
        "an NFT of a screenshot",
        "a Discord announcement that starts with 'gm'",
        "a Bored Ape you can't sell",
        "a crypto wallet with $0.47",
        "a rug pull announcement",
        "a whitepaper nobody read"
      ],
      influencer: [
        "a sponsored post with 3 likes",
        "a 'link in bio' with a broken link",
        "an unboxing video nobody asked for",
        "a ring light in a studio apartment",
        "a TikTok with 12 views from yourself",
        "a collab request in the DMs"
      ],
      boomer: [
        "a chain email about Facebook privacy",
        "a minion meme about wine",
        "a Facebook status meant for Google",
        "a printed-out MapQuest direction",
        "an AOL email address on a resume"
      ],
      mlm: [
        "a 'hey hun!' cold DM",
        "a garage full of unsold inventory",
        "a downline with zero members",
        "a pyramid diagram you insist isn't a pyramid"
      ],
      corporate: [
        "a synergy meeting",
        "a 360 review nobody wanted",
        "a foosball table in a dying startup",
        "a 'culture fit' rejection letter"
      ],
      fitness: [
        "a CrossFit explanation nobody asked for",
        "a protein shake that costs $14",
        "a Peloton collecting dust",
        "a 5K participation medal worn unironically"
      ]
    }
  },

  mild_insults: {
    base: [
      "mid", "basic", "forgettable", "a disappointment", "background noise",
      "beige", "a filler episode", "elevator music", "clipart", "hold music",
      "a loading screen", "a system update nobody asked for", "a placeholder",
      "a rough draft", "a B-plot", "a tutorial level", "off-brand",
      "the store brand version", "a consolation prize", "a Monday",
      "an afterthought", "a footnote", "the fine print", "a side quest nobody finishes",
      "a deleted scene", "the B-side", "a rough estimate", "a placeholder name",
      "a test account", "a demo version", "a free trial that expired"
    ],
    themed: {
      crypto: ["a rug pull", "a dead coin", "an abandoned Discord", "exit liquidity"],
      influencer: ["a shadowbanned account", "a dead channel", "a demonetized video"],
      corporate: ["a rejected expense report", "a skipped promotion", "a redundancy"]
    }
  },

  bad_things: {
    base: [
      "a participation trophy", "airport food", "a group project",
      "a terms of service agreement", "a check engine light",
      "a password you forgot", "a Monday", "a 3am WebMD spiral",
      "a Zoom call that could've been an email", "a delayed flight",
      "a read receipt with no reply", "a timeshare presentation",
      "gas station sushi", "a software update", "a pop-up ad",
      "a captcha", "buffering", "a printer at 4:59pm",
      "an expired coupon", "a parking ticket", "dial-up internet",
      "a voicemail from an unknown number", "a mandatory training video",
      "the terms and conditions checkbox", "a reply-all accident"
    ],
    themed: {
      crypto: ["a rug pull", "a dead NFT", "a failed mint", "gas fees"],
      corporate: ["a performance review", "a reorg", "an all-hands meeting"]
    }
  },

  abstract_concepts: {
    base: [
      "disappointment", "a declined transaction", "an awkward pause",
      "buyer's remorse", "a mandatory meeting", "a rejected application",
      "a lag spike", "buffering", "a 2-star review", "elevator silence",
      "a 'seen' notification with no reply", "a missed connection",
      "the spinning wheel of death", "a busy signal",
      "a voicemail nobody checks", "Sunday scaries",
      "the feeling of forgetting something", "secondhand embarrassment",
      "a typo you notice after hitting send", "regret",
      "the unsubscribe link you can't find", "an error 404"
    ],
    themed: {
      crypto: ["a failed transaction", "a gas fee", "a rejected swap"],
      corporate: ["a reorg", "a pivot", "a 'quick sync' that takes an hour"]
    }
  },

  normal_things: {
    base: [
      "making eye contact", "a handshake", "small talk", "drinking water",
      "sitting in silence", "existing in public", "having an opinion",
      "asking a question", "being in a photo", "entering a room",
      "sending an email", "having a hobby", "owning a plant",
      "checking the time", "having a morning routine"
    ],
    themed: {}
  },

  important_things: {
    base: [
      "your own time", "other people's feelings", "basic hygiene",
      "deadlines", "promises", "red flags", "the group chat",
      "common sense", "personal space", "boundaries",
      "the assignment", "context", "reading the room"
    ],
    themed: {}
  },

  worthless_things: {
    base: [
      "a suggestion box", "a YouTube comment", "a terms of service",
      "an unsubscribe link", "a privacy policy", "a captcha",
      "a 'your call is important to us' message", "fine print",
      "a weather app prediction", "a fortune cookie fortune"
    ],
    themed: {}
  },

  categories: {
    base: [
      "font", "weather pattern", "kitchen appliance", "notification sound",
      "search result", "email", "password", "file type", "error message",
      "time zone", "software update", "WiFi connection", "side character",
      "browser tab", "podcast episode", "playlist", "snack"
    ],
    themed: {}
  },

  worst_examples: {
    base: [
      "Comic Sans at a funeral",
      "drizzle during a picnic",
      "the toaster that only burns one side",
      "the one that makes everyone hit mute",
      "page 47 of Google results",
      "a reply-all about lunch",
      "the one everybody forgets immediately",
      ".tmp",
      "Error: Success",
      "the one nobody's in",
      "a 47-hour download",
      "the one with one bar",
      "the one who dies in the cold open",
      "the one playing audio you can't find",
      "the one that's 4 hours and has no chapters",
      "just 'Chill Vibes' on repeat",
      "the one that's been in the break room since 2019"
    ],
    themed: {}
  },

  affected_things: {
    base: [
      "HR", "your therapist", "the algorithm", "your credit score",
      "everyone in the group chat", "the vibe", "future generations",
      "that one friend who defends you", "your potential",
      "the concept of second chances", "your high school guidance counselor"
    ],
    themed: {}
  },

  resulting_problems: {
    base: [
      "a file on you", "anxiety now", "a no-contact policy",
      "a meeting about meetings", "a backup plan for you specifically",
      "a new policy because of you", "a warning label",
      "a dedicated FAQ section", "trust issues", "low expectations"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PEOPLE & ENTITIES
  // ═══════════════════════════════════════════════════════════════════════════

  disappointed_callers: {
    base: [
      "The early 2000s", "Your potential", "Rock bottom",
      "The bare minimum", "Everyone you went to high school with",
      "Your parents' expectations", "The algorithm", "Mediocrity",
      "The void", "Your therapist's therapist", "Your New Year's resolutions",
      "Your childhood dreams", "Your credit score",
      "The last person who believed in you", "Your abandoned hobbies",
      "Everyone who ghosted you", "The participation trophy committee",
      "Your gym membership", "Common sense", "Basic decency"
    ],
    themed: {
      crypto: ["Your seed phrase", "The blockchain", "Your paper hands", "Satoshi"],
      influencer: ["Your dead channel", "The algorithm", "Your ring light", "Your 12 followers"],
      boomer: ["1985", "Your lawn", "Respect for authority", "Cursive writing"],
      mlm: ["Your upline", "Your garage full of product", "Your former friends"]
    }
  },

  disappointed_entities: {
    base: [
      "your potential", "your childhood self", "everyone who believed in you",
      "your parents' expectations", "the algorithm", "your future self",
      "whoever designed you", "your therapist", "the universe",
      "probability itself", "your high school guidance counselor",
      "your resume", "your New Year's resolution", "your gym membership",
      "everyone at the reunion", "your dating profile", "the simulation",
      "your horoscope", "your birth chart", "karma"
    ],
    themed: {
      crypto: ["your wallet", "your seed phrase", "satoshi's vision"],
      influencer: ["your analytics", "the algorithm", "your ring light"],
      boomer: ["your lawn", "the American dream", "hard work"],
      mlm: ["your upline", "your garage", "the founders"]
    }
  },

  sad_people: {
    base: [
      "a mall Santa in January",
      "a party clown at a divorce announcement",
      "the last person at the open bar",
      "someone crying in a Denny's at 3am",
      "a mascot who's been on break for too long",
      "the DJ at an empty club",
      "a magician at a corporate event",
      "someone eating cake alone on their birthday",
      "the guy still at the party after the lights come on",
      "a life coach who lives with their parents",
      "a motivational speaker at a layoff",
      "the intern who accidentally hit reply-all"
    ],
    themed: {
      crypto: ["a crypto bro explaining the dip", "someone checking their portfolio at 3am"],
      influencer: ["an influencer with no engagement", "someone filming a TikTok alone"],
      mlm: ["someone giving an MLM pitch to family", "a hun at an empty 'party'"]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PLACES & MOMENTS
  // ═══════════════════════════════════════════════════════════════════════════

  sad_places: {
    base: [
      "a closed Toys R Us",
      "a hotel & conference center on a Sunday",
      "a Chuck E. Cheese during a custody handoff",
      "a gas station at 2am",
      "a Greyhound station at dawn",
      "a hospital cafeteria",
      "the DMV on your birthday",
      "a timeshare presentation",
      "an airport Chili's",
      "a middle school dance",
      "the break room during layoffs",
      "a networking event with bad wine",
      "the parking lot after a funeral",
      "a mall food court at closing time"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTIONS & VERBS
  // ═══════════════════════════════════════════════════════════════════════════

  verbs_done_badly: {
    base: [
      "exist", "make eye contact", "enter a room", "tell stories",
      "give compliments", "make decisions", "apologize", "celebrate",
      "network", "dress", "age", "dance", "email", "vacation",
      "handle success", "take criticism", "accept praise",
      "hold conversations", "make first impressions", "give advice",
      "take photos", "order at restaurants", "tip", "parallel park",
      "tell jokes", "give toasts", "RSVP", "maintain friendships",
      "set boundaries", "read the room", "take hints", "be normal"
    ],
    themed: {
      influencer: ["pose for photos", "caption things", "go viral"],
      fitness: ["stretch", "hydrate", "meal prep", "count reps"],
      corporate: ["delegate", "lead meetings", "give presentations", "network"]
    }
  },

  things_you_do: {
    base: [
      "speak", "enter a room", "share an opinion", "try to help",
      "make a decision", "give advice", "attempt humor",
      "take a photo", "send an email", "join a meeting",
      "make eye contact", "attempt small talk", "try to be relatable"
    ],
    themed: {}
  },

  disappointment_actions: {
    base: [
      "writing a strongly worded letter", "requesting a refund",
      "filing a complaint", "updating their LinkedIn",
      "considering other options", "pretending not to know you",
      "going to therapy about it", "writing a memoir",
      "starting over with someone else", "quietly giving up",
      "entering witness protection", "changing their number",
      "leaving the group chat", "unfollowing quietly",
      "moving without telling you", "rebranding",
      "seeking legal counsel", "holding an intervention",
      "scheduling a meeting about you", "creating a document"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ENERGY & VIBES
  // ═══════════════════════════════════════════════════════════════════════════

  energy_types: {
    base: [
      "reply-all apology", "third divorce", "unread LinkedIn message",
      "company icebreaker", "HR complaint waiting to happen",
      "mandatory sensitivity training", "potluck dish nobody touches",
      "group chat everyone muted", "middle seat on a long flight",
      "parking lot proposal", "gas station flowers on Valentine's Day",
      "a 2-star Uber rating", "open-plan office cougher", "expired Groupon",
      "last-minute plus-one", "coworker who heats up fish",
      "guy who brings a guitar to parties", "close-talker at networking events",
      "person who claps when planes land", "reply guy on every tweet",
      "person who says 'I don't watch TV'", "unsolicited advice at parties",
      "someone who loves Mondays unironically", "wet handshake",
      "calendar invite for 4:30 on Friday", "meeting with no agenda"
    ],
    themed: {
      crypto: ["Discord mod at 3am", "'gm' reply guy", "NFT profile pic at a funeral", "rugpull announcement"],
      influencer: ["unboxing video for tampons", "sponsored grief post", "collab request in the DMs"],
      boomer: ["Facebook comment section warrior", "chain email about hackers", "tech support caller who won't listen"],
      corporate: ["mandatory fun coordinator", "synergy meeting scheduler", "culture committee volunteer"],
      mlm: ["'hey hun' DM", "party you didn't know was a pitch", "Facebook live from your car"]
    }
  },

  specific_energies: {
    base: [
      "wet handshake", "reply-all accident", "conference room B",
      "team-building exercise", "mandatory overtime",
      "potluck nobody RSVP'd to", "LinkedIn recruiter message",
      "airport Chili's", "hotel & conference center",
      "performance review", "exit interview",
      "silent auction at a work event", "networking event name tag",
      "expense report rejection", "calendar invite at 4:55pm Friday",
      "meeting with no agenda", "voluntary survey",
      "open office floor plan", "hot desk policy",
      "icebreaker question", "trust fall", "anonymous feedback form"
    ],
    themed: {
      crypto: ["Discord pump-and-dump", "gm post at noon", "whitepaper nobody read"],
      influencer: ["collab DM", "sponsored #ad", "engagement pod comment"],
      corporate: ["synergy meeting", "pivot announcement", "rebranding workshop"]
    }
  },

  energy_specifics: {
    base: [
      "specifically the kind that makes everyone uncomfortable",
      "and not in a fun way", "and we've all talked about it",
      "and HR has a file", "and somehow you're proud of it",
      "and it's gotten worse", "and there's no fixing it",
      "and you don't even notice", "and the group chat has receipts",
      "and people take the stairs to avoid you",
      "and nobody knows how to tell you",
      "and you're the only one who doesn't see it",
      "and it's your whole brand now",
      "and there's documentation", "and even strangers notice",
      "and people screenshot it", "and your family has addressed it",
      "and even the dog is concerned", "and it's contagious"
    ],
    themed: {}
  },

  energy_consequences: {
    base: [
      "clears a room", "makes people take the stairs",
      "gets muted in the group chat", "makes HR nervous",
      "gets left on read", "inspires secondhand embarrassment",
      "makes people suddenly busy", "lowers property values",
      "ends conversations", "makes small talk feel like a hostage situation",
      "gets you seated near the bathroom", "triggers fight-or-flight",
      "makes strangers pretend to take calls",
      "gets you uninvited to things", "starts rumors",
      "becomes a warning to others", "gets mentioned in exit interviews",
      "makes people update their LinkedIn",
      "inspires passive-aggressive emails", "becomes a case study"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OBSERVATIONS & PUNCHLINES
  // ═══════════════════════════════════════════════════════════════════════════

  punchline_observations: {
    base: [
      "and everyone can tell", "and we've all noticed",
      "but somehow worse", "with less self-awareness",
      "but at least those have an expiration date",
      "and honestly it tracks", "but with more delusion",
      "and the vibes are immaculate... immaculately bad",
      "but even sadder somehow", "and your LinkedIn confirms it",
      "and that's being generous",
      "but somehow you made it your personality",
      "and it's not even endearing",
      "and nobody has the heart to tell you",
      "but less useful", "and we've all moved on",
      "and the algorithm agrees",
      "but at least those are self-aware",
      "and even that's aspirational",
      "but without the charm", "and it's on purpose apparently",
      "and there's photo evidence", "but louder"
    ],
    themed: {}
  },

  worse_somehow: {
    base: [
      "but without the payoff",
      "except it keeps happening",
      "but you're smiling through it",
      "and you think it's a good thing",
      "but you chose this",
      "and it's getting worse",
      "but you seem proud of it",
      "and there's no end in sight",
      "but you've made it a lifestyle"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRAITS & QUALITIES
  // ═══════════════════════════════════════════════════════════════════════════

  things_you_lack: {
    base: [
      "a purpose", "fans", "a Wikipedia page", "an arc",
      "character development", "a redemption chance", "brand consistency",
      "plausible deniability", "an excuse", "a tragic backstory",
      "closure", "a beginning, middle, and end", "a reason to exist",
      "a target audience", "meme potential", "nostalgic value",
      "a clear ending", "a lesson learned", "critical appreciation",
      "basic self-awareness", "a fan club", "defenders"
    ],
    themed: {}
  },

  positive_traits: {
    base: [
      "reliable", "consistent", "charming", "self-aware", "intentional",
      "endearing", "worthwhile", "memorable for the right reasons",
      "like a deliberate choice", "almost impressive", "respectable",
      "worth the effort", "like it has potential", "competent",
      "necessary", "reasonable", "forgivable", "at least honest",
      "kind of useful", "occasionally right", "trying their best"
    ],
    themed: {}
  },

  things_with_purpose: {
    base: [
      "a participation trophy tried",
      "a check engine light is useful",
      "elevator music sets a mood",
      "spam emails have a goal",
      "a broken clock is right twice a day",
      "a PowerPoint has structure",
      "a screensaver does something",
      "background music knows its place",
      "a loading screen ends eventually",
      "an error message is informative",
      "a 404 page has personality",
      "static is consistent",
      "a pop-up ad has targeting",
      "a captcha serves a purpose",
      "junk mail has optimism"
    ],
    themed: {}
  },

  purposeless_things: {
    base: [
      "there", "happening", "somehow still going",
      "a lot of effort for nothing",
      "proof that showing up isn't enough",
      "taking up space with confidence",
      "mid with better marketing", "a whole situation",
      "the 'before' photo that never got an 'after'",
      "content that should've stayed in drafts",
      "vibes without substance", "energy without direction",
      "chaos without charm", "noise without signal",
      "motion without progress", "presence without impact",
      "confidence without competence", "ambition without ability"
    ],
    themed: {}
  },

  delusions: {
    base: [
      "mysterious", "intimidating", "an old soul", "ahead of your time",
      "misunderstood", "a thought leader", "an acquired taste",
      "charmingly eccentric", "too real for people", "a visionary",
      "brutally honest", "an alpha", "a sigma", "the main character",
      "intimidatingly smart", "refreshingly blunt", "delightfully weird",
      "effortlessly cool", "naturally gifted", "built different",
      "not like other people", "an empath", "ahead of the curve"
    ],
    themed: {
      crypto: ["a visionary investor", "early to everything", "generational wealth incoming"],
      influencer: ["famous", "iconic", "a trendsetter", "going viral any day now"],
      fitness: ["disciplined", "elite", "a machine", "peak performance"],
      corporate: ["a leader", "management material", "C-suite bound", "a culture carrier"]
    }
  },

  harsh_realities: {
    base: [
      "just confusing", "just annoying", "just old", "just late",
      "just loud", "just wrong", "just too much", "just unemployable",
      "just allergic to self-awareness",
      "just the human equivalent of a buffering wheel",
      "just someone's cautionary tale",
      "just proof that confidence isn't everything",
      "just a lot", "just peak Dunning-Kruger",
      "just making everyone uncomfortable", "just a whole situation",
      "just deeply unwell", "just in everyone's way",
      "just aggressively average", "just confidently incorrect",
      "just exhausting to be around", "just a red flag in human form",
      "just the reason for the group chat",
      "just a lot of people's therapy topic"
    ],
    themed: {
      crypto: ["just down bad", "just exit liquidity", "just rugged", "just holding bags"],
      influencer: ["just shadowbanned", "just cringe", "just doing it for clout"],
      boomer: ["just out of touch", "just yelling at clouds", "just forwarding chain emails"],
      mlm: ["just the bottom of the pyramid", "just someone's downline", "just a hun"]
    }
  },

  personality_flaws: {
    base: [
      "anxiety", "desperation", "overconfidence", "insecurity",
      "main character syndrome", "terminal uniqueness",
      "weaponized incompetence", "aggressive mediocrity",
      "chronic people-pleasing", "performative chaos",
      "loud ignorance", "smug wrongness"
    ],
    themed: {}
  },

  disguises: {
    base: [
      "a trench coat", "a personality", "an aesthetic",
      "a carefully curated image", "a LinkedIn profile",
      "a series of hobbies", "several affirmations",
      "a mood board", "a vision statement"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BACKSTORIES & ORIGINS
  // ═══════════════════════════════════════════════════════════════════════════

  tragic_backstories: {
    base: [
      "peaked in a dream once", "was homeschooled by YouTube",
      "gets their personality from Netflix",
      "learned charisma from TED talks",
      "was raised by an algorithm",
      "thinks LinkedIn is a personality",
      "has never been anyone's first choice",
      "was told 'you tried' one too many times",
      "was the 'before' in a makeover show",
      "peaked during attendance", "has never finished a book",
      "still uses their college email", "has never been the favorite",
      "was the practice friend",
      "got participation trophies until adulthood",
      "treats therapy like a podcast",
      "learned social skills from anime", "was always picked last",
      "has never been tagged in a photo",
      "got their personality from a BuzzFeed quiz",
      "peaked at their own gender reveal",
      "learned flirting from memes", "was raised by cable news",
      "thinks podcast hosts are their friends",
      "has strong opinions about fonts",
      "learned boundaries from reality TV"
    ],
    themed: {
      crypto: [
        "bought Bitcoin at the top", "has 'crypto investor' in their bio",
        "explained blockchain at Thanksgiving",
        "lost it all on a coin named after a dog"
      ],
      influencer: [
        "has a ring light but no content",
        "has more followers than friends",
        "turned their personality into a brand",
        "calls themselves a 'creative'"
      ],
      boomer: [
        "still prints emails", "calls every console 'a Nintendo'",
        "discovered memes in 2019", "thinks WiFi is a type of radiation"
      ],
      mlm: [
        "called a pyramid scheme 'an opportunity'",
        "lost friends to a side hustle",
        "peaked at a conference in Orlando"
      ],
      fitness: [
        "made CrossFit their whole personality",
        "counts macros at funerals",
        "posts gym selfies during tragedies"
      ]
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIMING & PEAKS
  // ═══════════════════════════════════════════════════════════════════════════

  peak_moments: {
    base: [
      "in the womb", "during attendance", "in a dream once",
      "at your own birthday party (age 7)",
      "when someone mistook you for someone else",
      "during a participation trophy ceremony",
      "in a group project someone else carried",
      "at a talent show you didn't win",
      "when you had an excuse",
      "before the expectations kicked in",
      "the moment before anyone got to know you",
      "when you were hypothetical", "before you started talking",
      "in your LinkedIn headshot", "in your dating profile",
      "before the WiFi connected", "during the tutorial level",
      "at orientation", "before the second date",
      "at the open bar", "before people got to know you",
      "in your high school yearbook quote"
    ],
    themed: {
      crypto: ["before the crash", "during the mint", "before the rug", "at the ATH"],
      influencer: ["at 12 followers", "before the algorithm changed", "during a viral moment you couldn't replicate"],
      fitness: ["day one at the gym", "before the injury", "during a progress photo"]
    }
  },

  peak_commentary: {
    base: [
      "we all saw it happen", "there are witnesses",
      "it wasn't even impressive then", "we were being polite about it",
      "even that was a group effort", "the bar was already underground",
      "nobody wanted to say anything", "we thought it was a phase",
      "it's been documented", "it was still mid",
      "you've been dining out on it ever since",
      "somehow that was the highlight", "we assumed you'd improve",
      "that's the story you tell at parties",
      "we were being generous", "even then we had doubts",
      "the footage is rough", "we all remember it differently",
      "you made it your whole personality"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FAILURE & OUTCOMES
  // ═══════════════════════════════════════════════════════════════════════════

  things_that_fail: {
    base: [
      "a New Year's resolution", "a gym membership",
      "a situationship", "a rebrand", "potential", "a comeback",
      "a group project", "a participation trophy", "a self-help book",
      "a midlife crisis", "an overcorrection", "a second chance",
      "a fresh start", "a pivot", "a glow-up", "a redemption arc",
      "an apology tour", "a personal brand", "a side hustle",
      "a passion project", "a 5-year plan"
    ],
    themed: {
      crypto: ["a memecoin", "a whitepaper", "a roadmap", "a presale"],
      influencer: ["a collab", "a rebrand", "a comeback video", "a pivot to lifestyle"],
      mlm: ["a downline", "a party", "passive income dreams", "a recruitment pitch"]
    }
  },

  bad_outcomes: {
    base: [
      "left on read by the universe",
      "sent to voicemail by life",
      "archived and forgotten", "ghosted by success",
      "waitlisted by karma", "unsubscribed from potential",
      "flagged as spam by opportunity", "lost in transit",
      "returned to sender", "marked as 'no longer interested'",
      "soft-blocked by fate", "muted by the algorithm",
      "shadowbanned by reality", "unmatched by destiny",
      "declined by the universe", "bounced by karma",
      "filtered to junk by life", "rate-limited by progress"
    ],
    themed: {}
  },

  failure_types: {
    base: [
      "a case study in failure",
      "a masterclass in missing the point",
      "a monument to almost", "a tribute to 'good enough'",
      "a celebration of bare minimum",
      "an exhibition in 'could be worse'",
      "a living definition of mid",
      "a warning label in human form",
      "a live demonstration of potential wasted",
      "a museum of missed opportunities",
      "a memorial to mediocrity", "a gallery of bad decisions",
      "a retrospective of regret",
      "a permanent exhibit of almost",
      "a documentary waiting to happen",
      "a cautionary tale without a lesson"
    ],
    themed: {}
  },

  failure_elaborations: {
    base: [
      "with a gift shop", "and the reviews are in",
      "and it's somehow intentional",
      "and you're charging admission",
      "and you've made it a brand", "and there's a waitlist",
      "and it has a Wikipedia page", "and you're proud of it",
      "and somehow it's getting worse",
      "and nobody asked for a sequel",
      "and you've franchised it", "and it's touring nationally",
      "and there's merch", "and you've written a book about it",
      "and you're keynoting conferences about it",
      "and you've started a podcast",
      "and people subscribe to updates"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPARISONS & CONTRASTS
  // ═══════════════════════════════════════════════════════════════════════════

  things_they_want_back: {
    base: [
      "their disappointment acknowledged", "an apology",
      "those years back", "to be left out of this",
      "credit for doing more than you",
      "a refund on the energy spent",
      "you to stop claiming you know them",
      "their reputation back", "to file a complaint", "distance",
      "to be removed from your references",
      "less of whatever this is", "to know what happened", "closure",
      "to be disassociated", "their dignity back", "to press charges",
      "to be anonymous", "witness protection"
    ],
    themed: {}
  },

  wasted_potential: {
    base: [
      "someone's favorite", "a success story", "genuinely interesting",
      "a good influence", "low-maintenance", "self-aware",
      "the solution", "pleasant to be around", "a team player",
      "someone who reads the room", "emotionally available"
    ],
    themed: {}
  },

  chosen_disasters: {
    base: [
      "whatever this is", "the hard way", "to be a cautionary tale",
      "chaos as a lifestyle", "making it everyone's problem",
      "weaponized ignorance", "aggressive mediocrity",
      "being the villain of someone's therapy story",
      "main character syndrome", "the scenic route to failure"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPLIMENTS & TRUTHS
  // ═══════════════════════════════════════════════════════════════════════════

  sarcastic_compliments: {
    base: [
      "You're consistent", "People remember you",
      "You're confident", "You have a brand",
      "You're memorable", "You're honest", "You show up",
      "You're yourself", "You commit to bits",
      "You're not afraid to be yourself",
      "You're predictable", "You have energy",
      "You're authentic", "You're persistent",
      "You have presence", "You stand out",
      "You're unforgettable", "People talk about you",
      "You leave an impression"
    ],
    themed: {}
  },

  brutal_truths: {
    base: [
      "also that", "it's the same thing", "see above",
      "literally everything else", "everything that comes after",
      "the execution", "the self-awareness about it",
      "you think it's a compliment",
      "you've made it a personality",
      "you don't know when to stop", "it's intentional",
      "you're getting worse", "there's no arc",
      "you peaked at the opening", "you think you're different"
    ],
    themed: {}
  },

  inspirational_sayings: {
    base: [
      "everyone has potential", "it's never too late",
      "there's someone for everyone", "hard work pays off",
      "you miss 100% of the shots you don't take",
      "every expert was once a beginner",
      "confidence is key", "you can be anything you want",
      "authenticity is attractive", "there are no stupid questions",
      "everyone deserves a second chance",
      "growth is always possible", "the universe has a plan",
      "things happen for a reason", "it gets better",
      "persistence pays off", "you're exactly where you need to be",
      "everything is figureoutable"
    ],
    themed: {}
  },

  brutal_exceptions: {
    base: [
      "exceptions exist", "sometimes it is too late",
      "that's statistically optimistic", "trying isn't everything",
      "some shots should be missed",
      "some people peak at beginner",
      "you can have too much of a good thing",
      "limits exist for a reason",
      "being yourself isn't always the answer",
      "some questions should stay unasked",
      "some chances should be declined",
      "growth has a ceiling", "the universe makes mistakes",
      "some things happen for no reason",
      "it can get worse", "persistence can be a problem",
      "sometimes you're lost"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPERIENCES & SITUATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  unpleasant_experiences: {
    base: [
      "stepping on a wet spot wearing socks",
      "a phone call that could've been a text",
      "finding out the hard way",
      "a 'we need to talk' text",
      "realizing too late you were on mute",
      "accidentally liking a post from 2014",
      "a compliment that lands wrong",
      "being the only one who dressed up",
      "arriving to an empty surprise party",
      "a group project where you do everything",
      "realizing you're the backup friend"
    ],
    themed: {}
  },

  bad_options: {
    base: [
      "red flags", "dealbreakers", "obvious mistakes",
      "people who peaked in high school",
      "ideas that shouldn't have left the group chat",
      "things that could've been emails",
      "LinkedIn thought leaders", "reply guys",
      "people who say 'I'm just being honest'"
    ],
    themed: {}
  },

  worst_choices: {
    base: [
      "the one everyone warns you about",
      "the cautionary tale",
      "somehow still the worst option",
      "the 'before' picture that stayed",
      "the one they use as an example of what not to do",
      "the one the documentary is about",
      "a masterclass in why we have standards"
    ],
    themed: {}
  },

  red_flags: {
    base: [
      "a personality trait you're too proud of",
      "a warning sign you put on a t-shirt",
      "a red flag you waved enthusiastically",
      "a cautionary tale you tell at parties",
      "a dealbreaker you made your whole brand",
      "evidence in someone's future therapy",
      "a screenshot in a group chat"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONSEQUENCES & REACTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  cosmic_consequences: {
    base: [
      "therapist books another client",
      "resume gets moved to the 'no' pile",
      "potential dims slightly",
      "somewhere a guidance counselor sighs",
      "the algorithm deprioritizes you",
      "group chat screenshots happen",
      "vibes shift irreparably",
      "someone updates their boundaries",
      "HR opens a new folder",
      "the universe reconsiders your existence",
      "strangers exchange a knowing look"
    ],
    themed: {}
  },

  face_conclusions: {
    base: [
      "apologize less", "be making your exact face right now",
      "file a complaint about itself",
      "ask to speak to a manager", "still have more charisma",
      "wonder where it went wrong", "have better excuses",
      "at least have a reason", "write a memoir nobody reads",
      "somehow be less awkward", "start a podcast about it",
      "at least be brief", "have the decency to end",
      "know its place", "try harder than you"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION FORMAT POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  awkward_observations: {
    base: [
      "give off a weird vibe", "make people uncomfortable",
      "talk too loud in public", "have no inside voice",
      "stand too close", "overshare constantly",
      "laugh at your own jokes", "never read the room",
      "always have an opinion", "interrupt constantly",
      "make everything about you", "can't take a hint",
      "have a punchable energy", "try too hard",
      "make small talk unbearable", "drain the room"
    ],
    themed: {}
  },

  observation_punchlines: {
    base: [
      "they weren't kidding", "it's gotten worse",
      "we've all noticed", "the group chat agrees",
      "there's documentation", "HR knows",
      "it's on your permanent record", "the vibes are off",
      "everyone was being polite about it",
      "we were hoping you'd grow out of it",
      "it's affecting property values",
      "there's a betting pool", "we've discussed interventions",
      "it comes up at parties you're not invited to"
    ],
    themed: {}
  },

  things_that_exist: {
    base: [
      "everyone has that one friend who's a mess",
      "there's always one person who ruins the group photo",
      "some people just peaked too early",
      "certain people never outgrow being annoying",
      "there's a reason 'cringe' is a word",
      "some folks just can't help themselves",
      "every group has a cautionary tale",
      "someone has to be the example of what not to do",
      "not everyone can be interesting",
      "mediocrity needs representation too"
    ],
    themed: {}
  },

  reason_why: {
    base: [
      "the personification of it", "exhibit A",
      "the reason we can't have nice things",
      "patient zero", "the origin story",
      "the documentary subject", "the case study",
      "the before photo that never improved",
      "the inspiration behind the warning label",
      "the reason for the policy change",
      "why we have HR", "the learning experience",
      "the teachable moment nobody wanted"
    ],
    themed: {}
  },

  things_you_did: {
    base: [
      "you tried to tell that joke", "you danced at that wedding",
      "you gave that toast", "you sent that email",
      "you posted that photo", "you tried to network",
      "you went viral for the wrong reason",
      "you replied all by accident", "you tried karaoke",
      "you attempted flirting", "you gave advice",
      "you volunteered to speak first",
      "you wore that outfit", "you tried to be spontaneous"
    ],
    themed: {}
  },

  brutal_verdicts: {
    base: [
      "a moment we'd all like to forget",
      "the reason we stopped inviting you",
      "documented and discussed", "legendary (not in a good way)",
      "a core memory for the wrong reasons",
      "still being talked about", "worse than anyone admits",
      "the incident", "what we reference to describe rock bottom",
      "a warning to others", "a mistake we can't unsee",
      "peak cringe", "the content nobody asked for",
      "a fever dream we all witnessed"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIMILE BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  useless_things: {
    base: [
      "a screen door on a submarine", "a chocolate teapot",
      "sunglasses on a mole", "a solar-powered flashlight",
      "an ejection seat on a helicopter", "a fireproof match",
      "a waterproof towel", "a silent alarm",
      "training wheels on a unicycle", "a glass hammer",
      "a paper umbrella", "a concrete parachute",
      "an inflatable anchor", "a mesh water bottle",
      "a lead balloon", "brakes on a canoe"
    ],
    themed: {}
  },

  bad_situations: {
    base: [
      "a funeral", "a job interview", "a first date",
      "a hostage negotiation", "a fire drill",
      "an intervention", "a custody hearing",
      "a performance review", "a wedding toast",
      "an elevator pitch", "a crisis meeting",
      "an escape room", "a group project deadline",
      "a traffic stop", "an IRS audit"
    ],
    themed: {}
  },

  flat_things: {
    base: [
      "a dial tone", "a parking garage wall",
      "a loading screen", "dial-up internet sounds",
      "a voicemail greeting", "elevator music",
      "a screensaver", "the Windows XP shutdown sound",
      "a terms of service page", "hold music",
      "a CAPTCHA", "a cookie consent popup",
      "a software license agreement", "a privacy policy"
    ],
    themed: {}
  },

  oblivious_things: {
    base: [
      "a roomba heading for the stairs",
      "a GPS in a tunnel", "a smoke detector with dead batteries",
      "a tourist reading a map upside down",
      "someone on speakerphone in public",
      "a reply-all accident waiting to happen",
      "autocorrect", "a pop-up ad blocker getting blocked",
      "someone walking into a glass door",
      "a person who thinks they're on mute",
      "a fitness tracker on a couch potato",
      "a self-checkout that needs assistance"
    ],
    themed: {}
  },

  dull_things: {
    base: [
      "a DMV waiting room", "airport carpet",
      "a conference call about scheduling more calls",
      "beige wallpaper", "a pension plan brochure",
      "mandatory compliance training", "a TED talk about productivity",
      "someone explaining cryptocurrency",
      "a quarterly earnings report", "a vegan's dinner party stories",
      "a homeowner's association meeting",
      "a description of someone's dream"
    ],
    themed: {}
  },

  off_putting_things: {
    base: [
      "wet handshake energy", "a reply guy",
      "someone who stands too close",
      "an unsolicited LinkedIn connection",
      "a person who claps when planes land",
      "someone who says 'actually' too much",
      "a close talker at a networking event",
      "the person who brings a guitar to parties",
      "someone who describes themselves as 'brutally honest'",
      "a LinkedIn motivational post",
      "someone who starts sentences with 'I'm not racist, but'",
      "a cold call during dinner"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONDITIONAL BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  your_attributes: {
    base: [
      "personality", "presence", "energy", "opinions",
      "eye contact", "small talk", "humor", "confidence",
      "handshake", "laugh", "advice", "cooking",
      "dance moves", "fashion sense", "taste in music"
    ],
    themed: {}
  },

  pathetic_outcomes: {
    base: [
      "politely wound", "mildly inconvenience",
      "cause a slight headache", "give someone the ick",
      "make people zone out", "inspire a sigh",
      "trigger an eye roll", "prompt a polite excuse to leave",
      "make someone check their phone",
      "inspire a 'that's crazy' with no follow-up",
      "cause someone to suddenly remember an appointment",
      "result in a 'we should do this again sometime' (lie)"
    ],
    themed: {}
  },

  unwanted_experiences: {
    base: [
      "to feel vaguely uncomfortable", "to question my life choices",
      "to experience secondhand embarrassment", "to feel drained",
      "a headache", "to lose the will to live",
      "to feel my time being wasted", "to cringe",
      "to be disappointed", "to witness failure",
      "to experience regret", "to feel nothing"
    ],
    themed: {}
  },

  how_to_suffer: {
    base: [
      "stare at a loading screen", "attend a timeshare presentation",
      "sit through a slideshow of someone's vacation photos",
      "read the terms and conditions",
      "watch paint dry in real time",
      "listen to hold music for an hour",
      "be trapped in a conversation about crypto",
      "explain the joke after no one laughs",
      "attend a multi-level marketing party",
      "sit through a webinar", "wait at the DMV"
    ],
    themed: {}
  },

  misused_phrases: {
    base: [
      "be yourself", "follow your dreams",
      "everyone's special in their own way",
      "it's what's on the inside that counts",
      "never give up", "fake it till you make it",
      "believe in yourself", "you can do anything",
      "shoot for the moon", "embrace your uniqueness",
      "dance like nobody's watching",
      "live your truth", "you're perfect just as you are"
    ],
    themed: {}
  },

  what_you_did: {
    base: [
      "whatever this is", "your career path",
      "your dating history", "your search history",
      "your personality", "your life choices",
      "your attempts at humor", "your fashion sense",
      "your cooking", "your advice-giving",
      "your dancing", "your networking style",
      "your social media presence", "your vibe"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // POSSESSION BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  existence_descriptions: {
    base: [
      "a participation trophy for being born",
      "proof that showing up isn't everything",
      "a rough draft that got published",
      "a series of unfortunate events",
      "a cautionary tale in real time",
      "an acquired taste nobody's acquiring",
      "a soft launch that never went live",
      "a pilot episode that didn't get picked up",
      "a test run that went too long",
      "a placeholder that became permanent",
      "a B-plot in everyone else's story",
      "a loading screen that never finishes"
    ],
    themed: {}
  },

  existence_twists: {
    base: [
      "and you've made peace with it",
      "and somehow you're proud",
      "and the reviews are in",
      "and we're all witnesses",
      "and there's documentation",
      "and it's somehow intentional",
      "and you've monetized it",
      "and there's no sign of improvement",
      "and everyone's too polite to say it",
      "and we've stopped expecting more"
    ],
    themed: {}
  },

  sad_book_titles: {
    base: [
      "Almost: A Memoir", "It Seemed Like a Good Idea",
      "The Longest Shortcut", "Everyone Was Polite About It",
      "I Peaked in the Preface", "Draft Seventeen",
      "The Footnote", "Just Here", "An Acquired Taste",
      "Room Temperature", "The Participation Years",
      "They Said Be Yourself", "How Not To",
      "A Series of Missed Points", "The Scenic Route to Nowhere"
    ],
    themed: {}
  },

  book_fates: {
    base: [
      "finish it", "buy it", "read past the introduction",
      "notice it", "recommend it", "review it",
      "remember the title", "care", "be surprised by the ending",
      "dispute the accuracy", "fact-check it",
      "ask for a sequel", "leave a positive review",
      "feel attacked by it", "relate to it"
    ],
    themed: {}
  },

  sad_nouns: {
    base: [
      "a deflated balloon", "a forgotten birthday cake",
      "an abandoned shopping cart", "a participation trophy",
      "last week's leftovers", "a dying house plant",
      "a clearance rack item", "an airport Cinnabon at closing",
      "a motivational poster in a bankruptcy office",
      "a fortune cookie with no fortune",
      "a vending machine sandwich",
      "a gas station rose on Valentine's Day"
    ],
    themed: {}
  },

  bad_experiences: {
    base: [
      "a midlife crisis", "a rejected application",
      "a foreclosure", "an existential crisis",
      "a bad Yelp review", "a software update",
      "Mercury retrograde", "a reorg",
      "a performance improvement plan",
      "an intervention", "a tax audit",
      "a custody battle", "a terms of service update"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTION BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  room_reactions: {
    base: [
      "the WiFi gets worse", "phones start dying",
      "people suddenly remember other places they need to be",
      "the vibe shifts", "small talk dies",
      "the energy leaves", "eye contact decreases",
      "group chats get active", "exits get evaluated",
      "people check the time more", "conversations end naturally",
      "the thermostat feels wrong", "things get quiet",
      "enthusiasm becomes optional"
    ],
    themed: {}
  },

  telling_details: {
    base: [
      "and it's been documented", "and you haven't noticed",
      "and we've discussed it", "and it's consistent",
      "and there are witnesses", "and it's measurable",
      "and it's your brand now", "and we've adapted",
      "and there's a pattern", "and it's in the minutes",
      "and someone's tracking it", "and it's become a verb"
    ],
    themed: {}
  },

  good_vibes: {
    base: [
      "a birthday party", "a celebration",
      "good news", "a promotion announcement",
      "a wedding", "a vacation", "a reunion",
      "a success story", "an award ceremony",
      "a good mood", "a winning streak",
      "an optimistic outlook", "team morale"
    ],
    themed: {}
  },

  your_presence: {
    base: [
      "being in the photo", "joining the call",
      "walking into the room", "speaking first",
      "making eye contact", "offering your opinion",
      "showing up unexpectedly", "being mentioned",
      "appearing in the chat", "existing nearby",
      "thinking about attending", "being tagged",
      "asking 'what did I miss'"
    ],
    themed: {}
  },

  things_to_watch: {
    base: [
      "try to be confident", "attempt small talk",
      "network", "dance", "give a presentation",
      "tell a joke", "make a first impression",
      "try to fit in", "work a room",
      "attempt sincerity", "pretend to be interested",
      "handle criticism", "accept a compliment",
      "explain yourself", "apologize"
    ],
    themed: {}
  },

  painful_comparisons: {
    base: [
      "watching a software update at 99% for an hour",
      "listening to someone explain their dream in detail",
      "sitting through a slideshow with no end in sight",
      "watching a buffering video you've already seen",
      "witnessing a magic trick that doesn't work",
      "being trapped in an elevator with a close talker",
      "watching someone wave at someone who wasn't waving at them",
      "seeing a proposal get rejected in public",
      "watching someone search for a parking spot forever",
      "being on hold and hearing 'your call is important to us'"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPINION BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  worse_than_dislike: {
    base: [
      "forget you exist", "feel nothing",
      "actively avoid you", "pretend they don't see you",
      "pity you", "get exhausted by you",
      "feel secondhand embarrassment", "tolerate you at best",
      "have stopped trying", "remember you wrong on purpose",
      "mute you in every app", "quietly hope you cancel",
      "feel their energy drain", "schedule around you"
    ],
    themed: {}
  },

  important_distinctions: {
    base: [
      "and that's worse", "which takes more effort",
      "and there's a difference", "and you earned it",
      "which says something", "and it's intentional",
      "which is a choice", "and it's specific to you",
      "and they've thought about it",
      "and it's not personal, it's logical",
      "and it's a consensus", "and there were meetings"
    ],
    themed: {}
  },

  wrong_behaviors: {
    base: [
      "replies all", "shows up unannounced",
      "gives unsolicited advice", "one-ups every story",
      "corrects people publicly", "talks during movies",
      "leaves voicemails", "sends LinkedIn connection requests after one meeting",
      "says 'no offense' before being offensive",
      "claps when planes land", "overshares on first dates",
      "posts inspirational quotes unironically",
      "uses speaker phone in public", "reclines on short flights"
    ],
    themed: {}
  },

  delusional_thoughts: {
    base: [
      "it's charming", "people appreciate it",
      "it's being authentic", "everyone does it",
      "it's relatable", "it's helping",
      "you're the exception", "it's endearing",
      "they're secretly impressed", "it's a power move",
      "it's what confident people do", "it's your thing",
      "they'll thank you later", "it's bold",
      "silence means agreement"
    ],
    themed: {}
  },

  common_reactions: {
    base: [
      "has the same realization", "needs a moment after",
      "suddenly has somewhere else to be",
      "updates their expectations downward",
      "reconsiders their life choices",
      "feels briefly concerned", "loses a little hope",
      "remembers a previous engagement",
      "checks the time", "gets quieter",
      "exchanges a look with someone",
      "makes a mental note"
    ],
    themed: {}
  },

  you_dont_notice: {
    base: [
      "because you never do", "but the group chat does",
      "which is part of the problem", "and that's on brand",
      "and it's documented", "and honestly, expected",
      "but there are screenshots", "and we've discussed it",
      "because reading the room isn't your strength",
      "and there's a pattern", "and self-awareness isn't your thing"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // METAPHOR BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  disappointment_categories: {
    base: [
      "a genre of music", "a season", "a weather event",
      "a font", "a notification sound", "an emoji",
      "a form of transportation", "a household appliance",
      "a room in a house", "an item of clothing",
      "a streaming service", "a social media platform",
      "a type of meeting", "a time of day"
    ],
    themed: {}
  },

  disappointment_examples: {
    base: [
      "the one nobody chooses", "the one people skip",
      "the broken one in the drawer",
      "the one that's technically available but never used",
      "the free trial that expires immediately",
      "the default option nobody meant to keep",
      "the one people apologize for having to use",
      "the one with consistently bad reviews",
      "the off-brand version", "the recalled one",
      "the discontinued one nobody missed",
      "the 'well, I guess this works' option"
    ],
    themed: {}
  },

  movie_subjects: {
    base: [
      "the audience", "the narrator", "the soundtrack",
      "the editor", "the critics", "the credits",
      "the runtime", "the trailer", "the reviews",
      "streaming services", "the subtitle team",
      "the rating", "future viewers"
    ],
    themed: {}
  },

  movie_actions: {
    base: [
      "walk out early", "demand a refund",
      "skip to the end", "apologize for participating",
      "add a 'skip intro' button for your life",
      "file for damages", "use the 1.5x speed",
      "add a content warning about you",
      "categorize you under 'horror'",
      "rate it one star", "bury it in the algorithm",
      "pretend it doesn't exist",
      "list 'inspired by a true disappointment'"
    ],
    themed: {}
  },

  supposed_advantages: {
    base: [
      "trying hard", "showing up", "being confident",
      "having a plan", "staying positive", "being yourself",
      "experience", "education", "persistence",
      "good intentions", "enthusiasm", "preparation",
      "having a platform", "being early", "networking"
    ],
    themed: {}
  },

  success_types: {
    base: [
      "being likeable", "actual results", "basic competence",
      "respect", "friends", "good outcomes",
      "positive reviews", "second invitations",
      "repeat customers", "followers who stay",
      "people who remember your name correctly",
      "recommendations", "references",
      "a Wikipedia page", "a legacy"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIME-BASED BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  future_sadness: {
    base: [
      "telling that same story", "making the same mistakes",
      "blaming everyone else", "calling it 'your process'",
      "posting about your journey", "pivoting to something else",
      "explaining why it didn't work out",
      "starting over 'for real this time'",
      "waiting to be discovered", "almost there",
      "workshopping the same idea",
      "networking at events", "updating your bio"
    ],
    themed: {}
  },

  unsurprising_futures: {
    base: [
      "and we've already placed bets", "and the pattern is clear",
      "and honestly, expected", "and nobody will check in",
      "and there's historical data", "and the trajectory is set",
      "and at this point it's tradition",
      "and we've stopped asking",
      "and it's priced in", "and we've made peace with it",
      "and your autobiography will confirm it"
    ],
    themed: {}
  },

  born_to_do: {
    base: [
      "be someone's backup option", "fill space",
      "be an example", "be average", "try",
      "make others feel better about themselves",
      "keep expectations low", "be a footnote",
      "serve as a warning", "prove statistics right",
      "represent the bell curve", "be relatable to failures"
    ],
    themed: {}
  },

  how_you_failed: {
    base: [
      "found a way to underperform", "managed to disappoint",
      "still made it weird", "fumbled even that",
      "peaked early and kept going", "made it your whole personality",
      "turned it into a problem", "found the floor and dug",
      "proved there's always lower", "set a new baseline",
      "demonstrated that less is possible",
      "showed us what 'barely' looks like"
    ],
    themed: {}
  },

  historical_footnotes: {
    base: [
      "a cautionary footnote", "an asterisk on humanity",
      "a Wikipedia disambiguation page",
      "the 'see also' of someone more interesting",
      "a deleted paragraph", "a [citation needed]",
      "something auto-archived", "a redirect that 404s",
      "a page nobody visits", "a broken link",
      "something that got lost in editing",
      "a typo that didn't get corrected"
    ],
    themed: {}
  },

  historical_caveats: {
    base: [
      "and that's generous", "if the internet is still up",
      "assuming anyone's checking", "which seems optimistic",
      "if they bother", "and that's a big if",
      "in a very specific, unread database",
      "among people with too much time",
      "in the way we remember participation trophy recipients",
      "briefly and incorrectly", "and only by accident"
    ],
    themed: {}
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WORDPLAY BURN POOLS
  // ═══════════════════════════════════════════════════════════════════════════

  positive_adjectives: {
    base: [
      "interesting", "memorable", "consistent", "unique",
      "confident", "bold", "unforgettable", "reliable",
      "striking", "notable", "impressive", "authentic",
      "original", "predictable", "persistent"
    ],
    themed: {}
  },

  backhanded_truths: {
    base: [
      "how loudly you miss the point",
      "the consistency of your disappointment",
      "how memorable your failures are",
      "your commitment to mediocrity",
      "the boldness of your delusions",
      "how reliably you make things awkward",
      "the unique way you drain a room",
      "your authentic lack of self-awareness",
      "the originality of your excuses",
      "how predictably you fumble",
      "your persistence in making it worse"
    ],
    themed: {}
  },

  rating_scales: {
    base: [
      "one to 'should have stayed home'",
      "fine to 'we need to talk'",
      "acceptable to 'HR is involved'",
      "'sure' to 'absolutely not'",
      "'it's fine' to 'I need therapy now'",
      "meh to 'restraining order'",
      "'they tried' to 'they shouldn't have'",
      "passable to 'documentary subject'",
      "'at least they showed up' to 'they should leave'",
      "tolerable to 'international incident'"
    ],
    themed: {}
  },

  scale_results: {
    base: [
      "off the chart in the wrong direction",
      "not even on this scale",
      "a new category entirely",
      "being used to recalibrate the whole system",
      "the reason we added more options",
      "making us question the methodology",
      "the outlier we exclude from data",
      "evidence that the scale needs revision",
      "the example we use to explain 'below baseline'",
      "currently breaking the algorithm"
    ],
    themed: {}
  },

  phenomena: {
    base: [
      "a black hole of charisma", "a vacuum of self-awareness",
      "a singularity of disappointment",
      "an anti-pattern for success",
      "a control group for failure",
      "a paradox of confidence and incompetence",
      "an anomaly in the data set of humanity",
      "a case study in what not to do",
      "a statistical impossibility of bad choices",
      "an exception to every positive rule",
      "a glitch in the matrix of likability"
    ],
    themed: {}
  },

  defies_expectations: {
    base: [
      "somehow keeps getting worse",
      "doesn't improve with practice",
      "actively resists learning",
      "makes scientists give up",
      "proves nothing is guaranteed",
      "has researchers questioning their field",
      "makes peer review cry",
      "exists despite all probability",
      "survives against all metrics",
      "persists when theory said you wouldn't"
    ],
    themed: {}
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// GHOST THEMES - map ghost IDs to their applicable themes
// ═══════════════════════════════════════════════════════════════════════════
export const GHOST_THEMES = {
  "crypto_chad": ["crypto"],
  "brenda": ["mlm", "boomer"],
  "gary": ["corporate", "boomer"],
  "kyle": ["fitness"],
  "margaret": ["boomer"],
  "tiffany": ["influencer"],
  "karen": ["corporate", "boomer"],
  "dustin": ["fitness"],
  "brad": ["fitness"],
  "zack": ["influencer"],
  "dwayne": ["corporate"],
  "chad_worthington": ["corporate"]
};
