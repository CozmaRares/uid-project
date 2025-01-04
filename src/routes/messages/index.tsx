import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useState,
  useDeferredValue,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { Input } from "@/components/ui/input";
import { ChevronFirst, Search, Send } from "lucide-react";
import { cn, formatDateWithHour } from "@/lib/utils";
import { Chat, YOU, chats } from "@/lib/data/chats";

export const Route = createFileRoute("/messages/")({
  component: RouteComponent,
  validateSearch: (params: Record<string, unknown>) => {
    return {
      chat: params.chat as string | undefined,
    };
  },
});

function RouteComponent() {
  const [mobileChatsOpen, setMobileChatsOpen] = useState(false);
  const [messageFiler, setMessageFiler] = useState<string>("");
  const deferredFilter = useDeferredValue(messageFiler);
  const { chat } = Route.useSearch();

  const filteredSidebarChats = useMemo(
    () =>
      Object.entries(chats).reduce(
        (acc, [group, chats]) => {
          acc[group] = chats
            .filter(
              ({ name, messages }) =>
                name.toLowerCase().includes(deferredFilter.toLowerCase()) ||
                (messages.length > 0 &&
                  messages[messages.length - 1].message
                    .toLowerCase()
                    .includes(deferredFilter.toLowerCase())),
            )
            .map(({ name, messages }) => {
              if (messages.length == 0) return { name, caption: "" };

              const lastMessage = messages[messages.length - 1];

              if (lastMessage.sender == YOU)
                return { name, caption: "You: " + lastMessage.message };

              return { name, caption: lastMessage.message };
            });
          return acc;
        },
        {} as Record<string, Array<{ name: string; caption: string }>>,
      ),
    [deferredFilter],
  );

  const searchChat = (
    <div className="relative border-b bg-background py-4">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        className="pl-8"
        placeholder="Search messages..."
        value={messageFiler}
        onChange={e => {
          setMessageFiler(e.target.value);
        }}
      />
    </div>
  );

  const sidebar = (
    <div className="flex max-h-full flex-col space-y-4">
      {searchChat}
      <div className="flex-1 space-y-4 overflow-auto">
        <ChatGoup
          currentChat={chat}
          group="Friends"
          chats={filteredSidebarChats.users}
        />
        <ChatGoup
          currentChat={chat}
          group="Officials"
          chats={filteredSidebarChats.officials}
        />
      </div>
    </div>
  );

  return (
    <div className="bounded-container grid md:grid-cols-[1fr,auto,2fr] md:gap-4 lg:grid-cols-[1fr,auto,3fr]">
      <div className="hidden h-[80vh] max-h-[80vh] overflow-auto md:block">
        {sidebar}
      </div>
      <div className="hidden h-full w-[3px] bg-muted md:block" />
      <main className="h-[80vh] max-h-[80vh] p-2">
        <ChatWindow
          name={chat}
          trigger={
            <MobileChats
              open={mobileChatsOpen}
              onOpenChange={setMobileChatsOpen}
            >
              {sidebar}
            </MobileChats>
          }
        />
      </main>
    </div>
  );
}

type MobileChatsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

function MobileChats({ open, onOpenChange, children }: MobileChatsProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full px-0 text-base md:hidden"
        >
          <ChevronFirst className="size-6" />
          <span className="sr-only">Toggle Message Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <DrawerTitle className="sr-only">Message Menu</DrawerTitle>
        <DrawerDescription className="sr-only">Message Menu</DrawerDescription>
        <div className="m-4 h-[60svh] max-h-[60svh] min-h-[60svh] overflow-auto">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type ChatGoupProps = {
  currentChat?: string;
  group: string;
  chats: Array<{ name: string; caption: string }>;
};

function ChatGoup({ currentChat, group, chats }: ChatGoupProps) {
  if (chats.length === 0) return null;

  return (
    <div>
      <span className="font-medium text-muted-foreground">{group}</span>
      <ul className="mr-2 space-y-2">
        {chats.map((chat, i) => (
          <li key={i}>
            <Link
              to="/messages"
              search={{ chat: chat.name }}
              className={cn(
                "flex items-center space-x-4 rounded-md px-4 py-2 transition-colors",
                currentChat === chat.name
                  ? "pointer-events-none bg-secondary/20"
                  : "hover:bg-accent/10",
              )}
            >
              <Avatar>
                <AvatarImage
                  src="/placeholder"
                  alt={chat.name}
                />

                <AvatarFallback>
                  {chat.name
                    .split(" ")
                    .filter((n, i) => n.length > 0 && i < 3)
                    .map(n => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{chat.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {chat.caption}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type ChatWindowProps = {
  name: string | undefined;
  trigger: ReactNode;
};

function ChatWindow({ name, trigger }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const chat = findChat(name);

  useEffect(() => {
    if (chat === undefined && name !== undefined) {
      navigate({
        to: "/messages",
        search: { chat: undefined },
        replace: true,
      });
    }
  }, [chat, name, navigate]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setNewMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row gap-4 border-b p-4">
        {trigger}
        <h2 className="text-2xl font-bold">{name ?? "No Chat"}</h2>
      </div>
      <div
        className={cn("my-4 flex-1 overflow-y-auto p-4", {
          "flex items-center justify-center text-muted-foreground":
            chat === undefined || chat.messages.length == 0,
        })}
      >
        {chat === undefined ? (
          <div>No chat selected.</div>
        ) : chat.messages.length == 0 ? (
          <div>No messages yet.</div>
        ) : (
          chat.messages.map((message, i) => (
            <div
              key={i}
              className={`mb-4 flex ${message.sender === YOU ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${message.sender === YOU ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p>{message.message}</p>
                <p className="mt-1 text-xs opacity-70">
                  {formatDateWithHour(new Date(message.timestamp))}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="border-t p-4"
      >
        <div className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

function findChat(name?: string): Chat | undefined {
  if (!name) return undefined;

  const user = chats.users.find(chat => chat.name == name);

  if (user) return user;

  return chats.officials.find(chat => chat.name == name);
}
