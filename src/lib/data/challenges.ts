export type IdeaChallenge = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: "active" | "closed" | "review";
  priority: "low" | "medium" | "high";
  submissionCount: number;
  eligibility: string;
  submissionGuidelines: string;
  context?: {
    background: string;
    impactScope: string;
  };
  contact: {
    email: string;
    phone?: string;
  };
};

export const challenges: Array<IdeaChallenge> = [
  {
    id: "challenge1",
    title: "Revitalizing Green Spaces in Cluj",
    description:
      "Propose innovative ways to improve green spaces across the city. Ideas should focus on sustainability and inclusivity.",
    deadline: new Date("2025-01-15"),
    status: "active",
    priority: "high",
    submissionCount: 45,
    eligibility: "All Cluj residents aged 18 and above",
    submissionGuidelines:
      "Ideas should not exceed 1,000 words and must include visuals if applicable.",
    context: {
      background:
        "Green spaces in Cluj have been underused and require a fresh perspective.",
      impactScope: "City-wide impact on recreation and biodiversity.",
    },
    contact: {
      email: "green-spaces@clujnapoca.ro",
    },
  },
  {
    id: "challenge2",
    title: "Improving Public Transportation Efficiency",
    description:
      "Submit innovative solutions to make public transportation in Cluj faster, more reliable, and environmentally friendly. Focus on creative scheduling, alternative fuels, or better infrastructure.",
    deadline: new Date("2025-01-30"),
    status: "active",
    priority: "high",
    submissionCount: 68,
    eligibility:
      "Open to all Cluj residents and transportation experts worldwide.",
    submissionGuidelines:
      "Proposals must include a feasibility study and estimated costs. The word limit is 2,000 words.",
    context: {
      background:
        "Traffic congestion and delays are affecting productivity and quality of life in Cluj.",
      impactScope: "City-wide impact with potential regional applications.",
    },
    contact: {
      email: "transport@clujnapoca.ro",
      phone: "+40 123 456 789",
    },
  },
  {
    id: "challenge3",
    title: "Reducing Waste in Cluj",
    description:
      "Propose actionable ideas to reduce household and industrial waste in Cluj. Solutions could involve recycling, composting, or creative reuse of materials.",
    deadline: new Date("2025-02-15"),
    status: "active",
    priority: "medium",
    submissionCount: 32,
    eligibility:
      "Residents, local businesses, and community organizations are encouraged to participate.",
    submissionGuidelines:
      "Submissions must outline clear steps for implementation and potential environmental benefits. The maximum length is 1,500 words.",
    context: {
      background:
        "Landfill sites in Cluj are nearing capacity, and recycling rates remain below EU standards.",
      impactScope:
        "City-wide impact on waste management and environmental health.",
    },
    contact: {
      email: "waste-reduction@clujnapoca.ro",
    },
  },
];
