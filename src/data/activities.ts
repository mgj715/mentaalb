export type Activity = {
  id: string;
  title: string;
  description: string;
  duration: string;
  tips: string[];
};

export const MOVEMENT: Activity[] = [
  {
    id: "mv-1",
    title: "5-minute morning stretch",
    description: "A gentle full-body stretch to ease tension and wake up your muscles without any equipment.",
    duration: "5 min",
    tips: ["Roll your shoulders slowly forward and back", "Reach for the sky, then touch your toes", "Twist your torso gently left and right"],
  },
  {
    id: "mv-2",
    title: "Mindful walking",
    description: "Step outside and walk slowly. Focus on each footstep and the feeling of fresh air on your skin.",
    duration: "10–15 min",
    tips: ["Leave your phone on silent", "Notice five things you can see", "Match your breathing to your steps"],
  },
  {
    id: "mv-3",
    title: "Dance it out",
    description: "Put on a favourite song and let your body move however it wants. No choreography, no rules.",
    duration: "3–5 min",
    tips: ["Close your eyes if it feels safe", "Shake out your hands first", "Smile — even if you have to fake it at first"],
  },
];

export const CREATIVE: Activity[] = [
  {
    id: "cr-1",
    title: "Stream-of-consciousness journaling",
    description: "Set a timer and write whatever comes to mind. Don't edit, don't judge — just let the words flow.",
    duration: "10 min",
    tips: ["Start with 'Right now I feel…'", "Keep the pen moving the whole time", "You can throw the page away afterwards"],
  },
  {
    id: "cr-2",
    title: "Colour & breathe",
    description: "Pick up some coloured pencils and fill in shapes — a colouring book page, doodles, anything repetitive.",
    duration: "15–20 min",
    tips: ["Choose calming colours like blue or green", "Focus on staying inside the lines", "Pair it with soft background music"],
  },
  {
    id: "cr-3",
    title: "Playlist therapy",
    description: "Build a short playlist that matches your mood, then one that matches how you'd like to feel.",
    duration: "10 min",
    tips: ["Start with 3 songs that describe now", "Add 3 songs for where you want to be", "Press play and notice the shift"],
  },
];

export const CONNECTION: Activity[] = [
  {
    id: "cn-1",
    title: "Send a 'thinking of you' message",
    description: "Pick one person and send a short, genuine message. It can be as simple as 'Hey, I thought of you today.'",
    duration: "2 min",
    tips: ["No pressure for a long conversation", "A meme or photo counts too", "It's okay if they don't reply right away"],
  },
  {
    id: "cn-2",
    title: "Gratitude check-in",
    description: "Write down three things you're grateful for and share one with someone you trust.",
    duration: "5 min",
    tips: ["They can be tiny things", "Text, voice note, or say it in person", "Notice how it feels to share"],
  },
  {
    id: "cn-3",
    title: "Parallel togetherness",
    description: "Sit with someone and do separate activities — reading, drawing, scrolling. Just being near each other helps.",
    duration: "20+ min",
    tips: ["No need to talk", "A coffee shop counts", "Pets count as 'someone' too"],
  },
];
