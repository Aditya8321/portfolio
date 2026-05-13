export const site = {
  name: "Aditya Shah",
  shortName: "Aditya",
  initials: "AS",
  domain: "adityashah.work",
  url: "https://adityashah.work",
  email: "as22008@nyu.edu",
  github: "https://github.com/Aditya8321",
  githubHandle: "Aditya8321",
  linkedin: "https://linkedin.com/in/adityashah2901",
  linkedinHandle: "adityashah2901",
  location: "New York City",
  tagline: "Quant researcher at the intersection of reinforcement learning, LLMs, and derivatives.",
  longTagline:
    "Building rigorous, risk-aware systems for modern markets: from delta-hedged options to factor risk decomposition to LLM-powered financial intelligence. Open to AI in Finance roles.",
  description:
    "Aditya Shah, NYU Tandon MSFE (4.0 GPA), IAQF 2026 Winner, and incoming AI Automation Intern at Traxys Group. Quant research at the intersection of reinforcement learning, LLMs, and derivatives. Open to AI in Finance roles.",
  status: {
    badge: "Open to Spring 2027 / Summer 2027",
    text: "Spring 2027 Internships · Summer 2027 Full-time · AI in Finance"
  },
  heroStats: [
    { label: "GPA at NYU Tandon MSFE", value: "4.0", suffix: "/ 4.0" },
    { label: "IAQF 2026 Competition", value: "Winner", suffix: "Team Captain" },
    { label: "Peer-reviewed publications", value: "3", suffix: "IEEE / ICICT" },
    { label: "Quant & risk projects", value: "20+", suffix: "Shipped" }
  ]
} as const;

export type Site = typeof site;
