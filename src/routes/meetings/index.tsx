import { Title, TitleContainer } from "@/components/Title";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Meeting, meetings } from "@/lib/data/meetings";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn, formatDateWithDay } from "@/lib/utils";
import { Radio, CircleFadingArrowUp, Video } from "lucide-react";

export const Route = createFileRoute("/meetings/")({
  component: RouteComponent,
});

const buttonClasses = {
  default:
    "focus-ring rounded-full border border-primary px-6 py-1 hover:bg-primary/20 transition-colors",
  active: "bg-primary text-primary-foreground hover:bg-primary",
};

function RouteComponent() {
  const [meetingsTransformer, setMeetingsTransformer] = useState<{
    fn: (meetings: Readonly<Meeting[]>) => Readonly<Meeting[]>;
    selected: "all" | "live" | "recorded" | "upcoming";
  }>({ fn: noop, selected: "all" });

  const transformedMeetings = useMemo(
    () => meetingsTransformer.fn(meetings),
    [meetingsTransformer],
  );

  return (
    <main className="bounded-container space-y-8">
      <TitleContainer
        variant="page"
        className="flex items-center justify-between"
      >
        <Title>Meetings</Title>
        <div className="space-x-4">
          <button
            className={cn(
              buttonClasses.default,
              meetingsTransformer.selected === "all" && buttonClasses.active,
            )}
            disabled={meetingsTransformer.selected === "all"}
            onClick={() =>
              setMeetingsTransformer({ fn: noop, selected: "all" })
            }
          >
            All
          </button>
          <button
            className={cn(
              buttonClasses.default,
              meetingsTransformer.selected === "live" && buttonClasses.active,
            )}
            disabled={meetingsTransformer.selected === "live"}
            onClick={() =>
              setMeetingsTransformer({ fn: liveMeetings, selected: "live" })
            }
          >
            Live
          </button>
          <button
            className={cn(
              buttonClasses.default,
              meetingsTransformer.selected === "recorded" &&
                buttonClasses.active,
            )}
            disabled={meetingsTransformer.selected === "recorded"}
            onClick={() =>
              setMeetingsTransformer({
                fn: recordedMeetings,
                selected: "recorded",
              })
            }
          >
            Recorded
          </button>
          <button
            className={cn(
              buttonClasses.default,
              meetingsTransformer.selected === "upcoming" &&
                buttonClasses.active,
            )}
            disabled={meetingsTransformer.selected === "upcoming"}
            onClick={() =>
              setMeetingsTransformer({
                fn: upcomingMeetings,
                selected: "upcoming",
              })
            }
          >
            Upcoming
          </button>
        </div>
      </TitleContainer>
      <section>
        <ul className="grid gap-4 md:grid-cols-2">
          {transformedMeetings.map(meeting => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

type CardProps = {
  meeting: Meeting;
};

function MeetingCard({ meeting }: CardProps) {
  return (
    <Card className="h-full w-full overflow-hidden">
      <Link
        href={`/meetings/${meeting.id}`}
        className="block h-full w-full space-y-1 p-3 hover:bg-accent/20"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-2xl"
            aria-label={meeting.status}
          >
            {meeting.status === "live" && (
              <Radio
                width="1em"
                height="1em"
                className="text-red-600"
              />
            )}
            {meeting.status === "recorded" && (
              <Video
                width="1em"
                height="1em"
                className="text-primary"
              />
            )}
            {meeting.status === "upcoming" && (
              <CircleFadingArrowUp
                width="1em"
                height="1em"
                className="text-secondary"
              />
            )}
          </span>
          <span className="text-lg font-medium">{meeting.title}</span>
        </div>
        <div className="text-muted-foreground">
          <span className="block">{formatDateWithDay(meeting.date)}</span>
          <span className="block italic">
            {meeting.timeframe[0]} - {meeting.timeframe[1]}
          </span>
        </div>
        <p className="line-clamp-1">{meeting.description}</p>
      </Link>
    </Card>
  );
}

function noop(meetings: Readonly<Meeting[]>) {
  return meetings;
}

function liveMeetings(meetings: Readonly<Meeting[]>) {
  return meetings.filter(meeting => meeting.status === "live");
}

function recordedMeetings(meetings: Readonly<Meeting[]>) {
  return meetings.filter(meeting => meeting.status === "recorded");
}

function upcomingMeetings(meetings: Readonly<Meeting[]>) {
  return meetings.filter(meeting => meeting.status === "upcoming");
}
