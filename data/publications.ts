export type Publication = {
  id: string;
  title: string;
  venue: string;
  year: number;
  status: "Winner" | "Published" | "Accepted";
  authors: string;
  abstract: string;
  tags: string[];
  pdf?: string;
  external?: string;
};

export const publications: Publication[] = [
  {
    id: "iaqf-stablecoin-2026",
    title: "Pegged… Until It's Not: Stablecoin Risk and Market Dislocation",
    venue: "15th Annual IAQF Academic Affiliate Student Competition",
    year: 2026,
    status: "Winner",
    authors:
      "Aditya Shah (Captain), Sparsh Patel, Param Shah, Anmol Singh, Khushi Khanna, Darshit Sarda · Advisor: Prof. Andrey Itkin",
    abstract:
      "Winning paper of the 15th Annual IAQF Student Competition (6 winners selected from 31 entries across 15+ universities). Tackles the 2025–26 prompt on cross-currency dynamics in cryptocurrencies under the GENIUS Act, using the March 2023 SVB episode as a natural experiment for stablecoin stress and market dislocation.",
    tags: ["Stablecoins", "Cross-currency", "Crisis", "GENIUS Act"],
    pdf: "/papers/iaqf-stablecoin-2026.pdf"
  },
  {
    id: "uav-tinyml-isacc2025",
    title:
      "Tiny ML-based Secure and Energy Efficient UAV Surveillance Framework for Smart Cities",
    venue: "IEEE ISACC 2025 - Intelligent Systems, Advanced Computing & Communication",
    year: 2025,
    status: "Published",
    authors: "A. Shah et al. · Mentor: Prof. Priyank Thakkar",
    abstract:
      "A multi-layered UAV surveillance system integrating quantized TinyML models (Decision Trees, ANN, SVM) for real-time anomaly detection and DoS-attack mitigation. Designed for secure and energy-efficient UAV operations in smart-city deployments.",
    tags: ["TinyML", "UAV", "Anomaly Detection", "Smart Cities"],
    pdf: "/papers/uav-tinyml-isacc2025.pdf"
  },
  {
    id: "qlearning-av-isacc2025",
    title:
      "Q-Learning Assisted Efficient Collision Detection and Avoidance Framework for Autonomous Vehicles in ITS",
    venue: "IEEE ISACC 2025 - Intelligent Systems, Advanced Computing & Communication",
    year: 2025,
    status: "Published",
    authors: "A. Shah et al. · Mentor: Prof. Priyank Thakkar",
    abstract:
      "A reinforcement-learning–based decision model for autonomous vehicles in Intelligent Transport Systems. Layered architecture (sensors → data filtering → Q-learning) enables collision avoidance with vehicles, pedestrians, and potholes in dynamic traffic environments.",
    tags: ["Reinforcement Learning", "Q-Learning", "Autonomous Vehicles", "ITS"],
    pdf: "/papers/qlearning-av-isacc2025.pdf"
  },
  {
    id: "stock-prediction-icict2025",
    title:
      "Predicting Stock Prices: A Deep Dive into Machine Learning and Deep Learning Techniques",
    venue: "International Conference on Information & Communication Technology (ICICT), London 2025",
    year: 2025,
    status: "Accepted",
    authors: "A. Shah et al. · Mentor: Prof. Priyank Thakkar",
    abstract:
      "Comparative study of ML/DL models for next-day stock-price prediction. A single-layer LSTM consistently outperformed deeper multilayer architectures, achieving up to 87% directional accuracy - challenging the assumption that complexity always improves financial forecasts.",
    tags: ["LSTM", "Forecasting", "Deep Learning", "Empirical Finance"],
    pdf: "/papers/stock-prediction-icict2025.pdf"
  }
];
