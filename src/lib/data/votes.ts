export type Comment = {
  author: string;
  date: Date;
  content: string;
  likes: number;
};
export type Vote = {
  id: string;
  title: string;
  description: string;
  numVotes: number;
  necessaryVotes: number;
  alternatives?: Array<{
    solution: string;
    numVotes: number;
  }>;
  comments?: Array<Comment>;
};
export const votes: Readonly<Array<Vote>> = Object.freeze([
  {
    id: "1",
    title: "More funds for the metro",
    description:
      "The city's metro system is a vital part of the public transportation network, connecting thousands of residents to their workplaces, schools, and other destinations. However, aging infrastructure, limited coverage, and frequent delays have raised concerns about its efficiency and reliability. This proposal aims to allocate additional funds to the metro system to enhance service quality, expand the network to underserved areas, and modernize facilities and rolling stock. The goal is to make public transportation more accessible, sustainable, and appealing as an alternative to car travel, reducing congestion and environmental impact.",
    numVotes: 78000,
    necessaryVotes: 120000,
    alternatives: [
      { solution: "Increase metro ticket prices", numVotes: 22000 },
      { solution: "Reallocate funds from road projects", numVotes: 30000 },
    ],
    comments: [
      {
        author: "TransitEnthusiast",
        date: new Date("2024-12-01"),
        content: "Improving the metro is crucial for sustainable transport!",
        likes: 45,
      },
      {
        author: "Skeptic123",
        date: new Date("2024-12-01"),
        content: "Where will the funding come from?",
        likes: 12,
      },
    ],
  },
  {
    id: "2",
    title: "Remove free student bus passes",
    description:
      "As part of efforts to reduce transportation-related expenses in the city budget, this proposal suggests eliminating free bus passes for students. While these passes have provided significant benefits to families and students, the rising costs of subsidizing free transportation have placed a financial strain on the city. Removing free passes would help reallocate resources to other priority areas. However, this decision must consider the potential impact on student mobility, especially for those from low-income families, and alternative solutions could be explored to mitigate these challenges.",
    numVotes: 34000,
    necessaryVotes: 150000,
    alternatives: [
      { solution: "Charge a reduced fare for students", numVotes: 45000 },
      { solution: "Limit free passes to low-income students", numVotes: 22000 },
    ],
    comments: [
      {
        author: "ConcernedParent",
        date: new Date("2024-11-30"),
        content: "This will impact low-income families the most.",
        likes: 60,
      },
    ],
  },
  {
    id: "3",
    title: "Divert traffic from the city center",
    description:
      "Traffic congestion in the city center has become a major issue, contributing to air pollution, noise, and reduced quality of life for residents. This proposal recommends implementing measures to divert traffic away from the city center by creating alternative routes, improving public transport accessibility, and introducing policies like congestion charges or restricted vehicle access during peak hours. By reducing the volume of vehicles in the city center, the initiative aims to promote a more pedestrian-friendly environment, boost local businesses, and enhance urban living conditions.",
    numVotes: 89000,
    necessaryVotes: 95000,
    alternatives: [
      { solution: "Introduce tolls for city center access", numVotes: 48000 },
      { solution: "Promote carpooling incentives", numVotes: 21000 },
    ],
    comments: [
      {
        author: "UrbanPlanner",
        date: new Date("2024-11-29"),
        content: "Tolls might discourage unnecessary traffic.",
        likes: 80,
      },
    ],
  },
  {
    id: "4",
    title: "Extend the city bypass",
    description:
      "The city's bypass road plays a crucial role in managing traffic flow and reducing congestion in urban areas, but the existing infrastructure is increasingly unable to handle current demand. This proposal suggests extending the bypass to connect more neighborhoods and provide additional capacity for through-traffic, alleviating pressure on inner-city roads. The extension would also include updated safety features and improved connectivity with key transportation hubs. This project aims to enhance traffic efficiency, reduce travel times, and support economic growth by improving access to various parts of the city.",
    numVotes: 67000,
    necessaryVotes: 135000,
    alternatives: [
      {
        solution: "Add an express lane to the current bypass",
        numVotes: 31000,
      },
      {
        solution: "Expand public transport to reduce road demand",
        numVotes: 27000,
      },
    ],
    comments: [
      {
        author: "RoadUser42",
        date: new Date("2024-11-28"),
        content: "Extending the bypass is overdue.",
        likes: 90,
      },
    ],
  },
  {
    id: "5",
    title: "Ban single-use plastics in the city",
    description:
      "Single-use plastics are one of the leading causes of environmental pollution, significantly contributing to landfill waste and harming wildlife ecosystems. This proposal aims to introduce a city-wide ban on single-use plastics, including plastic bags, straws, and cutlery, in favor of biodegradable or reusable alternatives. By enforcing this ban, the city hopes to reduce plastic waste, encourage sustainable practices among residents and businesses, and set an example for other municipalities.",
    numVotes: 45000,
    necessaryVotes: 120000,
    alternatives: [
      { solution: "Introduce a plastic tax instead of a ban", numVotes: 30000 },
      { solution: "Encourage voluntary reduction programs", numVotes: 15000 },
    ],
    comments: [
      {
        author: "EcoFriendly123",
        date: new Date("2024-12-02"),
        content: "We need to act now to protect our environment.",
        likes: 70,
      },
    ],
  },
  {
    id: "6",
    title: "Increase funding for public libraries",
    description:
      "Public libraries play a vital role in fostering education, community engagement, and lifelong learning opportunities. This initiative seeks to increase funding to enhance library resources, upgrade facilities, and expand accessibility for all citizens, including underserved populations. The additional funding will support extended operating hours, technology upgrades, and community programs that benefit students, job seekers, and readers alike. Investing in public libraries is an investment in the intellectual and cultural growth of the city.",
    numVotes: 60000,
    necessaryVotes: 110000,
    alternatives: [
      {
        solution: "Focus on digital resources rather than physical expansions",
        numVotes: 25000,
      },
      {
        solution: "Partner with private donors to fund libraries",
        numVotes: 20000,
      },
    ],
    comments: [
      {
        author: "BookLover",
        date: new Date("2024-11-30"),
        content: "Libraries are the backbone of an educated society!",
        likes: 50,
      },
    ],
  },
  {
    id: "7",
    title: "Implement stricter noise pollution regulations",
    description:
      "Noise pollution is a growing concern in urban areas, negatively impacting residents' quality of life and health. This proposal suggests introducing stricter noise regulations, particularly in residential neighborhoods and during nighttime hours, to address disturbances caused by traffic, construction, and nightlife activities. The plan also includes increased monitoring, enforcement measures, and fines for violations. Reducing noise pollution will contribute to a more peaceful and healthier urban environment for all.",
    numVotes: 35000,
    necessaryVotes: 95000,
    alternatives: [
      { solution: "Limit restrictions to nighttime hours", numVotes: 20000 },
      {
        solution: "Focus on industrial areas instead of residential zones",
        numVotes: 18000,
      },
    ],
    comments: [
      {
        author: "QuietLife",
        date: new Date("2024-12-01"),
        content: "Noise pollution has become unbearable in some areas.",
        likes: 40,
      },
    ],
  },
  {
    id: "8",
    title: "Expand renewable energy projects",
    description:
      "As climate change becomes an increasingly urgent global issue, transitioning to renewable energy sources is critical for reducing carbon emissions and securing a sustainable future. This initiative proposes significant investments in renewable energy infrastructure, such as solar farms, wind turbines, and energy storage systems. The goal is to diversify the city's energy portfolio, decrease reliance on fossil fuels, and create green jobs. The project also includes outreach programs to educate residents on renewable energy benefits and incentives for adopting private renewable energy solutions.",
    numVotes: 87000,
    necessaryVotes: 140000,
    alternatives: [
      {
        solution: "Focus on upgrading existing infrastructure first",
        numVotes: 30000,
      },
      {
        solution:
          "Provide subsidies for private renewable energy installations",
        numVotes: 40000,
      },
    ],
    comments: [
      {
        author: "GreenFuture",
        date: new Date("2024-11-29"),
        content: "A renewable energy focus will secure our future.",
        likes: 100,
      },
    ],
  },
] as const);
