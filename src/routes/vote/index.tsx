import { createFileRoute, Link } from "@tanstack/react-router";
import { votes, Vote } from "@/lib/data/votes";
import { CSSProperties, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TitleContainer, Title, TitleDescription } from "@/components/Title";
import { cn, formatCompactNumber } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/vote/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedVote, setSelectedVote] = useState<Vote>(votes[0]);
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <main className="bounded-container space-y-8">
      <TitleContainer variant="page">
        <Title>Vote</Title>
        <TitleDescription>
          Vote on the most important decisions
        </TitleDescription>
      </TitleContainer>
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="row-start-2 space-y-4 lg:row-start-1">
          <ul className="grid gap-4 md:grid-cols-2">
            {votes.slice(0, 6).map(vote => (
              <li key={vote.id}>
                <Card className="h-full w-full">
                  <button
                    className={cn(
                      "focus-ring h-full w-full rounded-xl p-6 text-left",
                      selectedVote.id === vote.id
                        ? "bg-primary text-primary-foreground"
                        : "cursor-pointer transition-colors hover:bg-primary/40",
                    )}
                    disabled={selectedVote.id === vote.id}
                    onClick={() => {
                      setSelectedVote(vote);
                      setHasVoted(false);
                    }}
                  >
                    <h3 className="font-medium">{vote.title}</h3>
                  </button>
                </Card>
              </li>
            ))}
          </ul>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            href="/vote/all"
          >
            Browse more votes
          </Link>
        </section>
        <section className="h-full space-y-6">
          <Card className="h-full p-6">
            <h2 className="mb-4 text-xl font-medium">{selectedVote.title}</h2>
            <p
              className="relative isolate mb-6 select-none overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-[var(--line-height)] after:bg-gradient-to-l after:from-card"
              style={
                {
                  "--line-height": "1.5rem",
                  fontSize: "1rem",
                  lineHeight: "var(--line-height)",
                  height: "calc(var(--line-height) * 7)",
                } as CSSProperties
              }
            >
              {selectedVote.description}
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">Progress</span>
                  <span className="font-medium">
                    {formatCompactNumber(selectedVote.numVotes)} votes out of{" "}
                    {formatCompactNumber(selectedVote.necessaryVotes)}
                  </span>
                </div>
                <Progress
                  value={
                    (selectedVote.numVotes / selectedVote.necessaryVotes) * 100
                  }
                />
              </div>
              <div className="flex gap-4">
                <Button
                  className={cn(
                    "flex-1",
                    hasVoted &&
                      "cursor-auto bg-secondary hover:bg-secondary disabled:opacity-100",
                  )}
                  disabled={hasVoted}
                  onClick={() => {
                    setHasVoted(true);
                    toast.success("Thank you for voting!");
                  }}
                >
                  {hasVoted ? "Signed" : "Sign here"}
                </Button>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  href={`/vote/${selectedVote.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
