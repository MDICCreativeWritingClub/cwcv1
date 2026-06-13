export type Category =
  | "All"
  | "Fiction"
  | "Articles"
  | "Essays"
  | "Blogs"
  | "Features"
  | "Biographies"
  | "Reviews";

export interface Article {
  id: string;
  title: string;
  author: string;
  grade: string;
  category: Exclude<Category, "All">;
  excerpt: string;
  content: string;
  votes: number;
  month: string;
  isEditorChoice?: boolean;
}

export interface PastAwardee {
  month: string;
  year: number;
  name: string;
  grade: string;
  title: string;
  category: Exclude<Category, "All">;
  votes: number;
}

export interface StaffMember {
  name: string;
  role: string;
  period: string;
  type: "student" | "teacher";
  grade?: string;
}

export const currentTheme = {
  name: "Courage",
  month: "June 2026",
  description: "This month we explore what it means to be brave — not the absence of fear, but the decision to act in spite of it. Write about a moment of courage: your own, someone else's, or entirely imagined.",
};

export const articles: Article[] = [
  {
    id: "1",
    title: "The Last Lighthouse Keeper",
    author: "Ayesha Rahman",
    grade: "Grade 11 — AS-B",
    category: "Fiction",
    excerpt:
      "On the edge of a world that had forgotten the sea, one woman still kept the light alive. Every night she climbed the spiral stairs, her hands tracing the same cold iron rail...",
    content: `On the edge of a world that had forgotten the sea, one woman still kept the light alive. Every night she climbed the spiral stairs, her hands tracing the same cold iron rail, her breath fogging in the salt air. The ocean below churned black and restless, indifferent to the civilisation that had turned its back on it decades ago.

Her name was Mara. She had inherited the lighthouse from her father, who had inherited it from his mother before him — a lineage of keepers stretching back two centuries, each one choosing the beam of light over the warmth of the world inland.

"Why do you stay?" her nephew had asked when he visited, his city shoes muddied by the coastal path. He gestured at the emptiness — the crumbling harbour, the rusted buoys, the fishing boats long since retired to dry land. "There are no ships anymore."

Mara looked at the lamp behind its thick glass, steady and patient. "There are no ships yet," she said.

He left the next morning, shaking his head. Mara didn't watch him go. She was already polishing the lens.

That autumn, a storm tore in from the northwest — the kind that erased the horizon and turned the sky to hammered tin. Mara kept the light burning through three sleepless nights, feeding fuel, watching the glass, listening to the tower groan around her like a living thing.

On the fourth morning, with the storm just retreating, she saw it through the rain: a small vessel, battered and listing, finding its way to shore by the light she had kept.

She never knew who they were. They didn't stop. But as the boat passed the point, someone on deck raised a hand toward the tower.

Mara raised hers back.

That evening she climbed the stairs as she always did, and the lamp came alive as it always did. The sea spread out below her, dark and full of possibility. She thought about her father, and his mother, and all the ones before — all those quiet lives spent in service of a moment like this one.

There are no ships yet. Only yet.`,
    votes: 89,
    month: "June 2026",
    isEditorChoice: true,
  },
  {
    id: "2",
    title: "The Power of Silence in a Loud World",
    author: "Farhan Ahmed",
    grade: "Grade 10 — AS-A",
    category: "Articles",
    excerpt:
      "We live in an age terrified of quiet. Every pause in a conversation is filled with a phone screen, every commute is plugged with podcasts...",
    content: `We live in an age terrified of quiet. Every pause in a conversation is filled with a phone screen, every commute is plugged with podcasts, every waiting room hums with background television. We have built an entire civilisation around the avoidance of silence.

But silence, it turns out, is not empty. It is full.

Neuroscientists have found that the brain is most creatively active not when it is being stimulated, but during periods of quiet reflection — what researchers call the "default mode network." This is when we consolidate memories, form connections between ideas, and process emotion. In other words, the mind does its best work in the gaps we keep trying to eliminate.

There is wisdom in this that predates the science. Every major contemplative tradition in human history — from Islamic prayer to Buddhist meditation to Christian monasticism — understood that silence was not the absence of something, but the presence of something deeper. The question was never how to fill the silence. The question was how to listen to it.

For students especially, the implications are real. The habit of reaching for a screen the moment a task ends, or studying with music in the background "for focus," may feel productive. The research suggests otherwise. Attention, like a muscle, needs rest to grow stronger — and silence is that rest.

I am not suggesting we live like hermits. Connection, conversation, and creativity all have their place. But perhaps there is value in recovering the lost art of sitting quietly, of letting the mind wander without a destination, of discovering what rises to the surface when we stop drowning it out.

Try it for ten minutes. Just sit. See what the silence says.`,
    votes: 51,
    month: "June 2026",
  },
  {
    id: "3",
    title: "My First Week as a Prefect",
    author: "Nadia Islam",
    grade: "Grade 9 — AS-C",
    category: "Blogs",
    excerpt:
      "Monday started with a badge pinned to my chest and a feeling I can only describe as wearing someone else's confidence and hoping it fits...",
    content: `Monday started with a badge pinned to my chest and a feeling I can only describe as wearing someone else's confidence and hoping it fits. The prefect badge is small — smaller than I imagined when I used to look at the older students wearing theirs. But somehow it weighs more than I expected.

My first official duty was corridor monitoring during break. I stood near the science block holding a clipboard I didn't strictly need, watching students stream past in their usual chaos of laughter and half-eaten sandwiches. A few of the younger ones looked at me the way I once looked at prefects — like I had some secret knowledge about how to be responsible. I wanted to tell them I was figuring it out too.

By Wednesday I had learned three things: people will always find the one rule you're not watching, a stern look works better than shouting, and the teachers' lounge has biscuits on Tuesdays.

The hardest part wasn't the duties. It was the shift in how my friends looked at me — just slightly differently, like I had stepped half a foot to the left of where I used to stand. I was still me. But I was also now someone who was supposed to set an example, which meant being aware of myself in a way that felt uncomfortable and necessary at the same time.

By Friday I had relaxed into it. Not because I had figured everything out, but because I had accepted that I wouldn't. The badge doesn't mean you have all the answers. It means you're willing to show up and try to hold the space while everyone around you figures things out together.

That's what I think responsibility actually is. Not a destination. A direction.`,
    votes: 38,
    month: "June 2026",
  },
  {
    id: "4",
    title: "Social Media: A Generation's Downfall?",
    author: "Zayan Hossain",
    grade: "Grade 11 — AS-D",
    category: "Essays",
    excerpt:
      "The argument that social media is destroying young people is as popular as it is convenient. It gives every generation a villain for what was always a complicated story...",
    content: `The argument that social media is destroying young people is as popular as it is convenient. It gives every generation a villain for what was always a complicated story. Television was going to rot our minds. Video games were going to make us violent. And now, social media is going to ruin us entirely. And yet — here we are.

That is not to say the concern is baseless. The evidence is real: rising rates of anxiety among adolescents, shortened attention spans, the documented psychological effects of comparison culture and algorithmic reward. These are serious issues that deserve serious attention. But diagnosing them as the fault of social media alone is too simple, and simple diagnoses lead to simple — and wrong — solutions.

Social media did not create loneliness. It found it, and filled it badly. Social media did not create the pressure to perform. It amplified a pressure that already existed in schools, in families, in the looks we exchange in corridors. The platform is a mirror. What it reflects back to us is ourselves — our insecurities, our desire for belonging, our hunger for recognition. The discomfort of that reflection is real. But you don't fix a difficult reflection by breaking the mirror.

What is needed is not less technology, but better literacy. Students who understand how attention is monetised, how algorithms are designed, and how comparison is engineered are students who can engage with these platforms critically rather than passively. This is a skill — one that can be taught, like reading, like mathematics.

The generation labelled as destroyed may well be the one that learns to think most clearly about the systems trying to distract them. That outcome is not guaranteed. But it is possible. And it is worth working toward.`,
    votes: 64,
    month: "June 2026",
  },
  {
    id: "5",
    title: "Ibn Battuta: The Man Who Walked the World",
    author: "Sara Chowdhury",
    grade: "Grade 10 — AS-B",
    category: "Biographies",
    excerpt:
      "In 1325, a twenty-one-year-old from Tangier left home on what he imagined would be a pilgrimage to Mecca. He did not return for twenty-nine years...",
    content: `In 1325, a twenty-one-year-old from Tangier left home on what he imagined would be a pilgrimage to Mecca. He did not return for twenty-nine years. In that time, Ibn Battuta would cover approximately 117,000 kilometres — more than any traveller before him, and more than most would manage for centuries after.

He was not an explorer in the European sense, driven by conquest or cartography. He was a scholar, a judge, a pilgrim — a man who believed that learning required movement, that understanding a world so vast demanded you go and look at it yourself. He moved through the Islamic world as though it were his home, because in a meaningful sense it was: the shared language of Arabic and the shared structures of Islamic law gave him passage through dozens of kingdoms and cultures.

What makes Ibn Battuta extraordinary is not merely the distance, but the texture of his observation. His account, the Rihla, records not just geography but food, clothing, customs, legal systems, and personalities. He dined with sultans in Mali and Delhi. He witnessed the Black Death spreading through Persia. He was shipwrecked, robbed, nearly executed, and fell in love more than once. Through all of it, he kept observing.

There is something quietly inspiring about his life for those of us who feel the pull of the wider world and are not sure what to do with it. Ibn Battuta had no GPS, no flights, no hostels. He had curiosity, faith, and an extraordinary willingness to begin. He proved that the world opens up to those who are willing to step into it — even if they have no idea where the road will eventually lead.

He died around 1368, in Morocco, the land he had left as a young man. He had seen more of the world than almost any human alive. And yet, in the Rihla, he described himself simply as a traveller — someone still, always, on the way.`,
    votes: 43,
    month: "June 2026",
  },
  {
    id: "6",
    title: "The Alchemist: A Journey Within",
    author: "Rafid Kabir",
    grade: "Grade 12 — AS-A",
    category: "Reviews",
    excerpt:
      "Paulo Coelho's The Alchemist is the kind of book that arrives at exactly the right moment — or so it seems, because it is written so that every moment feels like the right one...",
    content: `Paulo Coelho's The Alchemist is the kind of book that arrives at exactly the right moment — or so it seems, because it is written so that every moment feels like the right one. That is both its gift and its limitation.

The novel follows Santiago, an Andalusian shepherd who dreams of finding treasure at the Egyptian pyramids. What he finds instead — and this is not a spoiler, because the book tells you from the beginning — is that the journey itself is the point. Along the way, he encounters the mysterious Melchizedek, an Englishman obsessed with alchemy, and the wise desert alchemist who gives the book its title. Each of them teaches him something about following what Coelho calls one's "Personal Legend" — the unique purpose that each person carries and so often fails to pursue.

The prose is spare and the philosophy accessible — almost to a fault. Coelho's ideas about destiny, the universe conspiring in our favour, and the language of the world are delivered so smoothly that they slide in without friction. For some readers, this will feel like revelation. For others, it risks feeling like a fortune cookie stretched to novel length.

But I think the criticism misses something. The Alchemist is not trying to be subtle. It is trying to be useful — to speak directly to the part of a reader who has a dream they have not yet had the courage to begin. And for that purpose, clarity is a feature, not a flaw.

I read it during examination season, when the future felt very large and my choices very small. The book did not give me answers. But it reminded me that having a direction matters more than having a map. That, I think, is what literature can do at its best — not tell us what to think, but clear a space in which we can think more freely.

I gave it four stars. The fifth it left for me to find myself.`,
    votes: 29,
    month: "June 2026",
  },
];

export const writerOfMonth = {
  name: "Ayesha Rahman",
  grade: "Grade 11 — AS-B",
  totalVotes: 89,
  pieces: 1,
  bio: "Ayesha is a Grade 11 student with a passion for literary fiction and magical realism. Her story 'The Last Lighthouse Keeper' earned the most votes this month across all her submissions.",
  featuredArticleId: "1",
};

export const leaderboard = [
  { rank: 1, name: "Ayesha Rahman", grade: "Grade 11", totalVotes: 89, pieces: 1 },
  { rank: 2, name: "Zayan Hossain", grade: "Grade 11", totalVotes: 64, pieces: 1 },
  { rank: 3, name: "Farhan Ahmed", grade: "Grade 10", totalVotes: 51, pieces: 1 },
  { rank: 4, name: "Sara Chowdhury", grade: "Grade 10", totalVotes: 43, pieces: 1 },
  { rank: 5, name: "Nadia Islam", grade: "Grade 9", totalVotes: 38, pieces: 1 },
];

export const categories: Category[] = [
  "All",
  "Fiction",
  "Articles",
  "Essays",
  "Blogs",
  "Features",
  "Biographies",
  "Reviews",
];

export const pastAwardees: PastAwardee[] = [
  { month: "May", year: 2026, name: "Zayan Hossain", grade: "Grade 11 — AS-D", title: "The Weight of Words", category: "Essays", votes: 72 },
  { month: "April", year: 2026, name: "Sara Chowdhury", grade: "Grade 10 — AS-B", title: "Voices from the Delta", category: "Biographies", votes: 58 },
  { month: "March", year: 2026, name: "Farhan Ahmed", grade: "Grade 10 — AS-A", title: "Between Two Worlds", category: "Articles", votes: 65 },
  { month: "February", year: 2026, name: "Lila Begum", grade: "Grade 12 — AS-C", title: "The Glass City", category: "Fiction", votes: 88 },
  { month: "January", year: 2026, name: "Omar Khan", grade: "Grade 11 — AS-A", title: "Running with the Tide", category: "Blogs", votes: 47 },
  { month: "December", year: 2025, name: "Nusrat Jahan", grade: "Grade 12 — AS-B", title: "Letters to December", category: "Fiction", votes: 93 },
  { month: "November", year: 2025, name: "Tariq Mahmud", grade: "Grade 10 — AS-D", title: "The Art of Unbecoming", category: "Essays", votes: 61 },
  { month: "October", year: 2025, name: "Priya Das", grade: "Grade 9 — AS-A", title: "Small Hours", category: "Blogs", votes: 54 },
  { month: "September", year: 2025, name: "Rafi Hasan", grade: "Grade 11 — AS-C", title: "No Country for Old Habits", category: "Articles", votes: 79 },
  { month: "August", year: 2025, name: "Laila Morshed", grade: "Grade 12 — AS-B", title: "What the River Keeps", category: "Fiction", votes: 84 },
  { month: "July", year: 2025, name: "Ahmed Sultan", grade: "Grade 11 — AS-A", title: "The Cartographer's Dilemma", category: "Essays", votes: 55 },
  { month: "June", year: 2025, name: "Mim Akter", grade: "Grade 12 — AS-D", title: "Song Without End", category: "Features", votes: 67 },
];

export const pastStaff: StaffMember[] = [
  { name: "Ms. Sabrina Akter", role: "Club Moderator & Faculty Advisor", period: "2024–Present", type: "teacher" },
  { name: "Mr. Kamal Uddin", role: "Faculty Advisor", period: "2021–2024", type: "teacher" },
  { name: "Ms. Fahmida Hossain", role: "English Department Coordinator", period: "2019–2022", type: "teacher" },
  { name: "Nusrat Jahan", role: "Editor-in-Chief", period: "2025–2026", type: "student", grade: "Grade 12" },
  { name: "Tariq Mahmud", role: "Deputy Editor", period: "2025–2026", type: "student", grade: "Grade 10" },
  { name: "Rafi Hasan", role: "Editor-in-Chief", period: "2024–2025", type: "student", grade: "Grade 11" },
  { name: "Priya Das", role: "Content Lead", period: "2024–2025", type: "student", grade: "Grade 9" },
  { name: "Laila Morshed", role: "Editor-in-Chief", period: "2023–2024", type: "student", grade: "Grade 12" },
  { name: "Ahmed Sultan", role: "Design Lead", period: "2023–2024", type: "student", grade: "Grade 11" },
  { name: "Mim Akter", role: "Editor-in-Chief", period: "2022–2023", type: "student", grade: "Grade 12" },
  { name: "Khalid Rahman", role: "Deputy Editor", period: "2022–2023", type: "student", grade: "Grade 11" },
];

export const archiveArticles: Article[] = [
  {
    id: "arch-1",
    title: "The Weight of Words",
    author: "Zayan Hossain",
    grade: "Grade 11 — AS-D",
    category: "Essays",
    excerpt: "Language shapes thought more deeply than we admit. The words we choose are not merely labels — they are the architecture of how we understand ourselves...",
    content: "Language shapes thought more deeply than we admit. The words we choose are not merely labels — they are the architecture of how we understand ourselves and each other.",
    votes: 72,
    month: "May 2026",
  },
  {
    id: "arch-2",
    title: "Voices from the Delta",
    author: "Sara Chowdhury",
    grade: "Grade 10 — AS-B",
    category: "Biographies",
    excerpt: "Three generations of women from the southern coast of Bangladesh — what binds them across time is not just blood, but the particular courage of staying...",
    content: "Three generations of women from the southern coast of Bangladesh — what binds them across time is not just blood, but the particular courage of staying.",
    votes: 58,
    month: "April 2026",
  },
  {
    id: "arch-3",
    title: "Between Two Worlds",
    author: "Farhan Ahmed",
    grade: "Grade 10 — AS-A",
    category: "Articles",
    excerpt: "What does it mean to be caught between the culture you were born into and the one you inhabit every day at school?",
    content: "What does it mean to be caught between the culture you were born into and the one you inhabit every day at school?",
    votes: 65,
    month: "March 2026",
  },
  {
    id: "arch-4",
    title: "The Glass City",
    author: "Lila Begum",
    grade: "Grade 12 — AS-C",
    category: "Fiction",
    excerpt: "In a city built entirely of mirrors, no one could lie — or so they believed. The problem was that reflection and truth are not the same thing...",
    content: "In a city built entirely of mirrors, no one could lie — or so they believed. The problem was that reflection and truth are not the same thing.",
    votes: 88,
    month: "February 2026",
  },
  {
    id: "arch-5",
    title: "Running with the Tide",
    author: "Omar Khan",
    grade: "Grade 11 — AS-A",
    category: "Blogs",
    excerpt: "I started running at 5am last January as a New Year's resolution. Six months later, I'm still going — but what I'm running toward has changed completely...",
    content: "I started running at 5am last January as a New Year's resolution. Six months later, I'm still going — but what I'm running toward has changed completely.",
    votes: 47,
    month: "January 2026",
  },
  {
    id: "arch-6",
    title: "Letters to December",
    author: "Nusrat Jahan",
    grade: "Grade 12 — AS-B",
    category: "Fiction",
    excerpt: "Every year on the first of December, she wrote a letter to herself — to be opened the following December. This is the story of what she found when she finally read them all...",
    content: "Every year on the first of December, she wrote a letter to herself — to be opened the following December. This is the story of what she found when she finally read them all.",
    votes: 93,
    month: "December 2025",
  },
  {
    id: "arch-7",
    title: "The Art of Unbecoming",
    author: "Tariq Mahmud",
    grade: "Grade 10 — AS-D",
    category: "Essays",
    excerpt: "We spend our teenage years becoming. But what if the more important work — the harder work — is learning what to leave behind?",
    content: "We spend our teenage years becoming. But what if the more important work — the harder work — is learning what to leave behind?",
    votes: 61,
    month: "November 2025",
  },
  {
    id: "arch-8",
    title: "No Country for Old Habits",
    author: "Rafi Hasan",
    grade: "Grade 11 — AS-C",
    category: "Articles",
    excerpt: "The hardest thing about growing up isn't the new responsibilities. It's realising that some of what you were taught simply doesn't hold anymore...",
    content: "The hardest thing about growing up isn't the new responsibilities. It's realising that some of what you were taught simply doesn't hold anymore.",
    votes: 79,
    month: "September 2025",
  },
];
