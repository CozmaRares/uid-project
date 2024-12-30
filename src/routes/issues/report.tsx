import { Title, TitleContainer, TitleDescription } from "@/components/Title";
import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/issues/report")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="bounded-container space-y-8">
      <TitleContainer variant="page">
        <Title>Report an Issue</Title>
      </TitleContainer>
      <div className="grid gap-8 md:grid-cols-2">
        <TitleContainer
          variant="section"
          className="col-start-2 hidden space-y-8 md:block lg:w-4/5"
        >
          <Title>Help Cluj become a better place</Title>
          <TitleDescription>
            Your issue will be reviewed by our team and we will respond to you
            as soon as possible.
          </TitleDescription>
        </TitleContainer>
        <div className="row-start-1">
          <ReportForm />
        </div>
      </div>
    </main>
  );
}

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  issue: z.string().min(1, {
    message: "Please describe your issue.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

function ReportForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      issue: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
    toast.success("Issue submitted successfully.", {
      description: "Thank you for your feedback!",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>First Name</FormLabel>
                <FormMessage className="text-sm leading-none" />
              </div>
              <FormControl>
                <Input
                  placeholder="Ion"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Last Name</FormLabel>
                <FormMessage className="text-sm leading-none" />
              </div>
              <FormControl>
                <Input
                  placeholder="Popescu"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Email</FormLabel>
                <FormMessage className="text-sm leading-none" />
              </div>
              <FormControl>
                <Input
                  placeholder="ion.popescu@gmail.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Issue</FormLabel>
                <FormMessage className="text-sm leading-none" />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Describe in a few words the issue you’ve encountered..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
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
