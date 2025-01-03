import { TitleContainer, Title, TitleDescription } from "@/components/Title";
import NotFound from "@/components/NotFound";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { votes, Comment } from "@/lib/data/votes";
import { cn, formatRelativeDate, formatCompactNumber } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/vote/$voteID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { voteID } = Route.useParams();
  const vote = votes.find(vote => vote.id === voteID);
  const [votedID, setVotedID] = useState<string | null>(null);
  const [isAlternativeFormOpen, setIsAlternativeFormOpen] = useState(false);

  if (!vote) return <NotFound />;

  const onSubmit = (values: FormSchema) => {
    console.log(values);
    toast.success("Alternative solution submitted successfully.", {
      description: "Thank you for your feedback!",
    });
    setIsAlternativeFormOpen(false);
  };

  const hasVoted = votedID !== null;
  const hasVotedCurrentVote = votedID === vote.id;

  return (
    <main
      key={votedID}
      className="bounded-container space-y-8"
    >
      <section className="space-y-8">
        <div>
          <TitleContainer
            variant="page"
            className="border-b-0"
          >
            <Title>{vote.title}</Title>
          </TitleContainer>
          <div>
            <span className="text-lg font-medium">
              {formatCompactNumber(vote.numVotes)}
            </span>{" "}
            <span className="opacity-80">
              votes out of {formatCompactNumber(vote.necessaryVotes)}
            </span>
            <Progress value={(vote.numVotes / vote.necessaryVotes) * 100} />
          </div>
        </div>
        <Card className="overflow-hidden">
          <p className="p-4">{vote.description}</p>
          <div className="flex flex-row justify-between gap-4 md:justify-end">
            <Dialog
              open={isAlternativeFormOpen}
              onOpenChange={open => setIsAlternativeFormOpen(open)}
            >
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-none rounded-tr-xl border-b-0 border-l-0 border-primary md:rounded-t-xl md:border-l",
                )}
              >
                Propose alternative
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Propose alternative</DialogTitle>
                  <DialogDescription>
                    Propose an innovative solution to the problem.
                  </DialogDescription>
                </DialogHeader>
                <AlternativeForm onSubmit={onSubmit} />
              </DialogContent>
            </Dialog>
            <Button
              className={cn(
                "w-[20ch] rounded-none rounded-tl-xl text-base",
                hasVoted &&
                  "cursor-auto bg-secondary/70 text-secondary-foreground hover:bg-secondary/70 disabled:opacity-100",
                hasVotedCurrentVote && "bg-secondary text-secondary-foreground",
              )}
              disabled={hasVoted}
              onClick={() => {
                setVotedID(vote.id);
                toast.success("Thank you for voting!");
              }}
            >
              {hasVotedCurrentVote
                ? "Signed"
                : hasVoted
                  ? "Already voted"
                  : "Sign here"}
            </Button>
          </div>
        </Card>
      </section>
      <section id="alternatives">
        <TitleContainer variant="section">
          <Title>Alternatives</Title>
        </TitleContainer>
        <ul className="space-y-3">
          {vote.alternatives ? (
            vote.alternatives.map((alternative, idx) => {
              const id = vote.id + idx;
              const hasVotedAlternative = votedID === id;

              return (
                <li key={id}>
                  <Card className="flex h-full w-full flex-row items-center justify-between gap-2 p-4">
                    <div className="w-full">
                      <p>{alternative.solution}</p>
                      <span className="row-start-2 italic opacity-90">
                        {alternative.numVotes} votes
                      </span>
                    </div>
                    <Button
                      className={cn(
                        "w-[25ch]",
                        hasVoted &&
                          "cursor-auto bg-secondary/70 text-secondary-foreground hover:bg-secondary/70 disabled:opacity-100",
                        hasVotedAlternative &&
                          "bg-secondary text-secondary-foreground",
                      )}
                      disabled={hasVoted}
                      onClick={() => {
                        setVotedID(id);
                        toast.success("Thank you for voting!");
                      }}
                    >
                      {hasVotedAlternative
                        ? "Signed"
                        : hasVoted
                          ? "Already voted"
                          : "Sign here"}
                    </Button>
                  </Card>
                </li>
              );
            })
          ) : (
            <div>No alternatives yet</div>
          )}
        </ul>
      </section>
      <section
        id="comments"
        className="space-y-4"
      >
        <TitleContainer variant="section">
          <Title>Comments</Title>
          <TitleDescription>Share your thoughts</TitleDescription>
        </TitleContainer>
        <CommentInput />
        <div className="pb-4">
          <div className="h-[3px] bg-muted" />
        </div>
        <ul className="space-y-4">
          {vote.comments ? (
            vote.comments.map((comment, i) => (
              <li key={i}>
                <IndividualComment comment={comment} />
              </li>
            ))
          ) : (
            <div>No comments yet</div>
          )}
        </ul>
      </section>
    </main>
  );
}

const formSchema = z.object({
  solution: z.string().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

type FormProps = {
  onSubmit: (values: FormSchema) => void;
};

function AlternativeForm({ onSubmit }: FormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { solution: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="contents"
      >
        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="sr-only">Alternative Solution</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your solution..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

type IndividualCommentProps = { comment: Comment };

function IndividualComment({ comment }: IndividualCommentProps) {
  const [like, setLike] = useState(0);

  return (
    <Card className="px-4 py-2">
      <div className="flex items-center gap-1">
        <span>@{comment.author}</span>
        <span className="tracking-tighter text-muted-foreground">
          {formatRelativeDate(comment.date)}
        </span>
      </div>
      <span>{comment.content}</span>
      <div className="flex flex-row items-center gap-3 text-sm">
        <div className="flex flex-row items-center gap-1.5">
          <button
            className={cn("focus-ring p-0.5", like == 1 && "text-secondary")}
            onClick={() => setLike(prevLike => (prevLike == 1 ? 0 : 1))}
          >
            <ThumbsUp
              width="1em"
              height="1em"
              fill={like == 1 ? "currentColor" : "none"}
            />
          </button>
          {comment.likes}
        </div>
        <button
          className={cn("focus-ring p-0.5", like == -1 && "text-primary")}
          onClick={() => setLike(prevLike => (prevLike == -1 ? 0 : -1))}
        >
          <ThumbsDown
            width="1em"
            height="1em"
            fill={like == -1 ? "currentColor" : "none"}
          />
        </button>
      </div>
    </Card>
  );
}

const commentSchema = z.object({
  comment: z.string().min(1),
});
type CommentSchema = z.infer<typeof commentSchema>;

function CommentInput() {
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: { comment: "" },
  });

  const onSubmit = (data: CommentSchema) => {
    console.log(data);
    toast.success("Comment submitted!");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-2"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-grow space-y-0">
              <FormLabel className="sr-only">Comments Input</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="flex-grow disabled:cursor-default"
                  placeholder="Join the discussion..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
