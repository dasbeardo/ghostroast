export const TEMPLATES = [
  // SIMPLE PUNCHY (2 slots)
  {
    template: "You're the human equivalent of [slot0] — [slot1]",
    slots: [
      { label: "thing", pool: "pathetic_things" },
      { label: "and it shows", pool: "it_shows" }
    ]
  },
  {
    template: "I'd call you [slot0], but even that has [slot1]",
    slots: [
      { label: "insult", pool: "mild_insults" },
      { label: "at least...", pool: "at_least" }
    ]
  },
  {
    template: "You [slot0] like someone who [slot1]",
    slots: [
      { label: "verb", pool: "verbs" },
      { label: "tragic backstory", pool: "tragic_backstories" }
    ]
  },
  {
    template: "Your whole vibe is [slot0] — [slot1]",
    slots: [
      { label: "energy", pool: "energy_types" },
      { label: "specifically", pool: "specifically" }
    ]
  },
  {
    template: "You're not [slot0], you're [slot1] — there's a difference",
    slots: [
      { label: "what you think", pool: "what_you_think" },
      { label: "what you are", pool: "what_you_are" }
    ]
  },

  // COMPARISON BURNS (2 slots)
  {
    template: "You make [slot0] look [slot1]",
    slots: [
      { label: "something bad", pool: "bad_things" },
      { label: "good by comparison", pool: "good_by_comparison" }
    ]
  },
  {
    template: "At least [slot0] — you're just [slot1]",
    slots: [
      { label: "has a point", pool: "has_a_point" },
      { label: "what you are", pool: "just_what" }
    ]
  },
  {
    template: "[slot0] called — they want [slot1] back",
    slots: [
      { label: "who called", pool: "who_called" },
      { label: "what they want", pool: "what_they_want" }
    ]
  },

  // SETUP/PAYOFF (2 slots)
  {
    template: "The best thing about you? [slot0]. The worst? [slot1]",
    slots: [
      { label: "best (sarcastic)", pool: "best_sarcastic" },
      { label: "worst (real)", pool: "worst_real" }
    ]
  },
  {
    template: "You peaked [slot0] — and honestly, [slot1]",
    slots: [
      { label: "when", pool: "peaked_when" },
      { label: "commentary", pool: "peaked_commentary" }
    ]
  },
  {
    template: "You give off [slot0] energy — the kind that [slot1]",
    slots: [
      { label: "energy", pool: "specific_energies" },
      { label: "consequence", pool: "energy_consequences" }
    ]
  },
  {
    template: "If [slot0] had a face, it would [slot1]",
    slots: [
      { label: "concept", pool: "abstract_concepts" },
      { label: "be you how", pool: "be_you_how" }
    ]
  },

  // DEVASTATING CLOSERS (2 slots)
  {
    template: "You're what happens when [slot0] gets [slot1]",
    slots: [
      { label: "thing", pool: "things_that_fail" },
      { label: "outcome", pool: "bad_outcomes" }
    ]
  },
  {
    template: "Somewhere, [slot0] is [slot1] — and it's your fault",
    slots: [
      { label: "someone", pool: "disappointed_people" },
      { label: "doing what", pool: "disappointed_actions" }
    ]
  },
  {
    template: "You're not a failure, you're [slot0] — [slot1]",
    slots: [
      { label: "what kind", pool: "types_of_failure" },
      { label: "elaboration", pool: "failure_elaboration" }
    ]
  },
  {
    template: "They say [slot0], but you're proof that [slot1]",
    slots: [
      { label: "they say", pool: "they_say" },
      { label: "you're proof", pool: "youre_proof" }
    ]
  }
];
