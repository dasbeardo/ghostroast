/**
 * Fake sponsor ads for ad breaks during API loading.
 * Each ad has:
 * - sponsor: Company/product name
 * - image: Image file or emoji placeholder
 * - imageBg: Background color for emoji placeholders
 * - text: The "radio ad transcript" that types out
 * - revealAt: (optional) Word that triggers image reveal
 */

export const ADS = [
  {
    sponsor: "Eternal Rest Mattresses",
    image: "🛏️",
    imageBg: "#2a1a4a",
    text: "Are you tired? Of course you are — you're DEAD. But that doesn't mean you can't be comfortable. Eternal Rest Mattresses: memory foam that remembers your life so you don't have to. Now available in Twin, Queen, and Open Casket sizes. Eternal Rest — because you're already dead. Might as well be comfortable.",
    revealAt: "DEAD"
  },
  {
    sponsor: "Ecto-Glow Skincare",
    image: "✨",
    imageBg: "#1a3a2a",
    text: "Is your spectral form looking a little... faded? Translucent in all the wrong places? Try Ecto-Glow, the only skincare line formulated specifically for the deceased. Our patented Spirit Radiance Complex will have you haunting at your absolute best. Ecto-Glow: For that 'freshly haunted' look. Side effects may include visibility to the living.",
    revealAt: "faded"
  },
  {
    sponsor: "Spirit Airlines",
    image: "✈️",
    imageBg: "#1a2a4a",
    text: "You know us. You've always known us. Spirit Airlines — we were ALWAYS for the dead, really. Now offering direct flights between all seven circles, with convenient layovers in Purgatory. No baggage fees because you can't take it with you anyway. Spirit Airlines: The afterlife's most affordable carrier. Leg room not guaranteed. Legs not guaranteed.",
    revealAt: "dead"
  },
  {
    sponsor: "Mort's Mortuary & Martini Bar",
    image: "🍸",
    imageBg: "#3a2a1a",
    text: "Looking for a place where everybody knows your name... because it's on the toe tag? Come on down to Mort's Mortuary & Martini Bar! Happy hour is every hour, because time has no meaning here. Try our signature cocktail, 'The Formaldehyde Fizz' — it's to die for. Again. Mort's: Where every hour is happy hour... because time is meaningless.",
    revealAt: "toe tag"
  },
  {
    sponsor: "The Afterlife Network",
    image: "📺",
    imageBg: "#2a2a3a",
    text: "Stay tuned to the Afterlife Network! Coming up next: 'Cooking With Corpses' — this week, Chef Bones makes a casserole to die for. Then at 8, it's 'The Haunting Hour' followed by 'So You Think You Can Possess.' The Afterlife Network: We've got programming for eternity. Literally. You're stuck with us.",
    revealAt: "Corpses"
  },
  {
    sponsor: "Haunt-A-Home Realty",
    image: "🏚️",
    imageBg: "#1a1a2a",
    text: "Still haunting that drafty old Victorian? It's time for an upgrade. Haunt-A-Home Realty specializes in properties perfect for the discerning specter. From cozy crypts to spacious manor houses with excellent scare-through traffic. We'll find you a place to call home... forever. Haunt-A-Home: Find your forever home. Again.",
    revealAt: "Victorian"
  },
  {
    sponsor: "GhostWriter Pro",
    image: "📝",
    imageBg: "#2a3a2a",
    text: "Need to send a message to the living? Tired of laboriously moving Ouija board planchettes? Introducing GhostWriter Pro — the spectral word processor that lets you write on mirrors, steam up windows, and leave mysterious notes with ease. Compatible with all major haunting platforms. GhostWriter Pro: Your words, their nightmares.",
    revealAt: "Ouija"
  },
  {
    sponsor: "Limbo Fitness",
    image: "💪",
    imageBg: "#3a1a2a",
    text: "Just because you're dead doesn't mean you should let yourself go. Limbo Fitness offers state-of-the-art workout facilities for spirits of all transparency levels. Our certified trainers will help you achieve the ethereal body you've always wanted. Classes include Chain Rattling Cardio and Poltergeist Pilates. Limbo Fitness: Get fit for eternity.",
    revealAt: "dead"
  },
  {
    sponsor: "Séance & Sensibility Dating",
    image: "💀❤️",
    imageBg: "#4a1a3a",
    text: "Lonely in the afterlife? Finding it hard to connect when you can't technically touch anything? Séance & Sensibility is the premier dating service for the romantically deceased. Our patented Ectoplasm Matching algorithm has a 73% success rate. Find your boo... literally. Séance & Sensibility: Love that transcends death. Again.",
    revealAt: "Lonely"
  },
  {
    sponsor: "Possession Insurance",
    image: "🛡️",
    imageBg: "#1a3a3a",
    text: "Are you properly covered? Possession Insurance protects you from exorcism-related displacement, holy water damage, and unauthorized séance callbacks. With plans starting at just your eternal soul, you can haunt with confidence. Possession Insurance: Because you never know when a priest might show up.",
    revealAt: "exorcism"
  },
  {
    sponsor: "The Void Café",
    image: "☕",
    imageBg: "#0a0a1a",
    text: "Stare into the abyss. The abyss stares back. The abyss asks if you want cream and sugar. The Void Café serves the finest existential dread alongside our artisanal dark roast. Try our new Nihilism Nitro Cold Brew — it tastes like nothing matters, because it doesn't. The Void Café: Where the coffee is as dark as your soul.",
    revealAt: "abyss"
  },
  {
    sponsor: "Casket & Barrel",
    image: "🪦",
    imageBg: "#2a2a1a",
    text: "Upgrade your eternal resting experience with Casket & Barrel, the afterlife's premier home goods store. From luxurious burial shrouds to decorative urns that really tie the crypt together. This week only: 20% off all commemorative headstones. Casket & Barrel: Making death feel like home since 1847.",
    revealAt: "burial shrouds"
  }
];

// Helper to get random ads for an ad break
export function getRandomAds(count = 3) {
  const shuffled = [...ADS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default ADS;
