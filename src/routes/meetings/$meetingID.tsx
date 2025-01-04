import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createFileRoute } from '@tanstack/react-router'
import { Meeting, meetings } from '@/lib/data/meetings'
import NotFound from '@/components/NotFound'
import { PlayCircle, Radio, Send, Video } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Title, TitleContainer } from '@/components/Title'
import { toast } from 'sonner'

export const Route = createFileRoute('/meetings/$meetingID')({
  component: RouteComponent,
})

function RouteComponent() {
  const { meetingID } = Route.useParams()
  const meeting = meetings.find((meeting) => meeting.id === meetingID)

  if (!meeting) return <NotFound />

  return (
    <div
      key={meetingID}
      className="mx-auto grid max-w-screen-xl grid-cols-1 gap-4 p-4 lg:grid-cols-[5fr,3fr] lg:grid-rows-[min(500px,60vh),auto] xl:grid-cols-[2fr,1fr]"
    >
      <VideoPlayer status={meeting.status} />
      <Chat status={meeting.status} messages={meeting.messages ?? []} />
      <VideoTitle title={meeting.title} />
      <ChatInput
        status={meeting.status}
        onSubmit={(data) => {
          console.log(data)
        }}
      />
    </div>
  )
}

type VideoPlayerProps = {
  status: Meeting['status']
}

function VideoPlayer({ status }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video h-full w-full overflow-hidden rounded-lg bg-gray-900">
      {status === 'upcoming' ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <PlayCircle className="mx-auto mb-4 h-16 w-16" />
          <p className="sm:text-xl">Upcoming Stream</p>
        </div>
      ) : (
        <video className="h-full w-full object-cover">
          <source type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {status !== 'upcoming' && (
        <div className="absolute left-4 top-4 flex items-center rounded-full bg-black bg-opacity-60 px-2 py-1 text-white">
          {status === 'live' ? (
            <>
              <Radio className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Live</span>
            </>
          ) : (
            <>
              <Video className="mr-1 h-4 w-4" />
              <span className="text-sm font-medium">Recorded</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

type ChatProps = {
  status: Meeting['status']
  messages: Meeting['messages']
}

function Chat({ status, messages }: ChatProps) {
  return (
    <div className="relative max-h-[400px] rounded-lg border bg-background p-2 lg:max-h-full">
      {status === 'upcoming' ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 text-center">
          <p>Chat is not available yet</p>
          <Button
            variant="outline"
            onClick={() => toast.success('Reminder set!')}
          >
            Set Reminder
          </Button>
        </div>
      ) : (
        <ul className="max-h-full overflow-auto pl-1 pr-2">
          {messages.map((message, index) => (
            <div key={index} className="rounded-lg">
              <p className="font-semibold">{message.author}</p>
              <p>{message.content}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}

type VideoTitleProps = {
  title: string
}

function VideoTitle({ title }: VideoTitleProps) {
  return (
    <TitleContainer className="row-start-2 border-0" variant="page">
      <Title className="font-medium lg:text-4xl">{title}</Title>
    </TitleContainer>
  )
}

const chatSchema = z.object({
  message: z.string().min(1),
})
type ChatSchema = z.infer<typeof chatSchema>

type ChatInputProps = {
  status: Meeting['status']
  onSubmit: (data: ChatSchema) => void
}

function ChatInput({ status, onSubmit }: ChatInputProps) {
  const form = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: status === 'live' ? '' : 'Chat not available' },
  })

  const isDisabled = status !== 'live'
  const isReadOnly = status === 'recorded'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data)
          form.reset()
        })}
        className="flex space-x-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-grow space-y-0">
              <FormLabel className="sr-only">Chat Input</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={
                    isReadOnly ? 'Chat is read-only' : 'Type a message...'
                  }
                  disabled={isDisabled}
                  className="flex-grow disabled:cursor-default"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisabled}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </Form>
  )
}
