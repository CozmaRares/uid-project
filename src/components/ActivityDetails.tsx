import { Activity } from "@/lib/data/activities";
import { formatDateWithHour } from "@/lib/utils";
import { Clock, MapPin, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { ReactNode } from "react";

type ActivityDetailsProps = {
  activity: Activity;
  children?: ReactNode;
};

export default function ActivityDetails({
  activity,
  children,
}: ActivityDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">{activity.title}</h3>
        <p className="text-muted-foreground">{activity.description}</p>
      </div>
      <img
        src={activity.image}
        alt={activity.title}
        className="h-48 w-full rounded-md object-cover"
      />
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{activity.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{formatDateWithHour(activity.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {activity.participants} / {activity.maxParticipants || "Unlimited"}{" "}
            participants
          </span>
        </div>
      </div>
      {activity.resources && (
        <div>
          <h4 className="mb-2 font-semibold">Nice to have:</h4>
          <ul className="list-inside list-disc">
            {activity.resources.map(resource => (
              <li key={resource}>{resource}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {activity.tags.map(tag => (
          <Badge
            key={tag}
            variant="secondary"
            className="lowercase"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Organized by: {activity.organizer}
      </p>
      {children}
    </div>
  );
}
