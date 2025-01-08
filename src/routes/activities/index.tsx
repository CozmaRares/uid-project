import { createFileRoute, Link } from "@tanstack/react-router";
import { activities, Activity } from "@/lib/data/activities";
import { Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, formatDateWithHour } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Title, TitleContainer } from "@/components/Title";
import { toast } from "sonner";
import ActivityDetails from "@/components/ActivityDetails";

export const Route = createFileRoute("/activities/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <main className="bounded-container space-y-8">
      <TitleContainer
        variant="page"
        className="flex items-center justify-between"
      >
        <Title>Activities</Title>
        <Link
          to="/activities/my-activities"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "text-lg hover:bg-accent/20",
          )}
        >
          My Activities
        </Link>
      </TitleContainer>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map(activity => (
          <Card className="cursor-pointer transition-shadow duration-200 hover:shadow-lg">
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
              <CardDescription className="line-clamp-1">
                {activity.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={activity.image}
                alt={activity.title}
                className="mb-4 h-40 w-full rounded-md object-cover"
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
                  <span>{activity.participants} participants</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <div className="flex flex-wrap gap-2">
                {activity.tags.slice(0, 3).map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="lowercase"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button
                className="w-1/2 min-w-fit"
                onClick={() => {
                  setSelectedActivity(activity);
                  setSheetOpen(true);
                }}
              >
                See details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Sheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      >
        <SheetTrigger
          asChild
          className="sr-only"
        />
        <SheetContent className="max-w-[85%] md:max-w-lg">
          <SheetHeader className="text-left">
            <SheetTitle>Activity</SheetTitle>
            <SheetDescription className="sr-only">
              Activity details
            </SheetDescription>
          </SheetHeader>
          {selectedActivity && (
            <ActivityDetails activity={selectedActivity}>
              <Button
                className="w-full"
                onClick={() => {
                  setSelectedActivity(null);
                  setSheetOpen(false);
                  toast.success("Application submitted!");
                }}
              >
                Apply
              </Button>
            </ActivityDetails>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
