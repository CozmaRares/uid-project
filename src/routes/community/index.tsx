import { surveysWithProgress } from "@/lib/data/surveys";
import { meetings } from "@/lib/data/meetings";
import { votes } from "@/lib/data/votes";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building2,
  ChevronRight,
  ClipboardList,
  Vote,
  CircleFadingArrowUp,
  Radio,
} from "lucide-react";
import { Title, TitleContainer } from "@/components/Title";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/community/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bounded-container space-y-8">
      <TitleContainer variant="page">
        <Title>Community Hub</Title>
      </TitleContainer>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Tabs
            defaultValue="surveys"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
              <TabsTrigger value="hot-votes">Hot Votes</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
            </TabsList>
            <TabsContent value="surveys">
              <Card>
                <CardHeader>
                  <CardTitle>Uncompleted Surveys</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {surveysWithProgress.slice(0, 3).map(({ survey }) => (
                      <li
                        key={survey.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <ClipboardList className="h-5 w-5 text-muted-foreground" />
                          <span>{survey.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href={`/survey?survey=${survey.id}`}>
                            Take Survey{" "}
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="hot-votes">
              <Card>
                <CardHeader>
                  <CardTitle>Hot Votes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {votes
                      .slice(0, 3)
                      .map(({ id, title }, i) => ({
                        id,
                        title,
                        engagement: [156, 132, 98][i],
                      }))
                      .map(vote => (
                        <li
                          key={vote.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Vote className="h-5 w-5 text-muted-foreground" />
                            <span>{vote.title}</span>
                            <Badge variant="secondary">
                              {vote.engagement} engagements
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link href={`/vote/${vote.id}`}>
                              View <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="meetings">
              <Card>
                <CardHeader>
                  <CardTitle>Meetings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CircleFadingArrowUp
                          width="1em"
                          height="1em"
                          className="text-secondary"
                        />
                        <span>
                          Upcoming: Town Hall on Environmental Initiatives
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toast.success("Reminder set!")}
                      >
                        Set Reminder
                      </Button>
                    </li>
                    {[meetings[0], meetings[3]].map(meeting => (
                      <li
                        key={meeting.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Radio
                            width="1em"
                            height="1em"
                            className="text-red-600"
                          />
                          <span>Live: {meeting.title}</span>
                        </div>
                        <Link
                          className={buttonVariants({
                            variant: "ghost",
                            size: "sm",
                          })}
                          href={`/meetings/${meeting.id}`}
                        >
                          Join <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Connect with City Officials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Mayor's Office", "City Council", "Urban Planning"].map(
                  (office, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <span>{office}</span>
                      </div>
                      <Link
                        className={buttonVariants({ variant: "outline" })}
                        to="/messages"
                        search={{ chat: office }}
                      >
                        Contact
                      </Link>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Community Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder"
                      alt="@johndoe"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      Organized successful park cleanup
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="@janesmith"
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-muted-foreground">
                      Proposed new bike lane project
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-muted-foreground">
                    Active Members
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">56</p>
                  <p className="text-sm text-muted-foreground">
                    Ongoing Projects
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">789</p>
                  <p className="text-sm text-muted-foreground">
                    Ideas Submitted
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-sm text-muted-foreground">
                    Issues Resolved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Chats</CardTitle>
              <Badge
                variant="outline"
                className="font-normal"
              >
                3 new
              </Badge>
            </CardHeader>
            <CardContent>
              <ul className="my-4 space-y-4">
                <li className="flex items-start space-x-4">
                  <Avatar className="mt-1">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="@cityplanner"
                    />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">City Planner</p>
                    <p className="text-sm text-muted-foreground">
                      Thanks for your input on the new park design...
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Avatar className="mt-1">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="@janedoe"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">
                      I think so too!
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <Avatar className="mt-1">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="@ionpopescu"
                    />
                    <AvatarFallback>IP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Ion Popescu</p>
                    <p className="text-sm text-muted-foreground">Bro...</p>
                  </div>
                </li>
              </ul>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "w-full text-center",
                )}
                href="/messages"
              >
                View all messages
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
