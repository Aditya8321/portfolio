export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  upcoming?: boolean;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    company: "Traxys Group",
    role: "AI & Middle Office Process Optimization Intern",
    location: "New York, NY",
    start: "Jun 2026",
    end: "Aug 2026",
    upcoming: true,
    bullets: [
      "Joining the Middle Office team at a global physical-commodities trading firm.",
      "Applying AI and automation to real operational workflows across trading and risk.",
      "Focus on reducing manual overhead and improving data quality in production processes."
    ],
    tags: ["AI Automation", "Middle Office", "Commodities", "Process Optimization"]
  },
  {
    company: "NYU Tandon School of Engineering",
    role: "Graduate Teaching Assistant, Deep Learning in Finance (FRE-GY 7871)",
    location: "Brooklyn, NY",
    start: "Jan 2026",
    end: "May 2026",
    bullets: [
      "Teaching assistant for Prof. Ken Perry's graduate course on deep learning applied to financial markets.",
      "Supporting student projects in time-series modeling, sequence models, and reinforcement learning for trading.",
      "Designing problem sets that bridge classical financial econometrics with modern deep-learning architectures.",
      "Collaborating with Prof. Perry on a GRPO option-pricing research project: fine-tuned a base LLM via LoRA-SFT and GRPO on Black-Scholes tool calls, lifting parse rate from 0% to 100%."
    ],
    tags: ["Deep Learning", "Teaching", "PyTorch", "Time Series"]
  },
  {
    company: "IAQF, International Association for Quantitative Finance",
    role: "Team Captain, Team Sharpe Minds (Winner, 15th Annual Student Competition)",
    location: "Remote / NYU Tandon",
    start: "Jan 2026",
    end: "Apr 2026",
    bullets: [
      "Captained a six-person team to win the 15th Annual IAQF Academic Affiliate Student Competition (6 winners selected from 31 submissions across 15+ universities).",
      "Co-authored the winning paper Pegged Until It's Not: Stablecoin Risk and Market Dislocation, examining cross-currency dynamics under the GENIUS Act with the March 2023 SVB episode as a natural experiment.",
      "Advised by Prof. Andrey Itkin; coordinated research, modeling, and writing across the team."
    ],
    tags: ["Stablecoins", "Cross-currency", "Crisis Modeling", "Research"]
  },
  {
    company: "NYU Tandon School of Engineering",
    role: "MS Financial Engineering Candidate (4.0 / 4.0 GPA)",
    location: "Brooklyn, NY",
    start: "Aug 2025",
    end: "May 2027",
    current: true,
    bullets: [
      "Coursework spans Machine Learning in Financial Engineering, Quantitative Methods, Derivatives, and Deep Learning.",
      "Hands-on projects: GARCH/Monte-Carlo option pricing, delta-hedged portfolio simulation, systematic mean-reversion, multi-asset VaR engines.",
      "Bloomberg Market Concepts (BMC) certified and Akuna Capital Options 101 + 201 alumnus."
    ],
    tags: ["MSFE", "Quant Finance", "Derivatives", "ML"]
  },
  {
    company: "DRC Systems",
    role: "Machine Learning Intern",
    location: "Gandhinagar, Gujarat, India",
    start: "Jun 2024",
    end: "Jul 2024",
    bullets: [
      "Deployed a BERT-based resume parsing pipeline (NER, QA, zero-shot classification) processing 10,000+ resumes.",
      "Achieved 92% entity-extraction F1, cutting recruiter screening time by 70%.",
      "Productionized the model with Python tooling and integration into the recruiting workflow."
    ],
    tags: ["BERT", "NLP", "Python", "Deep Learning"]
  },
  {
    company: "4C Consulting (Technology Division)",
    role: "Data Analyst Intern",
    location: "Ahmedabad, Gujarat, India",
    start: "Jul 2023",
    end: "Aug 2023",
    bullets: [
      "Constructed end-to-end preprocessing pipelines (imputation, encoding, outlier removal) on 50,000+ banking records.",
      "Improved downstream model AUC from 0.72 to 0.84 (+17%) through cleaner feature engineering.",
      "Built reporting and visualization dashboards in Tableau and PowerBI for the consulting team."
    ],
    tags: ["Data Analytics", "Tableau", "PowerBI", "Banking"]
  },
  {
    company: "Institute of Technology, Nirma University",
    role: "B.Tech. in Computer Science & Engineering",
    location: "Ahmedabad, India",
    start: "Aug 2021",
    end: "May 2025",
    bullets: [
      "Published three peer-reviewed papers in IEEE and ICICT venues on TinyML UAV surveillance, Q-learning collision avoidance, and ML for stock prediction.",
      "Researched under Prof. Priyank Thakkar on AI and deep learning across smart-city, autonomous-systems, and finance domains.",
      "Built strong foundations in algorithms, systems, and applied machine learning."
    ],
    tags: ["Research", "Machine Learning", "Deep Learning", "Reinforcement Learning"]
  }
];
