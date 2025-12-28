export const TEMPLATES = [
  {
    template: "Your [slot0] looks like a [slot1] [slot2] that [slot3]",
    slots: [
      { label: "feature", pool: "features" },
      { label: "adjective", pool: "adjectives_broken" },
      { label: "sad thing", pool: "sad_objects" },
      { label: "ending", pool: "failure_outcomes" }
    ]
  },
  {
    template: "You [slot0] like a [slot1] [slot2]",
    slots: [
      { label: "verb", pool: "verbs_behavior" },
      { label: "adjective", pool: "adjectives_personality" },
      { label: "comparison", pool: "tech_failures" }
    ]
  },
  {
    template: "You're the human equivalent of [slot0] — [slot1] and [slot2]",
    slots: [
      { label: "sad thing", pool: "sad_objects" },
      { label: "trait", pool: "trait_contradictions" },
      { label: "and also", pool: "trait_intensifiers" }
    ]
  },
  {
    template: "If [slot0] was a person, it would [slot1] — and that's just you",
    slots: [
      { label: "concept", pool: "abstract_concepts" },
      { label: "action", pool: "concept_actions" }
    ]
  },
  {
    template: "I've seen [slot0] [slot1] with more [slot2] than you",
    slots: [
      { label: "adjective", pool: "adjectives_broken" },
      { label: "things", pool: "sad_places" },
      { label: "quality", pool: "positive_traits" }
    ]
  },
  {
    template: "Your [slot0] is what happens when [slot1] gets [slot2]",
    slots: [
      { label: "trait", pool: "features" },
      { label: "thing", pool: "sad_objects" },
      { label: "outcome", pool: "failure_outcomes" }
    ]
  },
  {
    template: "You give off [slot0] energy — specifically, [slot1] [slot2]",
    slots: [
      { label: "energy type", pool: "energy_types" },
      { label: "descriptor", pool: "adjectives_personality" },
      { label: "context", pool: "contexts" }
    ]
  },
  {
    template: "Somehow you managed to be [slot0] and [slot1] at the same time — [slot2]",
    slots: [
      { label: "trait 1", pool: "trait_contradictions" },
      { label: "trait 2", pool: "trait_intensifiers" },
      { label: "conclusion", pool: "conclusions" }
    ]
  },
  {
    template: "Looking at you is like looking at [slot0] — [slot1] yet [slot2]",
    slots: [
      { label: "place", pool: "sad_places" },
      { label: "observation", pool: "persistence_descriptions" },
      { label: "but also", pool: "conclusions" }
    ]
  },
  {
    template: "Your [slot0] has the same energy as [slot1] — [slot2]",
    slots: [
      { label: "trait", pool: "features" },
      { label: "comparison", pool: "long_comparisons" },
      { label: "description", pool: "persistence_descriptions" }
    ]
  },
  {
    template: "You peaked [slot0], and honestly, [slot1] — that's [slot2]",
    slots: [
      { label: "when", pool: "peak_timing" },
      { label: "commentary", pool: "peak_commentary" },
      { label: "conclusion", pool: "conclusions" }
    ]
  },
  {
    template: "The only [slot0] you've ever had is [slot1] — and even that [slot2]",
    slots: [
      { label: "positive trait", pool: "positive_traits" },
      { label: "source", pool: "fluke_sources" },
      { label: "outcome", pool: "fluke_outcomes" }
    ]
  }
];
