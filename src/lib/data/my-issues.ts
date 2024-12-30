export type IssueStatus =
  | "submitted"
  | "acknowledged"
  | "in-progress"
  | "resolved"
  | "rejected";

export type IssueUpdate = {
  date: Date;
  status: IssueStatus;
  description: string;
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  submittedDate: Date;
  acknowledgedDate?: Date;
  resolvedDate?: Date;
  status: IssueStatus;
  updates: IssueUpdate[];
};

export const issues: Issue[] = [
  {
    id: "123456",
    title: "Pothole on Main Street",
    description:
      "There is a large pothole on Main Street near the central park entrance. It is causing damage to vehicles and needs immediate attention.",
    submittedDate: new Date("2024-12-24T10:00:00"),
    acknowledgedDate: new Date("2024-12-25T09:00:00"),
    status: "in-progress",
    updates: [
      {
        date: new Date("2024-12-25T09:00:00"),
        status: "acknowledged",
        description:
          "The issue has been reviewed and added to the city's maintenance schedule.",
      },
      {
        date: new Date("2024-12-27T14:00:00"),
        status: "in-progress",
        description:
          "Maintenance crew is currently working on repairing the pothole.",
      },
    ],
  },
  {
    id: "789101",
    title: "Streetlight Outage on Elm Avenue",
    description:
      "The streetlights on Elm Avenue have been out for two weeks. It's making the area unsafe for pedestrians at night.",
    submittedDate: new Date("2024-12-01T08:30:00"),
    acknowledgedDate: new Date("2024-12-02T10:00:00"),
    resolvedDate: new Date("2024-12-07T16:00:00"),
    status: "resolved",
    updates: [
      {
        date: new Date("2024-12-02T10:00:00"),
        status: "acknowledged",
        description:
          "The issue has been received and passed on to the electrical maintenance team for further action.",
      },
      {
        date: new Date("2024-12-05T14:00:00"),
        status: "in-progress",
        description:
          "The maintenance team is inspecting the streetlights and ordering replacement parts.",
      },
      {
        date: new Date("2024-12-07T16:00:00"),
        status: "resolved",
        description:
          "The streetlights have been repaired, and normal functionality has been restored. Thank you for bringing this to our attention!",
      },
    ],
  },
];
