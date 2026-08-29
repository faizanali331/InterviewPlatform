import { Feedback } from "../types/feedback";

export const feedback: Feedback[] = [
  {
    domain: "Java + Spring Boot",
    date: "12 Aug 2026",
    score: 78,
    technical: 76,
    communication: 82,
    problem: 79,

    strengths: [
      "Good Spring Boot fundamentals",
      "Clear API design thinking",
      "Good communication",
    ],

    focus: [
      "Practice concurrency",
      "Go deeper into database indexing",
      "Improve system-design trade-offs",
    ],
  },

  {
    domain: "Blockchain + Solidity",
    date: "28 Jul 2026",
    score: 86,
    technical: 84,
    communication: 88,
    problem: 86,

    strengths: [
      "Strong Solidity basics",
      "Understands ERC standards",
      "Good security awareness",
    ],

    focus: [
      "Practice advanced DeFi architecture",
      "Explain gas optimization in more depth",
    ],
  },
];