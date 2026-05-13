export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Quantitative Finance",
    items: [
      "Derivatives Pricing",
      "Black–Scholes",
      "Heston Model",
      "Merton Jump-Diffusion",
      "GARCH",
      "Monte Carlo",
      "Vasicek Rates",
      "Greeks & Hedging",
      "Implied Volatility"
    ]
  },
  {
    category: "Risk & Portfolio",
    items: [
      "Value at Risk (Historical / Parametric / MC)",
      "Expected Shortfall (CVaR)",
      "Kupiec & Christoffersen Backtests",
      "Stress Testing",
      "Component VaR",
      "Ledoit–Wolf Shrinkage",
      "Mean–Variance Optimization",
      "Tracking Error",
      "Fama–French Attribution"
    ]
  },
  {
    category: "Machine Learning & AI",
    items: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "LSTM / RNN",
      "Reinforcement Learning",
      "Q-Learning",
      "LLMs",
      "RAG",
      "FAISS",
      "LangChain",
      "TinyML"
    ]
  },
  {
    category: "Languages & Tools",
    items: [
      "Python",
      "R",
      "C / C++",
      "SQL",
      "Bash",
      "Git",
      "Streamlit",
      "Jupyter",
      "pandas",
      "NumPy",
      "SciPy",
      "Bloomberg Terminal"
    ]
  },
  {
    category: "Data & Markets",
    items: [
      "FRED",
      "yfinance",
      "Options Chain Data",
      "ETF Universe Construction",
      "Cross-Asset Datasets",
      "Time-Series Econometrics"
    ]
  }
];
