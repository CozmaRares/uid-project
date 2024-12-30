import activityImage from "@/assets/activity-image.png";

export type Activity = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  organizer: string;
  participants: number;
  maxParticipants?: number;
  tags: string[];
  image: string;
  resources?: string[];
};

export const activities: Activity[] = [
  {
    id: "1",
    title: "Central Park Garbage Pickup",
    description:
      "Join us to clean up Central Park and make it beautiful again!",
    location: "Central Park, Cluj-Napoca",
    date: new Date("2024-11-07T09:00:00"),
    organizer: "City Hall - Environmental Department",
    participants: 24,
    maxParticipants: 50,
    tags: ["Environment", "Community", "Cleanup"],
    image: activityImage,
    resources: ["Gloves", "Trash Bags", "Comfortable Shoes"],
  },
  {
    id: "2",
    title: "Tree Planting Drive",
    description:
      "Help us plant trees in the city park to promote green spaces.",
    location: "City Park, Cluj-Napoca",
    date: new Date("2024-12-01T10:00:00"),
    organizer: "Green Future NGO",
    participants: 15,
    maxParticipants: 30,
    tags: ["Environment", "Planting", "Sustainability"],
    image: activityImage,
    resources: ["Shovels", "Watering Cans"],
  },
  {
    id: "3",
    title: "Neighborhood Safety Meeting",
    description:
      "Discuss safety concerns and improvements for your neighborhood.",
    location: "Community Center, Strada Mihai Viteazu 10",
    date: new Date("2024-11-15T18:00:00"),
    organizer: "Local Police Department",
    participants: 40,
    tags: ["Safety", "Community", "Discussion"],
    image: activityImage,
  },
  {
    id: "4",
    title: "Volunteer at Animal Shelter",
    description: "Spend a day helping out at the local animal shelter.",
    location: "Happy Tails Animal Shelter, Strada Păcii 5",
    date: new Date("2024-11-20T09:00:00"),
    organizer: "Happy Tails Shelter",
    participants: 10,
    maxParticipants: 20,
    tags: ["Animals", "Volunteering", "Community"],
    image: activityImage,
    resources: ["Comfortable Clothing"],
  },
  {
    id: "5",
    title: "River Cleanup Day",
    description: "Help clean up the Somes River and protect aquatic life.",
    location: "Somes River Bank, Cluj-Napoca",
    date: new Date("2024-11-25T08:30:00"),
    organizer: "Eco Warriors",
    participants: 30,
    maxParticipants: 60,
    tags: ["Environment", "Water", "Cleanup"],
    image: activityImage,
    resources: ["Waterproof Boots", "Gloves"],
  },
  {
    id: "6",
    title: "Local Art Festival Setup",
    description:
      "Assist with setting up booths and stages for the annual art festival.",
    location: "Main Square, Cluj-Napoca",
    date: new Date("2024-11-28T07:00:00"),
    organizer: "Cluj Arts Council",
    participants: 12,
    maxParticipants: 25,
    tags: ["Art", "Volunteering", "Community"],
    image: activityImage,
    resources: ["Tools", "Water Bottles"],
  },
  {
    id: "7",
    title: "Community Garden Maintenance",
    description:
      "Join us for a morning of weeding, planting, and garden maintenance.",
    location: "Sunrise Community Garden, Strada Florilor 22",
    date: new Date("2024-11-30T09:00:00"),
    organizer: "Garden Enthusiasts Group",
    participants: 20,
    maxParticipants: 40,
    tags: ["Gardening", "Community", "Environment"],
    image: activityImage,
    resources: ["Gardening Gloves", "Trowels"],
  },
  {
    id: "8",
    title: "School Playground Renovation",
    description:
      "Help us renovate the playground and create a safe space for kids.",
    location: "Sunrise Elementary School, Strada Libertății 12",
    date: new Date("2024-12-05T08:00:00"),
    organizer: "Parent-Teacher Association",
    participants: 25,
    maxParticipants: 40,
    tags: ["Education", "Community", "Renovation"],
    image: activityImage,
    resources: ["Paint Brushes", "Tools"],
  },
  {
    id: "9",
    title: "Recycling Workshop",
    description: "Learn how to recycle effectively and reduce waste at home.",
    location: "Cluj Community Hall, Strada Unirii 18",
    date: new Date("2024-12-10T17:00:00"),
    organizer: "Eco Educators",
    participants: 50,
    maxParticipants: 100,
    tags: ["Education", "Recycling", "Sustainability"],
    image: activityImage,
  },
  {
    id: "10",
    title: "Holiday Charity Bazaar",
    description:
      "Volunteer to help organize and run the charity bazaar for the holidays.",
    location: "Downtown Plaza, Cluj-Napoca",
    date: new Date("2024-12-15T10:00:00"),
    organizer: "Charity Foundation",
    participants: 35,
    maxParticipants: 70,
    tags: ["Charity", "Volunteering", "Holiday"],
    image: activityImage,
    resources: ["Holiday Decorations", "Warm Clothing"],
  },
];
