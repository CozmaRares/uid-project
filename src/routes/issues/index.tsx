import { createFileRoute, Link } from "@tanstack/react-router";
import { Issue, issues, IssueStatus } from "@/lib/data/my-issues";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Title, TitleContainer } from "@/components/Title";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/issues/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  return (
    <div className="bounded-container space-y-8">
      <TitleContainer
        variant="page"
        className="flex items-center justify-between"
      >
        <Title>My Issues</Title>
        <Link
          to="/issues/report"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "text-lg hover:bg-accent/20",
          )}
        >
          Report an Issue
        </Link>
      </TitleContainer>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {issues.map(issue => (
          <Card
            key={issue.id}
            className="flex flex-col overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{issue.title}</span>
                <Badge variant={getStatusVariant(issue.status)}>
                  {issue.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                {issue.description}
              </p>
              <div className="mb-2 flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                Submitted: {issue.submittedDate.toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                Last Update: {getLastUpdateDate(issue).toLocaleDateString()}
              </div>
            </CardContent>
            <Button
              className="w-full rounded-none border-0 border-t"
              variant="outline"
              onClick={() => {
                setSelectedIssue(issue);
                setIsDialogOpen(true);
              }}
            >
              Show More
            </Button>
          </Card>
        ))}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedIssue?.title}</DialogTitle>
            <DialogDescription>{selectedIssue?.description}</DialogDescription>
          </DialogHeader>
          <IssueDetails issue={selectedIssue} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getStatusVariant(
  status: IssueStatus,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "submitted":
      return "default";
    case "acknowledged":
      return "secondary";
    case "in-progress":
      return "default";
    case "resolved":
      return "outline";
    case "rejected":
      return "destructive";
  }
}

function getLastUpdateDate(issue: Issue): Date {
  return issue.updates.length > 0
    ? issue.updates[issue.updates.length - 1].date
    : issue.submittedDate;
}

function IssueDetails({ issue }: { issue: Issue | null }) {
  if (!issue) return null;

  return (
    <div className="h-[60vh] overflow-auto">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Status</h3>
          <Badge variant={getStatusVariant(issue.status)}>{issue.status}</Badge>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Updates</h3>
          <ul className="space-y-4 pt-4">
            {issue.updates.map((update, index) => (
              <li
                key={index}
                className="border-b pb-2"
              >
                <div className="flex flex-row items-center justify-between gap-2 pb-2">
                  <p className="font-semibold">
                    {update.date.toLocaleString()}
                  </p>
                  <Badge variant={getStatusVariant(update.status)}>
                    {update.status}
                  </Badge>
                </div>
                <p>{update.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
