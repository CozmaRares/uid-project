import { Button, buttonVariants } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { TitleContainer, Title } from "@/components/Title";
import { activities } from "@/lib/data/activities";
import ActivityCard from "@/components/ActivityCard";
import { CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="bounded-container space-y-16">
      <header className="flex flex-col items-center justify-center gap-4 text-center">
        <TitleContainer
          variant="page"
          className="border-b-0 pt-8"
        >
          <Title>Bringing All Of Cluj Together</Title>
        </TitleContainer>
      </header>
      <section className="space-y-12">
        <ul className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {activities.slice(0, 6).map(activity => (
            <li key={activity.id}>
              <ActivityCard
                activity={activity}
                footer={
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => {
                        toast.success("Application submitted!");
                      }}
                      className="w-full"
                    >
                      Apply
                    </Button>
                  </CardFooter>
                }
              />
            </li>
          ))}
        </ul>
        <Link
          to="/activities"
          className={cn(buttonVariants(), "mx-auto block w-fit")}
        >
          Browse Activities
        </Link>
      </section>
      <section>
        <TitleContainer variant="section">
          <Title className="underline decoration-primary">
            What We Believe
          </Title>
        </TitleContainer>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          cumque delectus magni harum, distinctio quaerat commodi magnam
          similique beatae repellendus officia, fugit rem voluptatibus nobis
          totam, quia incidunt dolores facere! Aspernatur obcaecati optio fuga
          enim quidem totam mollitia in corporis saepe voluptate tempora libero,
          quis voluptas impedit, ea, nisi praesentium eum neque. Vitae porro
          aliquam nisi numquam, sint quam eos. Quas perspiciatis maiores quaerat
          ratione labore quo adipisci eveniet! Recusandae eum assumenda eaque
          ea, voluptas, molestiae iste quasi officiis totam velit quas, debitis
          aspernatur ab inventore eligendi pariatur vitae aut!
        </p>
      </section>
    </main>
  );
}
