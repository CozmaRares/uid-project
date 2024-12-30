export type NavLink = { text: string; to: string };
export const navLinks = Object.freeze([
  { text: "Issues", to: "/issues" },
  { text: "Vote", to: "/vote" },
  { text: "Survey", to: "/survey" },
  { text: "Activities", to: "/activities" },
  { text: "Community", to: "/community" },
] as const) satisfies Readonly<Array<NavLink>>;
export const extraLinks = Object.freeze([
  { text: "Meetings", to: "/meetings" },
  { text: "Challenges", to: "/challenges" },
  { text: "Rate City Services", to: "/rate-city-services" },
]);
