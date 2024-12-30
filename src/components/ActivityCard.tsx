import { Activity } from "@/lib/data/activities";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users } from "lucide-react";
import { formatDateWithHour } from "@/lib/utils";
import { ReactNode } from "react";

type ActivityCardProps = { activity: Activity; footer?: ReactNode };

export default function ActivityCard({ activity, footer }: ActivityCardProps) {
  return (
    <Card className="h-full w-full overflow-hidden">
      <div className="relative h-48 w-full">
        <img
          src={activity.image}
          alt={activity.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="space-y-4 p-4">
        <div>
          <h3 className="text-xl font-semibold capitalize">{activity.title}</h3>
          <div className="mt-2 space-y-2">
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
              <span>24 participants</span>
            </div>
          </div>
        </div>
      </CardContent>
      {footer}
    </Card>
  );
}
