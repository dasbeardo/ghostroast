export const TEMPLATES = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSIC BURNS - setup/punchline structure
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "human_equivalent",
    template: "You're the human equivalent of [slot0] — [slot1]",
    slots: [
      { label: "something pathetic", pool: "pathetic_nouns" },
      { label: "and it shows", pool: "punchline_observations" }
    ]
  },
  {
    id: "id_call_you",
    template: "I'd call you [slot0], but even that has [slot1]",
    slots: [
      { label: "a mild insult", pool: "mild_insults" },
      { label: "something you lack", pool: "things_you_lack" }
    ]
  },
  {
    id: "you_verb_like",
    template: "You [slot0] like someone who [slot1]",
    slots: [
      { label: "verb (badly)", pool: "verbs_done_badly" },
      { label: "tragic backstory", pool: "tragic_backstories" }
    ]
  },
  {
    id: "your_whole_vibe",
    template: "Your whole vibe is [slot0] — [slot1]",
    slots: [
      { label: "an energy", pool: "energy_types" },
      { label: "specifically...", pool: "energy_specifics" }
    ]
  },
  {
    id: "youre_not_youre",
    template: "You're not [slot0], you're [slot1] — there's a difference",
    slots: [
      { label: "what you think you are", pool: "delusions" },
      { label: "what you actually are", pool: "harsh_realities" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMPARISON BURNS - making something bad look good
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "you_make_look",
    template: "You make [slot0] look [slot1]",
    slots: [
      { label: "something bad", pool: "bad_things" },
      { label: "good by comparison", pool: "positive_traits" }
    ]
  },
  {
    id: "at_least_x",
    template: "At least [slot0] — you're just [slot1]",
    slots: [
      { label: "has a point", pool: "things_with_purpose" },
      { label: "what you are", pool: "purposeless_things" }
    ]
  },
  {
    id: "x_called",
    template: "[slot0] called — they want [slot1] back",
    slots: [
      { label: "who's calling", pool: "disappointed_callers" },
      { label: "what they want", pool: "things_they_want_back" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SETUP/PAYOFF - twist structures
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "best_worst",
    template: "The best thing about you? [slot0]. The worst? [slot1]",
    slots: [
      { label: "sarcastic 'best'", pool: "sarcastic_compliments" },
      { label: "brutal worst", pool: "brutal_truths" }
    ]
  },
  {
    id: "you_peaked",
    template: "You peaked [slot0] — and honestly, [slot1]",
    slots: [
      { label: "when you peaked", pool: "peak_moments" },
      { label: "the sad truth", pool: "peak_commentary" }
    ]
  },
  {
    id: "give_off_energy",
    template: "You give off [slot0] energy — the kind that [slot1]",
    slots: [
      { label: "specific energy", pool: "specific_energies" },
      { label: "consequence", pool: "energy_consequences" }
    ]
  },
  {
    id: "if_x_had_face",
    template: "If [slot0] had a face, it would [slot1]",
    slots: [
      { label: "abstract concept", pool: "abstract_concepts" },
      { label: "be you because...", pool: "face_conclusions" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DEVASTATING CLOSERS - maximum damage
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "what_happens_when",
    template: "You're what happens when [slot0] gets [slot1]",
    slots: [
      { label: "something that fails", pool: "things_that_fail" },
      { label: "bad outcome", pool: "bad_outcomes" }
    ]
  },
  {
    id: "somewhere_someone",
    template: "Somewhere, [slot0] is [slot1] — and it's your fault",
    slots: [
      { label: "who's disappointed", pool: "disappointed_entities" },
      { label: "what they're doing", pool: "disappointment_actions" }
    ]
  },
  {
    id: "not_failure_youre",
    template: "You're not a failure, you're [slot0] — [slot1]",
    slots: [
      { label: "type of failure", pool: "failure_types" },
      { label: "with a twist", pool: "failure_elaborations" }
    ]
  },
  {
    id: "they_say_but",
    template: "They say [slot0], but you're proof that [slot1]",
    slots: [
      { label: "inspirational quote", pool: "inspirational_sayings" },
      { label: "the exception", pool: "brutal_exceptions" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW STRUCTURES - variety in rhythm and format
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "if_you_were",
    template: "If you were a [slot0], you'd be [slot1]",
    slots: [
      { label: "category", pool: "categories" },
      { label: "the worst example", pool: "worst_examples" }
    ]
  },
  {
    id: "you_have_energy_of",
    template: "You have the energy of [slot0] at [slot1]",
    slots: [
      { label: "a person", pool: "sad_people" },
      { label: "a place/moment", pool: "sad_places" }
    ]
  },
  {
    id: "looking_at_you",
    template: "Looking at you is like [slot0] — [slot1]",
    slots: [
      { label: "an experience", pool: "unpleasant_experiences" },
      { label: "but worse somehow", pool: "worse_somehow" }
    ]
  },
  {
    id: "you_could_be",
    template: "You could be [slot0], but instead you chose [slot1]",
    slots: [
      { label: "something good", pool: "wasted_potential" },
      { label: "this disaster", pool: "chosen_disasters" }
    ]
  },
  {
    id: "every_time_you",
    template: "Every time you [slot0], a [slot1]",
    slots: [
      { label: "do something", pool: "things_you_do" },
      { label: "consequence happens", pool: "cosmic_consequences" }
    ]
  },
  {
    id: "youre_the_reason",
    template: "You're the reason [slot0] has [slot1]",
    slots: [
      { label: "something/someone", pool: "affected_things" },
      { label: "a problem", pool: "resulting_problems" }
    ]
  },
  {
    id: "somehow_you_made",
    template: "Somehow you made [slot0] into [slot1]",
    slots: [
      { label: "something normal", pool: "normal_things" },
      { label: "a red flag", pool: "red_flags" }
    ]
  },
  {
    id: "in_a_room_of",
    template: "In a room full of [slot0], you'd still be [slot1]",
    slots: [
      { label: "bad options", pool: "bad_options" },
      { label: "the worst choice", pool: "worst_choices" }
    ]
  },
  {
    id: "you_treat_x_like",
    template: "You treat [slot0] like it's [slot1]",
    slots: [
      { label: "something important", pool: "important_things" },
      { label: "something worthless", pool: "worthless_things" }
    ]
  },
  {
    id: "your_personality_is",
    template: "Your personality is just [slot0] in [slot1]",
    slots: [
      { label: "a flaw", pool: "personality_flaws" },
      { label: "a trench coat", pool: "disguises" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // QUESTION FORMATS - interrogative burns
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "did_anyone_tell_you",
    template: "Did anyone ever tell you that you [slot0]? Because [slot1]",
    slots: [
      { label: "an observation", pool: "awkward_observations" },
      { label: "the punchline", pool: "observation_punchlines" }
    ]
  },
  {
    id: "you_know_how",
    template: "You know how [slot0]? You're [slot1]",
    slots: [
      { label: "a bad thing exists", pool: "things_that_exist" },
      { label: "the reason why", pool: "reason_why" }
    ]
  },
  {
    id: "remember_when",
    template: "Remember when [slot0]? That was [slot1]",
    slots: [
      { label: "you did something", pool: "things_you_did" },
      { label: "the verdict", pool: "brutal_verdicts" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SIMILE BURNS - "like a..." patterns
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "about_as_useful",
    template: "You're about as useful as [slot0] at [slot1]",
    slots: [
      { label: "something useless", pool: "useless_things" },
      { label: "a bad situation", pool: "bad_situations" }
    ]
  },
  {
    id: "the_emotional_range",
    template: "You have the emotional range of [slot0] and the self-awareness of [slot1]",
    slots: [
      { label: "something flat", pool: "flat_things" },
      { label: "something oblivious", pool: "oblivious_things" }
    ]
  },
  {
    id: "charisma_of",
    template: "You have the charisma of [slot0] and the charm of [slot1]",
    slots: [
      { label: "something dull", pool: "dull_things" },
      { label: "something off-putting", pool: "off_putting_things" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONDITIONAL BURNS - if/then structures
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "if_looks_could",
    template: "If [slot0] could kill, yours would [slot1]",
    slots: [
      { label: "something of yours", pool: "your_attributes" },
      { label: "a pathetic outcome", pool: "pathetic_outcomes" }
    ]
  },
  {
    id: "if_i_wanted",
    template: "If I wanted [slot0], I'd [slot1] — not talk to you",
    slots: [
      { label: "something bad", pool: "unwanted_experiences" },
      { label: "how to get it", pool: "how_to_suffer" }
    ]
  },
  {
    id: "when_they_said",
    template: "When they said [slot0], they weren't talking about [slot1]",
    slots: [
      { label: "an inspirational phrase", pool: "misused_phrases" },
      { label: "what you did", pool: "what_you_did" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // POSSESSION BURNS - "your X is Y" patterns
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "your_existence_is",
    template: "Your existence is [slot0] — [slot1]",
    slots: [
      { label: "a harsh description", pool: "existence_descriptions" },
      { label: "with a twist", pool: "existence_twists" }
    ]
  },
  {
    id: "your_autobiography",
    template: "Your autobiography would be called '[slot0]' and nobody would [slot1]",
    slots: [
      { label: "a sad title", pool: "sad_book_titles" },
      { label: "read/buy it", pool: "book_fates" }
    ]
  },
  {
    id: "your_face_looks",
    template: "Your face looks like [slot0] going through [slot1]",
    slots: [
      { label: "something sad", pool: "sad_nouns" },
      { label: "a bad experience", pool: "bad_experiences" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTION BURNS - what you do/cause
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "you_walk_into",
    template: "When you walk into a room, [slot0] — [slot1]",
    slots: [
      { label: "what happens", pool: "room_reactions" },
      { label: "and it's telling", pool: "telling_details" }
    ]
  },
  {
    id: "you_bring_down",
    template: "You could bring down [slot0] just by [slot1]",
    slots: [
      { label: "something good", pool: "good_vibes" },
      { label: "existing near it", pool: "your_presence" }
    ]
  },
  {
    id: "watching_you",
    template: "Watching you [slot0] is like [slot1]",
    slots: [
      { label: "do something", pool: "things_to_watch" },
      { label: "a painful comparison", pool: "painful_comparisons" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPINION BURNS - what others think
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "people_dont_dislike",
    template: "People don't dislike you, they [slot0] — [slot1]",
    slots: [
      { label: "something worse", pool: "worse_than_dislike" },
      { label: "the distinction", pool: "important_distinctions" }
    ]
  },
  {
    id: "youre_the_type",
    template: "You're the type of person who [slot0] and thinks [slot1]",
    slots: [
      { label: "does something wrong", pool: "wrong_behaviors" },
      { label: "it's fine", pool: "delusional_thoughts" }
    ]
  },
  {
    id: "everyone_who_meets",
    template: "Everyone who meets you [slot0] — [slot1]",
    slots: [
      { label: "has the same reaction", pool: "common_reactions" },
      { label: "and you don't notice", pool: "you_dont_notice" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // METAPHOR BURNS - extended comparisons
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "if_disappointment",
    template: "If disappointment was [slot0], you'd be [slot1]",
    slots: [
      { label: "a category", pool: "disappointment_categories" },
      { label: "the worst example", pool: "disappointment_examples" }
    ]
  },
  {
    id: "in_the_movie",
    template: "In the movie of your life, [slot0] would [slot1]",
    slots: [
      { label: "who/what", pool: "movie_subjects" },
      { label: "what they'd do", pool: "movie_actions" }
    ]
  },
  {
    id: "youre_proof",
    template: "You're living proof that [slot0] doesn't guarantee [slot1]",
    slots: [
      { label: "something good", pool: "supposed_advantages" },
      { label: "success", pool: "success_types" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIME-BASED BURNS - past/present/future
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "in_ten_years",
    template: "In ten years, you'll still be [slot0] — [slot1]",
    slots: [
      { label: "doing something sad", pool: "future_sadness" },
      { label: "and nobody will be surprised", pool: "unsurprising_futures" }
    ]
  },
  {
    id: "you_were_born",
    template: "You were born to [slot0], but somehow you [slot1]",
    slots: [
      { label: "do something", pool: "born_to_do" },
      { label: "failed at even that", pool: "how_you_failed" }
    ]
  },
  {
    id: "history_will",
    template: "History will remember you as [slot0] — [slot1]",
    slots: [
      { label: "a footnote", pool: "historical_footnotes" },
      { label: "if at all", pool: "historical_caveats" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // WORDPLAY BURNS - setups for clever combinations
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "the_only_thing",
    template: "The only thing [slot0] about you is [slot1]",
    slots: [
      { label: "a positive trait", pool: "positive_adjectives" },
      { label: "the backhanded truth", pool: "backhanded_truths" }
    ]
  },
  {
    id: "on_a_scale",
    template: "On a scale of [slot0], you're [slot1]",
    slots: [
      { label: "one to ten", pool: "rating_scales" },
      { label: "the roast", pool: "scale_results" }
    ]
  },
  {
    id: "scientists_study",
    template: "Scientists should study you — you're [slot0] that [slot1]",
    slots: [
      { label: "a phenomenon", pool: "phenomena" },
      { label: "defies expectations", pool: "defies_expectations" }
    ]
  }
];
