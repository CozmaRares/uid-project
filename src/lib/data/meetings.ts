export type Meeting = {
  id: string;
  title: string;
  description: string;
  date: Date;
  timeframe: [string, string];
  status: "live" | "recorded" | "upcoming";
  messages: Array<{
    author: string;
    content: string;
  }>;
};
export const meetings: Readonly<Array<Meeting>> = Object.freeze([
  {
    id: "live",
    title: "Pothole Repairs in Downtown",
    description:
      "Discussing solutions for recurring potholes in downtown streets.",
    date: new Date("2024-12-10T15:00:00"),
    timeframe: ["15:00", "16:30"],
    status: "live",
    messages: [
      {
        author: "Alice",
        content: "We need to allocate more budget for repairs.",
      },
      { author: "Bob", content: "I suggest using more durable materials." },
      {
        author: "Charlie",
        content: "Contractors should be held accountable for poor quality.",
      },
      {
        author: "Dana",
        content: "Why not use recycled materials for cost efficiency?",
      },
      { author: "Eve", content: "Will the repairs disrupt traffic?" },
      {
        author: "Frank",
        content: "Downtown residents have been complaining for months.",
      },
      {
        author: "Grace",
        content: "Can we involve local businesses to sponsor repairs?",
      },
      {
        author: "Hank",
        content: "Drainage issues are contributing to potholes.",
      },
      {
        author: "Ivy",
        content: "Let’s collaborate with neighboring cities for solutions.",
      },
      {
        author: "Jack",
        content: "The main issue is lack of regular maintenance.",
      },
      {
        author: "Kim",
        content: "Residents should report potholes via the app.",
      },
      {
        author: "Leo",
        content: "Let’s discuss new technologies for faster repairs.",
      },
      { author: "Mona", content: "Can volunteers help in minor repairs?" },
      {
        author: "Nina",
        content: "Is there a long-term plan for infrastructure?",
      },
      {
        author: "Oscar",
        content: "Can we review contractor performance regularly?",
      },
    ],
  },
  {
    id: "upcoming",
    title: "Improving Public Transport Efficiency",
    description: "Brainstorming ideas to improve bus and train schedules.",
    date: new Date("2024-12-12T10:00:00"),
    timeframe: ["10:00", "11:30"],
    status: "upcoming",
    messages: [],
  },
  {
    id: "recorded",
    title: "Park Beautification Drive",
    description: "Planning to improve landscaping and amenities in city parks.",
    date: new Date("2024-12-15T09:00:00"),
    timeframe: ["09:00", "10:30"],
    status: "recorded",
    messages: [
      { author: "Alice", content: "Let’s plant more native species." },
      { author: "Bob", content: "Install more benches and picnic tables." },
      { author: "Charlie", content: "Can we add a skatepark?" },
      {
        author: "Dana",
        content: "Park lighting needs improvement for safety.",
      },
      { author: "Eve", content: "A jogging track would be great." },
      {
        author: "Frank",
        content: "We need more trash bins to keep parks clean.",
      },
      { author: "Grace", content: "Add a community garden area." },
      {
        author: "Hank",
        content: "Organize volunteer drives for park maintenance.",
      },
      { author: "Ivy", content: "Can we build more playgrounds for kids?" },
      {
        author: "Jack",
        content: "Ensure accessible facilities for disabled citizens.",
      },
      { author: "Kim", content: "Host monthly park cleanup events." },
      { author: "Leo", content: "Can we provide free Wi-Fi in parks?" },
      {
        author: "Mona",
        content: "A water fountain or splash pad would attract families.",
      },
      {
        author: "Nina",
        content: "Let’s add signs about local flora and fauna.",
      },
      {
        author: "Oscar",
        content: "Focus on sustainable designs for park facilities.",
      },
    ],
  },
  {
    id: "4",
    title: "Streetlight Repairs and Optimization",
    description:
      "Addressing faulty streetlights and optimizing placement for better safety.",
    date: new Date("2024-12-18T19:00:00"),
    timeframe: ["19:00", "20:30"],
    status: "live",
    messages: [
      {
        author: "Alice",
        content: "Some lights stay on during the day—waste of energy.",
      },
      {
        author: "Bob",
        content: "Can we switch to solar-powered streetlights?",
      },
      {
        author: "Charlie",
        content: "Streetlights in the main square need urgent repairs.",
      },
      {
        author: "Dana",
        content: "Motion-sensor lights might save energy in low-traffic areas.",
      },
      {
        author: "Eve",
        content: "Can we get brighter lights near school zones?",
      },
      {
        author: "Frank",
        content: "Install lights near hiking trails for evening walkers.",
      },
      {
        author: "Grace",
        content: "Coordinate with utility companies for quicker fixes.",
      },
      { author: "Hank", content: "Why does it take so long to replace bulbs?" },
      {
        author: "Ivy",
        content: "Focus on improving safety in poorly lit areas.",
      },
      {
        author: "Jack",
        content: "Use weather-resistant designs to reduce maintenance.",
      },
      { author: "Kim", content: "Report faulty streetlights through the app." },
      {
        author: "Leo",
        content: "Adjust light placement to reduce dark spots.",
      },
      {
        author: "Mona",
        content: "Can local neighborhoods sponsor new lights?",
      },
      {
        author: "Nina",
        content: "Let’s map problem areas and prioritize fixes.",
      },
      { author: "Oscar", content: "Public awareness campaigns might help." },
    ],
  },
  {
    id: "5",
    title: "Reducing Noise Pollution",
    description:
      "Finding ways to reduce noise pollution in residential and commercial zones.",
    date: new Date("2024-12-20T14:00:00"),
    timeframe: ["14:00", "15:30"],
    status: "upcoming",
    messages: [],
  },
  {
    id: "6",
    title: "Community Recycling Program Expansion",
    description:
      "Planning to expand the recycling program and increase public participation.",
    date: new Date("2024-12-22T11:00:00"),
    timeframe: ["11:00", "12:30"],
    status: "recorded",
    messages: [
      {
        author: "Alice",
        content: "We need more recycling bins in public areas.",
      },
      {
        author: "Bob",
        content: "Can we add electronic waste collection points?",
      },
      {
        author: "Charlie",
        content: "Offer incentives for recycling participation.",
      },
      {
        author: "Dana",
        content: "Host educational workshops on proper recycling.",
      },
      { author: "Eve", content: "Partner with schools for awareness drives." },
      {
        author: "Frank",
        content: "Focus on reducing plastic usage in the community.",
      },
      {
        author: "Grace",
        content: "How about a recycling competition for residents?",
      },
      {
        author: "Hank",
        content: "Track recycling rates by neighborhood for transparency.",
      },
      {
        author: "Ivy",
        content: "Introduce compost bins alongside recycling bins.",
      },
      {
        author: "Jack",
        content: "Can we provide easy access to recycling schedules?",
      },
      {
        author: "Kim",
        content: "Work with local businesses to reduce packaging waste.",
      },
      {
        author: "Leo",
        content: "Add labels on bins for clarity on recyclables.",
      },
      {
        author: "Mona",
        content: "Provide drop-off points for old clothes and furniture.",
      },
      {
        author: "Nina",
        content: "Consider penalties for improper waste disposal.",
      },
      {
        author: "Oscar",
        content: "Use funds from recycling to improve local facilities.",
      },
    ],
  },
  {
    id: "7",
    title: "Urban Tree Plantation Drive",
    description:
      "Planning to plant trees in urban areas to improve air quality and aesthetics.",
    date: new Date("2024-12-24T09:30:00"),
    timeframe: ["09:30", "11:00"],
    status: "live",
    messages: [
      {
        author: "Alice",
        content: "We should focus on planting trees native to the region.",
      },
      {
        author: "Bob",
        content: "Collaborate with schools for tree-planting events.",
      },
      { author: "Charlie", content: "Can we include fruit-bearing trees?" },
      {
        author: "Dana",
        content: "Ensure maintenance plans are in place for the saplings.",
      },
      { author: "Eve", content: "Involve local NGOs for additional support." },
      { author: "Frank", content: "Plant trees along bike paths for shade." },
      {
        author: "Grace",
        content: "Create tree-guard sponsorship opportunities.",
      },
      { author: "Hank", content: "Focus on areas with high pollution first." },
      { author: "Ivy", content: "Can we create green corridors in the city?" },
      {
        author: "Jack",
        content: "Do we have funding secured for this project?",
      },
      {
        author: "Kim",
        content: "What’s the long-term goal of this plantation drive?",
      },
      {
        author: "Leo",
        content: "Use drone mapping to identify suitable locations.",
      },
      {
        author: "Mona",
        content: "How will we ensure the saplings survive summer?",
      },
      {
        author: "Nina",
        content: "Can local businesses sponsor parts of the drive?",
      },
      {
        author: "Oscar",
        content: "Focus on planting in flood-prone areas for water retention.",
      },
    ],
  },
  {
    id: "8",
    title: "Traffic Congestion Solutions",
    description:
      "Discussing innovative solutions to reduce traffic congestion in the city.",
    date: new Date("2024-12-26T16:00:00"),
    timeframe: ["16:00", "17:30"],
    status: "upcoming",
    messages: [],
  },
  {
    id: "9",
    title: "Wastewater Treatment Facility Upgrade",
    description:
      "Reviewing plans to modernize wastewater treatment for environmental benefits.",
    date: new Date("2024-12-28T14:30:00"),
    timeframe: ["14:30", "16:00"],
    status: "recorded",
    messages: [
      {
        author: "Alice",
        content: "Focus on reducing chemical discharge into water bodies.",
      },
      { author: "Bob", content: "Can we reuse treated water for irrigation?" },
      {
        author: "Charlie",
        content: "Upgrade technology to handle increasing waste loads.",
      },
      {
        author: "Dana",
        content: "What are the costs associated with the upgrades?",
      },
      {
        author: "Eve",
        content: "Involve experts to ensure compliance with regulations.",
      },
      {
        author: "Frank",
        content: "Educate citizens on reducing water wastage.",
      },
      {
        author: "Grace",
        content: "Use renewable energy to power treatment facilities.",
      },
      { author: "Hank", content: "Focus on odor management near facilities." },
      { author: "Ivy", content: "Can treated water be made drinkable?" },
      {
        author: "Jack",
        content: "Upgrade pipelines to reduce water loss during treatment.",
      },
      { author: "Kim", content: "Host public hearings for transparency." },
      { author: "Leo", content: "What’s the timeline for these upgrades?" },
      {
        author: "Mona",
        content: "Consider involving local universities for research.",
      },
      {
        author: "Nina",
        content: "Can we include rainwater harvesting in the plans?",
      },
      {
        author: "Oscar",
        content: "Monitor water quality post-treatment regularly.",
      },
    ],
  },
  {
    id: "10",
    title: "Noise-Free New Year Celebrations",
    description:
      "Planning alternative ways to celebrate New Year’s Eve with less noise pollution.",
    date: new Date("2024-12-30T20:00:00"),
    timeframe: ["20:00", "22:00"],
    status: "live",
    messages: [
      {
        author: "Alice",
        content: "Encourage laser light shows instead of fireworks.",
      },
      {
        author: "Bob",
        content: "Offer discounts on noise-free celebration kits.",
      },
      {
        author: "Charlie",
        content: "Host city-sponsored concerts with noise limits.",
      },
      { author: "Dana", content: "Can we organize quieter community events?" },
      {
        author: "Eve",
        content: "Spread awareness about the impact of noise on wildlife.",
      },
      {
        author: "Frank",
        content: "Introduce designated zones for noisy celebrations.",
      },
      {
        author: "Grace",
        content: "Consider silent discos for a unique experience.",
      },
      {
        author: "Hank",
        content: "Restrict firecracker sales near residential areas.",
      },
      {
        author: "Ivy",
        content: "Organize eco-friendly, noise-free competitions.",
      },
      {
        author: "Jack",
        content: "Highlight cultural traditions for quieter festivities.",
      },
      { author: "Kim", content: "Focus on enforcing noise-level regulations." },
      {
        author: "Leo",
        content: "How about a countdown with synchronized lights?",
      },
      { author: "Mona", content: "Can schools promote quiet celebrations?" },
      {
        author: "Nina",
        content: "Survey public preferences for noise-free events.",
      },
      {
        author: "Oscar",
        content: "Collaborate with event planners for creative ideas.",
      },
    ],
  },
  {
    id: "11",
    title: "Flood Prevention Strategies",
    description:
      "Evaluating methods to prevent flooding in low-lying areas of the city.",
    date: new Date("2025-01-03T14:00:00"),
    timeframe: ["14:00", "15:30"],
    status: "upcoming",
    messages: [],
  },
  {
    id: "12",
    title: "Air Quality Improvement Plan",
    description:
      "Discussing strategies to reduce air pollution in industrial and urban zones.",
    date: new Date("2025-01-06T10:30:00"),
    timeframe: ["10:30", "12:00"],
    status: "recorded",
    messages: [
      {
        author: "Alice",
        content: "Install air quality monitoring stations citywide.",
      },
      {
        author: "Bob",
        content: "Limit industrial emissions with stricter regulations.",
      },
      {
        author: "Charlie",
        content: "Promote green rooftops to absorb pollutants.",
      },
      {
        author: "Dana",
        content: "Encourage use of public transport and carpooling.",
      },
      { author: "Eve", content: "Can we subsidize electric vehicles?" },
      { author: "Frank", content: "Plant more trees in industrial zones." },
      {
        author: "Grace",
        content: "Introduce air purifiers in schools and hospitals.",
      },
      { author: "Hank", content: "Ban burning of waste in residential areas." },
      { author: "Ivy", content: "Develop pedestrian-friendly zones." },
      {
        author: "Jack",
        content: "What about reducing construction dust emissions?",
      },
      {
        author: "Kim",
        content: "Focus on educating citizens about pollution sources.",
      },
      { author: "Leo", content: "Implement green corridors along highways." },
      {
        author: "Mona",
        content: "Collaborate with tech firms for innovative solutions.",
      },
      { author: "Nina", content: "Monitor pollution levels using drones." },
      {
        author: "Oscar",
        content: "Highlight health risks to encourage participation.",
      },
    ],
  },
  {
    id: "13",
    title: "Bike Sharing Program Rollout",
    description:
      "Launching a city-wide bike-sharing program to promote eco-friendly transport.",
    date: new Date("2025-01-08T08:30:00"),
    timeframe: ["08:30", "10:00"],
    status: "live",
    messages: [
      {
        author: "Alice",
        content: "Install more bike stations near transit hubs.",
      },
      {
        author: "Bob",
        content: "Offer monthly memberships at discounted rates.",
      },
      { author: "Charlie", content: "Focus on safety measures for bikers." },
      { author: "Dana", content: "Ensure bikes are maintained regularly." },
      {
        author: "Eve",
        content: "Collaborate with local businesses for sponsorships.",
      },
      { author: "Frank", content: "Can we include e-bikes in the program?" },
      {
        author: "Grace",
        content: "Make bike paths more accessible and visible.",
      },
      {
        author: "Hank",
        content: "Introduce a loyalty program for frequent users.",
      },
      { author: "Ivy", content: "What about security for parked bikes?" },
      { author: "Jack", content: "Focus on areas with high commuter demand." },
      { author: "Kim", content: "Include a feedback system for users." },
      { author: "Leo", content: "Host bike training sessions for beginners." },
      {
        author: "Mona",
        content: "Ensure app integration for seamless access.",
      },
      {
        author: "Nina",
        content: "Can we partner with universities for pilot programs?",
      },
      {
        author: "Oscar",
        content: "Monitor program success with data analytics.",
      },
    ],
  },
  {
    id: "14",
    title: "Smart City Infrastructure Updates",
    description:
      "Discussing technology upgrades for a smarter, more connected city.",
    date: new Date("2025-01-10T13:00:00"),
    timeframe: ["13:00", "14:30"],
    status: "upcoming",
    messages: [],
  },
  {
    id: "15",
    title: "Public Safety and Emergency Preparedness",
    description:
      "Improving public safety systems and disaster response mechanisms.",
    date: new Date("2025-01-12T17:00:00"),
    timeframe: ["17:00", "18:30"],
    status: "recorded",
    messages: [
      { author: "Alice", content: "Install more emergency alert systems." },
      {
        author: "Bob",
        content: "Host drills for earthquake and fire preparedness.",
      },
      {
        author: "Charlie",
        content: "Introduce safety kiosks in public areas.",
      },
      {
        author: "Dana",
        content: "Ensure hospitals are prepared for emergencies.",
      },
      {
        author: "Eve",
        content: "What about emergency shelters for disasters?",
      },
      { author: "Frank", content: "Focus on educating children about safety." },
      {
        author: "Grace",
        content: "Collaborate with first responders for better coordination.",
      },
      {
        author: "Hank",
        content: "Develop apps for real-time emergency updates.",
      },
      {
        author: "Ivy",
        content: "Provide free first aid training to citizens.",
      },
      { author: "Jack", content: "Expand the city’s fire and rescue fleet." },
      {
        author: "Kim",
        content: "Introduce public feedback for safety concerns.",
      },
      {
        author: "Leo",
        content: "Focus on evacuation plans for densely populated areas.",
      },
      {
        author: "Mona",
        content: "Monitor and mitigate risks from natural disasters.",
      },
      {
        author: "Nina",
        content: "Host workshops on self-defense and crisis response.",
      },
      {
        author: "Oscar",
        content: "Review past disasters to improve current plans.",
      },
    ],
  },
] as const);
