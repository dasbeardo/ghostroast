// Word pools with base entries + themed bonus entries
// Themed entries have higher weight when matching ghost themes are active

export const WORD_POOLS = {
  // =============================================================
  // PATHETIC THINGS - specific, visual, funny
  // =============================================================
  pathetic_things: {
    base: [
      "a gas station birthday cake",
      "airport sushi",
      "a participation trophy at a funeral",
      "a 'hang in there' poster in a foreclosure",
      "a LinkedIn motivational post",
      "a cover letter that starts with 'To Whom It May Concern'",
      "a standing desk nobody uses",
      "an office birthday card signed 'from everyone'",
      "a New Year's resolution on January 3rd",
      "a gym membership in February",
      "a WebMD diagnosis at 3am",
      "a Yelp review written by someone's mom",
      "a company pizza party during layoffs",
      "a 'We Need to Talk' text",
      "a group project carried by one person",
      "hotel & conference center breakfast",
      "a mandatory fun event",
      "a 'sorry for your loss' Hallmark card",
      "a GoFundMe with $0 raised",
      "a wedding DJ playing 'Cha Cha Slide'",
      "an unironic minion meme",
      "a 1-star Uber rating",
      "a business card at a networking event",
      "a 'let's circle back' email",
      "a company values poster",
      "a motivational calendar in December",
      "a 'you up?' text at 2am",
      "a passive-aggressive Post-it note",
      "a Costco sample on an empty stomach",
      "a sad desk lunch",
      "an 'I voted' sticker three weeks later",
      "a 'per my last email' opener",
      "a corporate retreat trust fall",
      "a printer jam during a deadline",
      "the last donut nobody wants",
      "a self-help book with a cracked spine on page 3"
    ],
    themed: {
      crypto: [
        "a WAGMI tattoo in 2024",
        "an NFT of a screenshot",
        "a Discord announcement that starts with 'gm'",
        "a Bored Ape you can't sell",
        "a 'we're still early' tweet",
        "a crypto wallet with $0.47",
        "a rug pull announcement",
        "a 'diamond hands' reply guy"
      ],
      influencer: [
        "a sponsored post with 3 likes",
        "a 'link in bio' with a broken link",
        "an unboxing video nobody asked for",
        "a '#ad' on a post about grief",
        "a ring light in a studio apartment",
        "a 'collab?' DM to a brand",
        "an Instagram pod comment",
        "a TikTok with 12 views from yourself"
      ],
      boomer: [
        "a chain email about Facebook privacy",
        "a minion meme about wine",
        "a 'back in my day' lecture",
        "a Facebook status meant for Google",
        "a printed-out MapQuest direction",
        "an AOL email address on a resume",
        "a comment section rant at a news article",
        "a speakerphone call in public"
      ],
      mlm: [
        "a 'hey hun!' cold DM",
        "an MLM 'opportunity' pitch",
        "a garage full of unsold inventory",
        "a 'be your own boss' Instagram story",
        "a downline with zero members",
        "a pyramid diagram you insist isn't a pyramid",
        "a 'passive income' screenshot that's clearly edited"
      ],
      corporate: [
        "a synergy meeting",
        "a 'quick sync' that takes an hour",
        "a corporate mission statement",
        "a team-building escape room",
        "a 360 review nobody wanted",
        "an org chart reshuffle",
        "a 'culture fit' rejection",
        "a foosball table in a dying startup"
      ],
      fitness: [
        "a CrossFit explanation nobody asked for",
        "a gym selfie with a motivational caption",
        "a protein shake that costs $14",
        "a marathon story at every dinner party",
        "a Peloton collecting dust",
        "a 5K participation medal worn unironically",
        "a gym mirror selfie at 5am"
      ]
    }
  },

  // =============================================================
  // IT SHOWS - reactions to the pathetic thing comparison
  // =============================================================
  it_shows: {
    base: [
      "and everyone can tell",
      "and we've all noticed",
      "but somehow worse",
      "with less self-awareness",
      "but at least those have an expiration date",
      "but you're not even discounted",
      "and honestly it tracks",
      "but with more delusion",
      "and the vibes are immaculate... immaculately bad",
      "but even sadder somehow",
      "and your LinkedIn confirms it",
      "and that's being generous",
      "but somehow you made it your personality",
      "with extra steps",
      "and it's not even endearing",
      "and nobody has the heart to tell you",
      "and honestly, same energy",
      "but less useful",
      "and we've all moved on",
      "and the algorithm agrees",
      "but at least those are self-aware",
      "and even that's aspirational",
      "and we're tired",
      "but without the charm",
      "and it's on purpose apparently"
    ],
    themed: {}
  },

  // =============================================================
  // MILD INSULTS - for "I'd call you X" template
  // =============================================================
  mild_insults: {
    base: [
      "mid",
      "basic",
      "forgettable",
      "a disappointment",
      "background noise",
      "a waste of potential",
      "beige",
      "a filler episode",
      "elevator music",
      "clipart",
      "hold music",
      "a loading screen",
      "a terms and conditions page",
      "a system update nobody asked for",
      "a reply-all accident",
      "a placeholder",
      "a rough draft",
      "a B-plot",
      "a tutorial level",
      "a side quest nobody finishes",
      "off-brand",
      "the store brand version",
      "a consolation prize",
      "a participation ribbon",
      "a Monday",
      "an afterthought",
      "a footnote",
      "a disclaimer",
      "the fine print"
    ],
    themed: {
      crypto: ["a rug pull", "a dead coin", "an abandoned Discord"],
      influencer: ["a shadowbanned account", "a dead channel", "a demonetized video"],
      corporate: ["a rejected expense report", "a skipped promotion", "a redundancy"]
    }
  },

  // =============================================================
  // AT LEAST - what even mild insults have that you don't
  // =============================================================
  at_least: {
    base: [
      "a purpose",
      "fans",
      "a Wikipedia page",
      "an arc",
      "character development",
      "a redemption chance",
      "brand consistency",
      "plausible deniability",
      "an excuse",
      "a Rotten Tomatoes score",
      "a tragic backstory",
      "closure",
      "a beginning, middle, and end",
      "seasonal relevance",
      "a reason to exist",
      "a target audience",
      "a production budget",
      "critical analysis",
      "a cult following",
      "ironic appreciation",
      "meme potential",
      "nostalgic value",
      "documentary potential",
      "a clear ending",
      "a lesson learned"
    ],
    themed: {}
  },

  // =============================================================
  // VERBS - how you do things badly
  // =============================================================
  verbs: {
    base: [
      "exist",
      "make eye contact",
      "enter a room",
      "tell stories",
      "give compliments",
      "make decisions",
      "apologize",
      "celebrate",
      "network",
      "dress",
      "age",
      "dance",
      "email",
      "vacation",
      "handle success",
      "take criticism",
      "accept praise",
      "walk into parties",
      "hold conversations",
      "make first impressions",
      "give advice",
      "accept feedback",
      "take photos",
      "order at restaurants",
      "tip",
      "parallel park",
      "tell jokes",
      "give toasts",
      "RSVP",
      "maintain friendships",
      "set boundaries"
    ],
    themed: {
      influencer: ["pose for photos", "caption things", "go viral"],
      fitness: ["stretch", "hydrate", "meal prep"],
      corporate: ["delegate", "lead meetings", "give presentations"]
    }
  },

  // =============================================================
  // TRAGIC BACKSTORIES - "like someone who..."
  // =============================================================
  tragic_backstories: {
    base: [
      "peaked in a dream once",
      "was homeschooled by YouTube",
      "gets their personality from Netflix",
      "learned charisma from TED talks",
      "was raised by an algorithm",
      "thinks LinkedIn is a personality",
      "has never been anyone's first choice",
      "was told 'you tried' one too many times",
      "was the 'before' in a makeover show",
      "peaked during attendance",
      "has never finished a book",
      "still uses their college email",
      "has never been the favorite",
      "learned boundaries from reality TV",
      "was the practice friend",
      "got participation trophies until adulthood",
      "treats therapy like a podcast",
      "learned social skills from anime",
      "was always picked last",
      "has never been tagged in a photo",
      "was homeschooled by Wikipedia",
      "learned confidence from LinkedIn",
      "has only been someone's 'maybe'",
      "uses horoscopes as therapy",
      "was raised by a screensaver",
      "got their personality from a BuzzFeed quiz",
      "peaked at their own gender reveal",
      "learned flirting from memes",
      "was raised by cable news",
      "thinks podcast hosts are their friends",
      "has strong opinions about fonts"
    ],
    themed: {
      crypto: [
        "bought Bitcoin at the top",
        "has 'crypto investor' in their bio",
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
        "still prints emails",
        "calls every console 'a Nintendo'",
        "discovered memes in 2019",
        "thinks WiFi is a type of radiation"
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

  // =============================================================
  // ENERGY TYPES - specific vibes
  // =============================================================
  energy_types: {
    base: [
      "assistant manager at a dying mall",
      "reply-all apology",
      "third divorce",
      "unread LinkedIn message",
      "company icebreaker",
      "HR complaint waiting to happen",
      "mandatory sensitivity training",
      "potluck dish nobody touches",
      "group chat everyone muted",
      "middle seat on a long flight",
      "parking lot proposal",
      "gas station flowers on Valentine's Day",
      "a 2-star Uber rating",
      "open-plan office cougher",
      "expired Groupon",
      "last-minute plus-one",
      "friend's boyfriend who won't leave",
      "coworker who heats up fish",
      "guy who brings a guitar to parties",
      "close-talker at networking events",
      "person who claps when planes land",
      "reply guy on every tweet",
      "double-texter",
      "person who says 'I don't watch TV'",
      "unsolicited advice at parties",
      "loud chewer on a date",
      "person who peaks in icebreakers",
      "standing meeting that could be an email",
      "calendar invite for 4:30 on Friday",
      "someone who loves Mondays unironically"
    ],
    themed: {
      crypto: [
        "Discord mod at 3am",
        "'gm' reply guy",
        "NFT profile pic at a funeral",
        "rugpull announcement"
      ],
      influencer: [
        "unboxing video for tampons",
        "sponsored grief post",
        "collab request in the DMs"
      ],
      boomer: [
        "Facebook comment section warrior",
        "chain email about hackers",
        "tech support caller who won't listen"
      ],
      corporate: [
        "mandatory fun coordinator",
        "synergy meeting scheduler",
        "culture committee volunteer"
      ],
      mlm: [
        "'hey hun' DM",
        "party you didn't know was a pitch",
        "Facebook live from your car"
      ]
    }
  },

  // =============================================================
  // SPECIFICALLY - followups to energy types
  // =============================================================
  specifically: {
    base: [
      "specifically the kind that makes everyone uncomfortable",
      "and not in a fun way",
      "and we've all talked about it",
      "and HR has a file",
      "and somehow you're proud of it",
      "and it's gotten worse",
      "and there's no fixing it",
      "and you don't even notice",
      "and the group chat has receipts",
      "and people take the stairs to avoid you",
      "and nobody knows how to tell you",
      "and you're the only one who doesn't see it",
      "and honestly we're worried",
      "and it's your whole brand now",
      "and there's documentation",
      "and we've discussed it at length",
      "and even strangers notice",
      "and it's gotten mentions in reviews",
      "and people screenshot it",
      "and it's been archived for posterity",
      "and your family has addressed it",
      "and it comes up at reunions",
      "and even the dog is concerned"
    ],
    themed: {}
  },

  // =============================================================
  // WHAT YOU THINK vs WHAT YOU ARE
  // =============================================================
  what_you_think: {
    base: [
      "mysterious",
      "intimidating",
      "an old soul",
      "ahead of your time",
      "misunderstood",
      "a thought leader",
      "an acquired taste",
      "charmingly eccentric",
      "too real for people",
      "a visionary",
      "brutally honest",
      "an alpha",
      "a sigma",
      "the main character",
      "intimidatingly smart",
      "refreshingly blunt",
      "delightfully weird",
      "fiercely independent",
      "effortlessly cool",
      "naturally gifted",
      "classically trained",
      "ahead of the curve",
      "built different",
      "not like other people",
      "an empath"
    ],
    themed: {
      crypto: ["a visionary investor", "early to everything"],
      influencer: ["famous", "iconic", "a trendsetter"],
      fitness: ["disciplined", "elite", "a machine"],
      corporate: ["a leader", "management material", "C-suite bound"]
    }
  },

  what_you_are: {
    base: [
      "just confusing",
      "just annoying",
      "just old",
      "just late",
      "just loud",
      "just wrong",
      "just too much",
      "just unemployable",
      "just allergic to self-awareness",
      "just the human equivalent of a buffering wheel",
      "just someone's cautionary tale",
      "just proof that confidence isn't everything",
      "just a lot",
      "just peak Dunning-Kruger",
      "just making everyone uncomfortable",
      "just a whole situation",
      "just very very tired",
      "just deeply unwell",
      "just in everyone's way",
      "just aggressively average",
      "just confidently incorrect",
      "just exhausting to be around",
      "just a red flag in human form",
      "just the reason for the group chat",
      "just a lot of people's therapy topic"
    ],
    themed: {
      crypto: ["just down bad", "just exit liquidity", "just rugged"],
      influencer: ["just shadowbanned", "just cringe", "just doing it for clout"],
      boomer: ["just out of touch", "just yelling at clouds"],
      mlm: ["just the bottom of the pyramid", "just someone's downline"]
    }
  },

  // =============================================================
  // COMPARISON BURNS - "You make X look Y"
  // =============================================================
  bad_things: {
    base: [
      "a participation trophy",
      "airport food",
      "a group project",
      "a terms of service agreement",
      "a check engine light",
      "a password you forgot",
      "a Monday",
      "a 3am WebMD spiral",
      "a Zoom call that could've been an email",
      "a delayed flight",
      "a read receipt with no reply",
      "student loan interest",
      "a timeshare presentation",
      "an MLM pitch",
      "gas station sushi",
      "a software update",
      "a pop-up ad",
      "a terms and conditions page",
      "a captcha",
      "buffering",
      "a loading screen",
      "dial-up internet",
      "a fax machine",
      "a printer at 4:59pm",
      "a Monday morning meeting",
      "an expired coupon",
      "a parking ticket"
    ],
    themed: {
      crypto: ["a rug pull", "a dead NFT", "a failed mint"],
      corporate: ["a performance review", "a reorg", "an all-hands"]
    }
  },

  good_by_comparison: {
    base: [
      "reliable",
      "consistent",
      "charming",
      "self-aware",
      "intentional",
      "endearing",
      "worthwhile",
      "memorable for the right reasons",
      "like a deliberate choice",
      "almost impressive",
      "respectable",
      "worth the effort",
      "like it has potential",
      "competent",
      "necessary",
      "reasonable",
      "understandable",
      "forgivable",
      "at least honest",
      "kind of useful",
      "occasionally right"
    ],
    themed: {}
  },

  // =============================================================
  // HAS A POINT - "At least X — you're just..."
  // =============================================================
  has_a_point: {
    base: [
      "a participation trophy tried",
      "a check engine light is useful",
      "elevator music sets a mood",
      "spam emails have a goal",
      "a broken clock is right twice a day",
      "a PowerPoint has structure",
      "a screensaver does something",
      "background music knows its place",
      "autopilot has a destination",
      "a placeholder has potential",
      "a draft gets revised",
      "a loading screen ends eventually",
      "an error message is informative",
      "a 404 page has personality",
      "static is consistent",
      "a dial tone means something",
      "a password error teaches you something",
      "a pop-up ad has targeting",
      "a captcha serves a purpose",
      "junk mail has optimism"
    ],
    themed: {}
  },

  just_what: {
    base: [
      "there",
      "happening",
      "somehow still going",
      "a lot of effort for nothing",
      "proof that showing up isn't enough",
      "taking up space with confidence",
      "mid with better marketing",
      "a whole situation",
      "the 'before' photo that never got an 'after'",
      "content that should've stayed in drafts",
      "vibes without substance",
      "energy without direction",
      "chaos without charm",
      "noise without signal",
      "motion without progress",
      "presence without impact",
      "volume without content",
      "confidence without competence",
      "ambition without ability",
      "trying without succeeding"
    ],
    themed: {}
  },

  // =============================================================
  // WHO CALLED - "X called, they want Y back"
  // =============================================================
  who_called: {
    base: [
      "The early 2000s",
      "Your potential",
      "Rock bottom",
      "The bare minimum",
      "Everyone you went to high school with",
      "Your parents' expectations",
      "The algorithm",
      "Mediocrity",
      "The void",
      "Your therapist's therapist",
      "The concept of trying",
      "Your New Year's resolutions",
      "Your childhood dreams",
      "Your credit score",
      "The last person who believed in you",
      "Your abandoned hobbies",
      "Your college major",
      "The gym you signed up for",
      "Your LinkedIn connections",
      "Everyone who ghosted you",
      "The participation trophy committee",
      "Whatever you peaked at"
    ],
    themed: {
      crypto: ["Your seed phrase", "The blockchain", "Your paper hands"],
      influencer: ["Your dead channel", "The algorithm", "Your ring light"],
      boomer: ["1985", "Your lawn", "Respect for authority"],
      mlm: ["Your upline", "Your garage full of product", "Your former friends"]
    }
  },

  what_they_want: {
    base: [
      "their disappointment acknowledged",
      "an apology",
      "those years back",
      "to be left out of this",
      "credit for doing more than you",
      "a refund on the energy spent",
      "you to stop claiming you know them",
      "their reputation back",
      "to file a complaint",
      "distance",
      "to be removed from your references",
      "less of whatever this is",
      "to know what happened",
      "closure",
      "to be disassociated",
      "a formal retraction",
      "their dignity back",
      "to press charges",
      "to be anonymous",
      "witness protection"
    ],
    themed: {}
  },

  // =============================================================
  // SETUP/PAYOFF - Best/Worst
  // =============================================================
  best_sarcastic: {
    base: [
      "You're consistent",
      "People remember you",
      "You're confident",
      "You have a brand",
      "You're memorable",
      "You're honest",
      "You show up",
      "You're yourself",
      "You commit to bits",
      "You're not afraid to be yourself",
      "You're predictable",
      "You have energy",
      "You're authentic",
      "You're persistent",
      "You have presence",
      "You stand out",
      "You're unforgettable",
      "People talk about you",
      "You leave an impression"
    ],
    themed: {}
  },

  worst_real: {
    base: [
      "also that",
      "it's the same thing",
      "see above",
      "literally everything else",
      "everything that comes after",
      "what follows",
      "the execution",
      "the self-awareness about it",
      "you think it's a compliment",
      "you've made it a personality",
      "you don't know when to stop",
      "it's intentional",
      "you're getting worse",
      "there's no arc",
      "you peaked at the opening",
      "you think you're different"
    ],
    themed: {}
  },

  // =============================================================
  // PEAKED WHEN
  // =============================================================
  peaked_when: {
    base: [
      "in the womb",
      "during attendance",
      "in a dream once",
      "at your own birthday party (age 7)",
      "when someone mistook you for someone else",
      "during a participation trophy ceremony",
      "in a group project someone else carried",
      "at a talent show you didn't win",
      "when you had an excuse",
      "before the expectations kicked in",
      "the moment before anyone got to know you",
      "when you were hypothetical",
      "before you started talking",
      "in your LinkedIn headshot",
      "in your dating profile",
      "before the WiFi connected",
      "during the tutorial level",
      "at orientation",
      "in the interview you bombed",
      "before the second date",
      "at the open bar",
      "before people got to know you"
    ],
    themed: {
      crypto: ["before the crash", "during the mint", "before the rug"],
      influencer: ["at 12 followers", "before the algorithm changed", "during a viral moment you couldn't replicate"],
      fitness: ["day one at the gym", "before the injury", "during a photo"]
    }
  },

  peaked_commentary: {
    base: [
      "we all saw it happen",
      "there are witnesses",
      "it wasn't even impressive then",
      "we were being polite about it",
      "even that was a group effort",
      "the bar was already underground",
      "nobody wanted to say anything",
      "we thought it was a phase",
      "it's been documented",
      "it was still mid",
      "you've been dining out on it ever since",
      "somehow that was the highlight",
      "we assumed you'd improve",
      "that's the story you tell at parties",
      "we were being generous",
      "even then we had doubts",
      "the footage is rough",
      "we all remember it differently",
      "you made it your whole personality"
    ],
    themed: {}
  },

  // =============================================================
  // SPECIFIC ENERGIES
  // =============================================================
  specific_energies: {
    base: [
      "wet handshake",
      "reply-all accident",
      "conference room B",
      "team-building exercise",
      "mandatory overtime",
      "potluck nobody RSVP'd to",
      "LinkedIn recruiter message",
      "airport Chili's",
      "hotel & conference center",
      "all-hands meeting",
      "performance review",
      "exit interview",
      "silent auction at a work event",
      "networking event name tag",
      "expense report rejection",
      "calendar invite at 4:55pm Friday",
      "meeting with no agenda",
      "voluntary survey",
      "open office floor plan",
      "hot desk policy",
      "team bonding exercise",
      "icebreaker question",
      "trust fall",
      "anonymous feedback form"
    ],
    themed: {
      crypto: ["Discord pump-and-dump", "gm post at noon", "whitepaper nobody read"],
      influencer: ["collab DM", "sponsored #ad", "engagement pod comment"],
      corporate: ["synergy meeting", "pivot announcement", "rebranding workshop"]
    }
  },

  energy_consequences: {
    base: [
      "clears a room",
      "makes people take the stairs",
      "gets muted in the group chat",
      "makes HR nervous",
      "gets left on read",
      "inspires secondhand embarrassment",
      "makes people suddenly busy",
      "lowers property values",
      "ends conversations",
      "makes small talk feel like a hostage situation",
      "gets you seated near the bathroom",
      "triggers fight-or-flight",
      "makes strangers pretend to take calls",
      "gets you uninvited to things",
      "starts rumors",
      "becomes a warning to others",
      "gets mentioned in exit interviews",
      "makes people update their LinkedIn",
      "inspires passive-aggressive emails",
      "gets documented",
      "becomes a case study"
    ],
    themed: {}
  },

  // =============================================================
  // ABSTRACT CONCEPTS
  // =============================================================
  abstract_concepts: {
    base: [
      "disappointment",
      "a declined transaction",
      "an awkward pause",
      "a loading screen",
      "the hold music",
      "buyer's remorse",
      "a mandatory meeting",
      "unread terms and conditions",
      "a rejected application",
      "a lag spike",
      "buffering",
      "an away message",
      "a 2-star review",
      "elevator silence",
      "a 'seen' notification with no reply",
      "a missed connection",
      "a delayed notification",
      "the spinning wheel of death",
      "an hourglass cursor",
      "a busy signal",
      "a voicemail nobody checks",
      "a notification you swipe away",
      "the feeling of forgetting something",
      "Sunday scaries"
    ],
    themed: {
      crypto: ["a failed transaction", "a gas fee", "a rejected swap"],
      corporate: ["a reorg", "a pivot", "a 'quick sync'"]
    }
  },

  be_you_how: {
    base: [
      "apologize less",
      "be making your exact face right now",
      "file a complaint about itself",
      "ask to speak to a manager",
      "still have more charisma",
      "wonder where it went wrong",
      "have better excuses",
      "at least have a reason",
      "write a memoir nobody reads",
      "somehow be less awkward",
      "start a podcast about it",
      "at least be brief",
      "have the decency to end",
      "know its place",
      "stick to a lane",
      "have some self-respect",
      "commit to the bit better",
      "try harder than you"
    ],
    themed: {}
  },

  // =============================================================
  // THINGS THAT FAIL
  // =============================================================
  things_that_fail: {
    base: [
      "a New Year's resolution",
      "a gym membership",
      "a situationship",
      "a rebrand",
      "potential",
      "a comeback",
      "a group project",
      "a participation trophy",
      "a self-help book",
      "a midlife crisis",
      "an overcorrection",
      "a second chance",
      "a fresh start",
      "a pivot",
      "a glow-up",
      "a redemption arc",
      "an apology tour",
      "a personal brand",
      "a side hustle",
      "a passion project"
    ],
    themed: {
      crypto: ["a memecoin", "a whitepaper", "a roadmap"],
      influencer: ["a collab", "a rebrand", "a comeback video"],
      mlm: ["a downline", "a party", "passive income dreams"]
    }
  },

  bad_outcomes: {
    base: [
      "left on read by the universe",
      "sent to voicemail by life",
      "archived and forgotten",
      "ghosted by success",
      "waitlisted by karma",
      "unsubscribed from potential",
      "flagged as spam by opportunity",
      "lost in transit",
      "returned to sender",
      "marked as 'no longer interested'",
      "soft-blocked by fate",
      "muted by the algorithm",
      "shadowbanned by reality",
      "unmatched by destiny",
      "declined by the universe",
      "bounced by karma",
      "filtered to junk by life",
      "put on do-not-call by hope",
      "blacklisted by achievement",
      "rate-limited by progress"
    ],
    themed: {}
  },

  // =============================================================
  // DISAPPOINTED PEOPLE
  // =============================================================
  disappointed_people: {
    base: [
      "your potential",
      "your childhood self",
      "everyone who believed in you",
      "your parents' expectations",
      "the algorithm",
      "your future self",
      "whoever designed you",
      "your therapist",
      "the universe",
      "probability itself",
      "the concept of growth",
      "your high school guidance counselor",
      "your resume",
      "your New Year's resolution",
      "your gym membership",
      "everyone at the reunion",
      "your old professors",
      "your dating profile",
      "your horoscope",
      "the simulation"
    ],
    themed: {
      crypto: ["your wallet", "your seed phrase", "satoshi"],
      influencer: ["your analytics", "the algorithm", "your ring light"],
      boomer: ["your lawn", "the American dream", "hard work"],
      mlm: ["your upline", "your garage", "the founders"]
    }
  },

  disappointed_actions: {
    base: [
      "writing a strongly worded letter",
      "requesting a refund",
      "filing a complaint",
      "updating their LinkedIn",
      "considering other options",
      "pretending not to know you",
      "going to therapy about it",
      "writing a memoir",
      "starting over with someone else",
      "quietly giving up",
      "entering witness protection",
      "changing their number",
      "leaving the group chat",
      "unfollowing quietly",
      "moving without telling you",
      "rebranding",
      "seeking legal counsel",
      "holding an intervention",
      "scheduling a meeting about you",
      "creating a document"
    ],
    themed: {}
  },

  // =============================================================
  // TYPES OF FAILURE
  // =============================================================
  types_of_failure: {
    base: [
      "a case study in failure",
      "a masterclass in missing the point",
      "a monument to almost",
      "a tribute to 'good enough'",
      "a celebration of bare minimum",
      "an exhibition in 'could be worse'",
      "a living definition of mid",
      "a warning label in human form",
      "a controlled experiment in not trying",
      "a live demonstration of potential wasted",
      "a museum of missed opportunities",
      "a memorial to mediocrity",
      "a gallery of bad decisions",
      "a retrospective of regret",
      "a permanent exhibit of almost",
      "a documentary waiting to happen",
      "a Wikipedia disambiguation page",
      "a cautionary tale without a lesson",
      "a series of unfortunate events with no resolution"
    ],
    themed: {}
  },

  failure_elaboration: {
    base: [
      "with a gift shop",
      "and the reviews are in",
      "and it's somehow intentional",
      "and you're charging admission",
      "and you've made it a brand",
      "and there's a waitlist",
      "and it has a Wikipedia page",
      "and you're proud of it",
      "and somehow it's getting worse",
      "and nobody asked for a sequel",
      "and you've franchised it",
      "and it's touring nationally",
      "and there's merch",
      "and you've written a book about it",
      "and it's been optioned for a limited series",
      "and you're keynoting conferences about it",
      "and you've started a podcast",
      "and you've got a TED talk pending",
      "and people subscribe to updates"
    ],
    themed: {}
  },

  // =============================================================
  // THEY SAY / YOU'RE PROOF
  // =============================================================
  they_say: {
    base: [
      "everyone has potential",
      "it's never too late",
      "there's someone for everyone",
      "hard work pays off",
      "you miss 100% of the shots you don't take",
      "every expert was once a beginner",
      "the journey matters more than the destination",
      "confidence is key",
      "you can be anything you want",
      "authenticity is attractive",
      "there are no stupid questions",
      "everyone deserves a second chance",
      "growth is always possible",
      "the universe has a plan",
      "things happen for a reason",
      "everyone finds their path",
      "it gets better",
      "persistence pays off",
      "you're exactly where you need to be",
      "everything is figureoutable"
    ],
    themed: {}
  },

  youre_proof: {
    base: [
      "exceptions exist",
      "sometimes it is too late",
      "that's statistically optimistic",
      "trying isn't everything",
      "some shots should be missed",
      "some people peak at beginner",
      "sometimes the destination is 'nowhere'",
      "you can have too much of a good thing",
      "limits exist for a reason",
      "being yourself isn't always the answer",
      "some questions should stay unasked",
      "some chances should be declined",
      "growth has a ceiling",
      "the universe makes mistakes",
      "some things happen for no reason",
      "some paths lead nowhere",
      "it can get worse",
      "persistence can be a problem",
      "sometimes you're lost",
      "some things can't be figured out"
    ],
    themed: {}
  }
};

// =============================================================
// GHOST THEMES - map ghost IDs to their applicable themes
// =============================================================
export const GHOST_THEMES = {
  "crypto_chad": ["crypto", "tech_bro"],
  "brenda": ["mlm", "boomer"],
  "gary": ["corporate", "boomer"],
  "kyle": ["fitness", "bro"],
  "margaret": ["boomer"],
  "tiffany": ["influencer"],
  "karen": ["corporate", "boomer"],
  "dustin": ["bro"],
  "brad": ["fitness", "bro"],
  "zack": ["influencer"],
  "dwayne": ["corporate"],
  "chad_worthington": ["corporate", "wealth"]
};
