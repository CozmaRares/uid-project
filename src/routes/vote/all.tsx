
import { TitleContainer, Title } from "@/components/Title";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Vote, votes } from "@/lib/data/votes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart2, MessageSquare, SquareArrowOutUpRight } from "lucide-react";

export const Route = createFileRoute("/vote/all")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="bounded-container">
      <TitleContainer
        variant="page"
        className="mb-8"
      >
        <Title>Browse Votes</Title>
      </TitleContainer>
      <section className="grid gap-4 md:grid-cols-2">
        <ul className="contents">
          {votes.map(vote => (
            <li key={vote.id}>
              <VoteCard {...vote} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

type VoteCardProps = Vote;

function VoteCard({
  numVotes,
  necessaryVotes,
  alternatives,
  comments,
  title,
  description,
  id,
}: VoteCardProps) {
  const progress = (numVotes / necessaryVotes) * 100;
  const alternativesCount = alternatives?.length || 0;
  const totalComments = comments?.length || 0;

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
          <Badge
            variant="secondary"
            className="shrink-0"
          >
            {Math.round(progress)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {formatCompactNumber(numVotes)} votes
            </span>
            <span className="text-muted-foreground">
              Goal: {formatCompactNumber(necessaryVotes)}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2"
          />
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm">
          <Link
            href={`/vote/${id}`}
            className="focus-ring flex items-center gap-1 p-0.5 hover:underline"
          >
            <span>Show more</span>
            <SquareArrowOutUpRight className="size-4" />
          </Link>
          <Link
            className="focus-ring ml-auto flex items-center gap-1 p-0.5 hover:underline"
            href={`/vote/${id}/#alternatives`}
          >
            <BarChart2 className="size-4" />
            <span>
              {alternativesCount} alternative
              {alternativesCount !== 1 ? "s" : ""}
            </span>
          </Link>
          <Link
            href={`/vote/${id}/#comments`}
            className="focus-ring flex items-center gap-1 p-0.5 hover:underline"
          >
            <MessageSquare className="size-4" />
            <span>
              {totalComments} comment{totalComments !== 1 ? "s" : ""}
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
