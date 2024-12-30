import { TitleContainer, Title } from "@/components/Title";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Route = createFileRoute("/rate-city-services/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("rate");

  return (
    <div className="bounded-container space-y-8">
      <TitleContainer variant="page">
        <Title>Rate City Services</Title>
      </TitleContainer>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="rate">Rate Services</TabsTrigger>
          <TabsTrigger value="request">New Service Request</TabsTrigger>
        </TabsList>
        <TabsContent value="rate">
          <ServiceList />
        </TabsContent>
        <TabsContent value="request">
          <NewServiceRequestForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const services = [
  {
    name: "Garbage Collection",
    description: "Weekly garbage and recycling pickup",
  },
  {
    name: "Street Cleaning",
    description: "Regular street sweeping and maintenance",
  },
  {
    name: "Public Transportation",
    description: "Bus and subway services",
  },
  {
    name: "Parks and Recreation",
    description: "Maintenance of public parks and recreational facilities",
  },
  {
    name: "Snow Removal",
    description: "Winter snow plowing and salting of roads",
  },
];

function ServiceList() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {services.map((service, i) => (
        <ServiceCard
          key={i}
          service={service}
        />
      ))}
    </div>
  );
}
type Service = {
  name: string;
  description: string;
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    setRating(0);
    setComment("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Leave a comment about this service..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="mt-4"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Submit Rating</Button>
      </CardFooter>
    </Card>
  );
}

const newServiceSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().optional(),
});
type NewServiceSchema = z.infer<typeof newServiceSchema>;

function NewServiceRequestForm() {
  const form = useForm<NewServiceSchema>({
    resolver: zodResolver(newServiceSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  });

  function onSubmit() {
    toast.success("Successfully submitted new service request!");
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Service Request</CardTitle>
        <CardDescription>
          Submit a request for a new city service or report an issue
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your request"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief title for your service request.
                  </FormDescription>
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
                      placeholder="Describe the service or issue in detail"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of the service or issue.
                  </FormDescription>
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
                      placeholder="Enter the location (if applicable)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify the location related to your request, if applicable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit Request</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
