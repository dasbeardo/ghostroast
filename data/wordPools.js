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
