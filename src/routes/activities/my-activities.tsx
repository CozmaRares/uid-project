import { Title, TitleContainer } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, Clock, MapPin, PlusIcon, Users } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn, formatDateWithHour } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { activities, Activity } from "@/lib/data/activities";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ActivityDetails from "@/components/ActivityDetails";

export const Route = createFileRoute("/activities/my-activities")({
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
        <Title>My Activities</Title>
        <SuggestActivity />
      </TitleContainer>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.slice(0, 2).map(activity => (
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
          {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        </SheetContent>
      </Sheet>
    </main>
  );
}
const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
  date: z.date(),
  organizer: z
    .string()
    .min(2, "Organizer must be at least 2 characters")
    .max(100, "Organizer must be less than 100 characters"),
  participants: z
    .number()
    .min(1, "Minimum 1 participant")
    .max(1000, "Maximum 1000 participants"),
  maxParticipants: z
    .number()
    .min(1, "Minimum 1 participant")
    .max(1000, "Maximum 1000 participants")
    .optional(),
  tags: z
    .string()
    .refine(val => val.split(",").every(tag => tag.trim().length > 0), {
      message: "Invalid tags format",
    }),
  image: z.string().url("Invalid image URL"),
  resources: z
    .string()
    .refine(val => val.split(",").every(item => item.trim().length > 0), {
      message: "Invalid items format",
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SuggestActivity() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  function onSubmit(values: FormValues) {
    const newActivity: Activity = {
      ...values,
      id: Date.now().toString(),
      date: new Date(values.date),
      participants: Number(values.participants),
      maxParticipants: values.maxParticipants
        ? Number(values.maxParticipants)
        : undefined,
      tags: values.tags.split(",").map(tag => tag.trim()),
      resources: values.resources
        ? values.resources.split(",").map(resource => resource.trim())
        : undefined,
    };

    console.log(newActivity);
    toast.success("Activity submitted!");
    form.reset();
    setIsOpen(false);
  }

  const yesteday = subDays(new Date(), 1);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Suggest Activity
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[400px] overflow-y-auto sm:w-[540px]"
      >
        <SheetHeader>
          <SheetTitle>Suggest a New Activity</SheetTitle>
          <SheetDescription>
            Fill out the form below to suggest a new activity. All fields are
            required unless marked as optional.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Activity title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the activity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Activity location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date and Time</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "group flex w-full pl-3 text-left font-normal hover:bg-inherit",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverPrimitive.Content
                        align="start"
                        sideOffset={4}
                        className="z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date => date < yesteday}
                          initialFocus
                        />
                      </PopoverPrimitive.Content>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Activity organizer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxParticipants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Participants (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e =>
                        field.onChange(
                          e.target.value
                            ? parseInt(e.target.value, 10)
                            : undefined,
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Leave blank for unlimited participants
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comma-separated tags"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter tags separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resources"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bring Your Own (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Comma-separated items"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter items participants might need to bring, separated by
                    commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
            >
              Submit Suggestion
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
