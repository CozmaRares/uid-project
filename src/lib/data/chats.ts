export const YOU = "___YOU___";

type Message = { sender: string; message: string; timestamp: string };
export type Chat = { name: string; messages: Message[] };
export const chats = {
  users: [
    {
      name: "Alice",
      messages: [
        {
          sender: "Alice",
          message: "Hey! Are you joining the Central Park cleanup?",
          timestamp: "2024-12-27T10:00:00Z",
        },
        {
          sender: YOU,
          message: "Yes, I’ll be there. What time does it start?",
          timestamp: "2024-12-27T10:00:20Z",
        },
        {
          sender: "Alice",
          message: "It starts at 10 AM. Don’t forget gloves!",
          timestamp: "2024-12-27T10:01:00Z",
        },
        {
          sender: YOU,
          message:
            "Thanks for the reminder! Do we need to bring anything else?",
          timestamp: "2024-12-27T10:01:30Z",
        },
        {
          sender: "Alice",
          message: "Maybe some garbage bags if you have any at home.",
          timestamp: "2024-12-27T10:02:00Z",
        },
        {
          sender: YOU,
          message: "Got it. Do you know how many people are joining?",
          timestamp: "2024-12-27T10:02:30Z",
        },
        {
          sender: "Alice",
          message: "I think around 20 people signed up on the app so far.",
          timestamp: "2024-12-27T10:03:00Z",
        },
        {
          sender: YOU,
          message: "That’s great! The more, the better.",
          timestamp: "2024-12-27T10:03:30Z",
        },
        {
          sender: "Alice",
          message: "Definitely. Let’s aim to finish by noon if we can.",
          timestamp: "2024-12-27T10:04:00Z",
        },
        {
          sender: YOU,
          message: "Sounds like a plan. See you tomorrow at 10 AM!",
          timestamp: "2024-12-27T10:04:30Z",
        },
      ],
    },
    {
      name: "Bob",
      messages: [
        {
          sender: "Bob",
          message: "Did you report the pothole on Main Street?",
          timestamp: "2024-12-27T11:00:00Z",
        },
        {
          sender: YOU,
          message: "Yes, I sent it through the app yesterday.",
          timestamp: "2024-12-27T11:00:15Z",
        },
        {
          sender: "Bob",
          message: "Great! Let’s hope they fix it soon.",
          timestamp: "2024-12-27T11:00:30Z",
        },
      ],
    },
    {
      name: "Charlie",
      messages: [
        {
          sender: "Charlie",
          message: "What time is the park restoration meeting?",
          timestamp: "2024-12-27T12:00:00Z",
        },
        {
          sender: YOU,
          message: "It’s at 3 PM. Are you going?",
          timestamp: "2024-12-27T12:00:30Z",
        },
        {
          sender: "Charlie",
          message: "Yes, I’ll be there. Let’s meet beforehand?",
          timestamp: "2024-12-27T12:01:00Z",
        },
      ],
    },
    {
      name: "Diana",
      messages: [
        {
          sender: "Diana",
          message: "I found a recycling center nearby!",
          timestamp: "2024-12-27T09:00:00Z",
        },
        {
          sender: YOU,
          message: "That’s great! Where is it located?",
          timestamp: "2024-12-27T09:00:20Z",
        },
        {
          sender: "Diana",
          message: "On Maple Street, next to the library.",
          timestamp: "2024-12-27T09:01:00Z",
        },
      ],
    },
    {
      name: "Eve",
      messages: [
        {
          sender: "Eve",
          message: "Can you add my suggestion to the app?",
          timestamp: "2024-12-27T08:00:00Z",
        },
        {
          sender: YOU,
          message: "Sure, send me the details and I’ll add it.",
          timestamp: "2024-12-27T08:00:30Z",
        },
        {
          sender: "Eve",
          message: "Thanks! I’ll email you now.",
          timestamp: "2024-12-27T08:01:00Z",
        },
      ],
    },
    {
      name: "Frank",
      messages: [
        {
          sender: "Frank",
          message: "The broken streetlight is fixed now.",
          timestamp: "2024-12-27T07:00:00Z",
        },
        {
          sender: YOU,
          message: "That’s awesome. The app works great!",
          timestamp: "2024-12-27T07:00:30Z",
        },
        {
          sender: "Frank",
          message: "Yeah, let’s report more issues.",
          timestamp: "2024-12-27T07:01:00Z",
        },
      ],
    },
    {
      name: "Grace",
      messages: [
        {
          sender: "Grace",
          message: "Where can we get more volunteers?",
          timestamp: "2024-12-27T06:00:00Z",
        },
        {
          sender: YOU,
          message: "We can post about it on social media.",
          timestamp: "2024-12-27T06:00:30Z",
        },
        {
          sender: "Grace",
          message: "Good idea. I’ll create a post now.",
          timestamp: "2024-12-27T06:01:00Z",
        },
      ],
    },
    {
      name: "Henry",
      messages: [
        {
          sender: "Henry",
          message: "I’ll bring extra gloves for the cleanup.",
          timestamp: "2024-12-27T05:00:00Z",
        },
        {
          sender: YOU,
          message: "Thanks! That’ll be really helpful.",
          timestamp: "2024-12-27T05:00:20Z",
        },
        {
          sender: "Henry",
          message: "No problem. See you there!",
          timestamp: "2024-12-27T05:01:00Z",
        },
      ],
    },
  ],
  officials: [
    {
      name: "Mayor's Office",
      messages: [
        {
          sender: "Mayor's Office",
          message: "Thank you for your contributions to the city!",
          timestamp: "2024-12-27T14:00:00Z",
        },
        {
          sender: YOU,
          message: "Happy to help. Let us know if there’s more to do.",
          timestamp: "2024-12-27T14:00:30Z",
        },
        {
          sender: "Mayor's Office",
          message: "We will! Your efforts are appreciated.",
          timestamp: "2024-12-27T14:01:00Z",
        },
      ],
    },
    {
      name: "Parks Director",
      messages: [
        {
          sender: "Parks Director",
          message: "The Central Park renovation is on track.",
          timestamp: "2024-12-27T13:00:00Z",
        },
        {
          sender: YOU,
          message: "That’s great news! When’s the next update?",
          timestamp: "2024-12-27T13:00:20Z",
        },
        {
          sender: "Parks Director",
          message: "We’ll share it at the end of the month.",
          timestamp: "2024-12-27T13:01:00Z",
        },
      ],
    },
    {
      name: "Transportation Dept.",
      messages: [
        {
          sender: "Transportation Dept.",
          message: "The new bike lanes are now open.",
          timestamp: "2024-12-27T12:00:00Z",
        },
        {
          sender: YOU,
          message: "Awesome! We’ve been waiting for this.",
          timestamp: "2024-12-27T12:00:20Z",
        },
        {
          sender: "Transportation Dept.",
          message: "We’re glad you like them. Spread the word!",
          timestamp: "2024-12-27T12:01:00Z",
        },
      ],
    },
    {
      name: "Urban Planning",
      messages: [
        {
          sender: "Urban Planning",
          message: "We’re reviewing your suggestions for green spaces.",
          timestamp: "2024-12-27T11:00:00Z",
        },
        {
          sender: YOU,
          message: "Thank you! Let me know if you need more details.",
          timestamp: "2024-12-27T11:00:20Z",
        },
        {
          sender: "Urban Planning",
          message: "Will do. Appreciate your input!",
          timestamp: "2024-12-27T11:01:00Z",
        },
      ],
    },
    {
      name: "City Council",
      messages: [
        {
          sender: "City Council",
          message: "We’re discussing your proposal in the next session.",
          timestamp: "2024-12-27T10:00:00Z",
        },
        {
          sender: YOU,
          message: "Thank you. Let me know if there’s anything else to add.",
          timestamp: "2024-12-27T10:00:20Z",
        },
        {
          sender: "City Council",
          message: "Will do. Thank you for your contribution.",
          timestamp: "2024-12-27T10:01:00Z",
        },
      ],
    },
  ],
};
