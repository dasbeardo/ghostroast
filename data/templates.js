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
  }
];
