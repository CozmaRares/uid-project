import { createFileRoute } from "@tanstack/react-router";
import NotFound from "@/components/NotFound";
import { challenges } from "@/lib/data/challenges";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/challenges/$challengeID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { challengeID } = Route.useParams();
  const challenge = challenges.find(challenge => challenge.id === challengeID);
  const [submission, setSubmission] = useState({ title: "", description: "" });

  if (!challenge) return <NotFound />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submission:", submission);
    toast.success("Idea submitted successfully!");
    setSubmission({ title: "", description: "" });
  };

  return (
    <div className="bounded-container space-y-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="mb-2 text-3xl">{challenge.title}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge>{challenge.priority} priority</Badge>
            <Badge variant="secondary">{challenge.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg">{challenge.description}</p>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Deadline: {challenge.deadline.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <span>Submissions: {challenge.submissionCount}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <span>Contact: {challenge.contact.email}</span>
            </div>
            {challenge.contact.phone && (
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>Phone: {challenge.contact.phone}</span>
              </div>
            )}
          </div>
          {challenge.context && (
            <>
              <h3 className="mb-2 text-xl font-semibold">Context</h3>
              <p className="mb-4">{challenge.context.background}</p>
              <h3 className="mb-2 text-xl font-semibold">Impact Scope</h3>
              <p className="mb-4">{challenge.context.impactScope}</p>
            </>
          )}
          <h3 className="mb-2 text-xl font-semibold">Eligibility</h3>
          <p className="mb-4">{challenge.eligibility}</p>
          <h3 className="mb-2 text-xl font-semibold">Submission Guidelines</h3>
          <p>{challenge.submissionGuidelines}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Idea</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Idea Title
              </label>
              <Input
                id="title"
                value={submission.title}
                onChange={e =>
                  setSubmission({ ...submission, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-muted-foreground"
              >
                Idea Description
              </label>
              <Textarea
                id="description"
                value={submission.description}
                onChange={e =>
                  setSubmission({ ...submission, description: e.target.value })
                }
                required
                rows={5}
              />
            </div>
            <Button type="submit">Submit Idea</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
