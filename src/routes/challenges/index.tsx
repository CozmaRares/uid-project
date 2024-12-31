import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { challenges } from "@/lib/data/challenges";
import { Title, TitleContainer } from "@/components/Title";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/challenges/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bounded-container space-y-8">
      <TitleContainer variant="page">
        <Title>Idea Challenges</Title>
      </TitleContainer>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map(challenge => (
          <Card
            key={challenge.id}
            className="h-full transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle>{challenge.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge>{challenge.priority} priority</Badge>
                <Badge variant="secondary">{challenge.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                {challenge.description}
              </p>
              <div className="mb-2 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Deadline: {challenge.deadline.toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                Submissions: {challenge.submissionCount}
              </div>
            </CardContent>
            <CardFooter>
              <Link
                to={`/challenges/${challenge.id}`}
                className={cn(buttonVariants(), "w-full")}
              >
                <Users className="mr-2 h-4 w-4" />
                Make a Submission
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
