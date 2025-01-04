/* eslint-disable @typescript-eslint/no-explicit-any */

export type SurveyQuestion = {
  id: string;
  required: boolean;
  question: string;
} & (
  | {
      type: "text";
      placeholder: string;
    }
  | {
      type: "choice";
      options: string[];
    }
  | {
      type: "number";
      defaultValue: number;
    }
  | {
      type: "date";
    }
);

export type SurveyStep = {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
};

export type Survey = {
  id: string;
  title: string;
  description?: string;
  steps: SurveyStep[];
};

export type SurveyProgress = {
  responses: Map<string, any>; // questinoId -> response
  completedSteps: number;
};

export type SurveyWithProgress = {
  survey: Survey;
  progress: SurveyProgress;
  lastUpdated: Date;
};

const surveySteps: Readonly<SurveyStep[]> = Object.freeze([
  {
    id: "step1",
    title: "General Information",
    description: "Provide basic details about the issue.",
    questions: [
      {
        id: "q1",
        required: true,
        question: "What is the main issue you're reporting?",
        type: "text",
        placeholder: "Describe the issue in a few words.",
      },
      {
        id: "q2",
        required: true,
        question: "What category does this issue fall under?",
        type: "choice",
        options: [
          "Roads",
          "Garbage",
          "Public Transport",
          "Water Supply",
          "Electricity",
          "Other",
        ],
      },
      {
        id: "q3",
        required: true,
        question: "Please provide a brief description of the issue.",
        type: "text",
        placeholder: "Enter more details about the issue.",
      },
    ],
  },
  {
    id: "step2",
    title: "Location Information",
    description: "Tell us where the issue is located.",
    questions: [
      {
        id: "q4",
        required: true,
        question: "Where is this issue located?",
        type: "text",
        placeholder: "Enter the address or nearest landmark.",
      },
      {
        id: "q5",
        required: false,
        question: "Would you like to add a GPS location?",
        type: "choice",
        options: [
          "Yes, use my current location",
          "No, I'll manually describe the location",
        ],
      },
    ],
  },
  {
    id: "step3",
    title: "Severity and Impact",
    description: "Help us understand the impact of the issue.",
    questions: [
      {
        id: "q6",
        required: true,
        question: "How severe is this issue?",
        type: "choice",
        options: ["Low", "Medium", "High", "Critical"],
      },
      {
        id: "q7",
        required: false,
        question:
          "Who is impacted by this issue (e.g., residents, businesses, commuters)?",
        type: "text",
        placeholder: "Describe the affected group.",
      },
      {
        id: "q9",
        required: false,
        question: "Please upload any relevant photos or videos.",
        type: "text",
        placeholder: "Provide a link to the files or describe their contents.",
      },
    ],
  },
  {
    id: "step5",
    title: "Reporting Timeline",
    description: "Provide details about the timeline of the issue.",
    questions: [
      {
        id: "q10",
        required: false,
        question: "When did you first notice this issue?",
        type: "date",
      },
      {
        id: "q11",
        required: true,
        question: "Has this issue been reported before?",
        type: "choice",
        options: ["Yes", "No", "I don't know"],
      },
    ],
  },
  {
    id: "step6",
    title: "Feedback and Suggestions",
    description: "Share your thoughts on resolving the issue.",
    questions: [
      {
        id: "q12",
        required: false,
        question: "What is your suggested solution for this issue?",
        type: "text",
        placeholder: "Provide a possible solution.",
      },
      {
        id: "q13",
        required: true,
        question: "How important is it to resolve this issue?",
        type: "choice",
        options: ["Low", "Moderate", "High", "Urgent"],
      },
    ],
  },
  {
    id: "step7",
    title: "Contact Information",
    description: "Provide your contact details for follow-up.",
    questions: [
      {
        id: "q14",
        required: false,
        question: "Please provide your email for follow-up.",
        type: "text",
        placeholder: "Enter your email address.",
      },
      {
        id: "q15",
        required: true,
        question: "Would you like to be notified about updates on this issue?",
        type: "choice",
        options: ["Yes", "No"],
      },
    ],
  },
]);

// @ts-expect-error readonly
export const surveysWithProgress: Readonly<SurveyWithProgress[]> =
  Object.freeze([
    {
      survey: {
        id: "survey1",
        title: "Report a City Infrastructure Issue",
        description:
          "Help us identify and resolve city infrastructure problems in your area.",
        steps: surveySteps,
      },
      progress: {
        responses: new Map([
          ["q1", "Pothole on Main Street"],
          ["q2", "Roads"],
          ["q3", "Large pothole causing traffic delays"],
          ["q4", "123 Main Street, Near City Park"],
        ]),
        completedSteps: 2,
      },
      lastUpdated: new Date("2024-12-20T15:00:00Z"),
    },
    {
      survey: {
        id: "survey2",
        title: "Public Transport Feedback",
        description:
          "Share your experiences and feedback about the city's public transport system.",
        steps: [surveySteps[0], surveySteps[2], surveySteps[5]],
      },
      progress: {
        responses: new Map([
          ["q1", "Bus delays"],
          ["q2", "Public Transport"],
          ["q6", "Medium"],
        ]),
        completedSteps: 1,
      },
      lastUpdated: new Date("2024-12-21T10:30:00Z"),
    },
    {
      survey: {
        id: "survey3",
        title: "Environmental Issues Survey",
        description:
          "Report environmental issues like pollution, waste management, or deforestation.",
        steps: [surveySteps[0], surveySteps[1], surveySteps[4], surveySteps[5]],
      },
      progress: {
        responses: new Map([
          ["q1", "Trash dumping in river"],
          ["q2", "Garbage"],
        ]),
        completedSteps: 1,
      },
      lastUpdated: new Date("2024-12-19T08:45:00Z"),
    },
    {
      survey: {
        id: "survey4",
        title: "Community Services Feedback",
        description:
          "Provide your feedback on the quality of community services in your area.",
        steps: [surveySteps[0], surveySteps[3], surveySteps[5], surveySteps[5]],
      },
      progress: {
        responses: new Map(),
        completedSteps: 0,
      },
      lastUpdated: new Date("2024-12-18T14:15:00Z"),
    },
    {
      survey: {
        id: "survey5",
        title: "Emergency Issue Report",
        description:
          "Quickly report urgent issues requiring immediate attention, such as accidents or hazards.",
        steps: [surveySteps[0], surveySteps[1], surveySteps[2], surveySteps[5]],
      },
      progress: {
        responses: new Map([
          ["q1", "Tree fallen on road"],
          ["q2", "Roads"],
          ["q3", "Tree has blocked the entire road"],
          ["q4", "Oak Avenue and Elm Street intersection"],
          ["q6", "Critical"],
          ["q7", "Drivers and emergency vehicles"],
        ]),
        completedSteps: 3,
      },
      lastUpdated: new Date("2024-12-22T09:00:00Z"),
    },
  ]);
