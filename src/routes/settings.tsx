import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/theme";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusIcon } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bounded-container">
      <Tabs defaultValue="profile">
        <TabsList className="h-18 sticky top-20 z-20 grid w-full grid-cols-2 md:h-9 md:grid-cols-4">
          <TabsTrigger
            className="rounded-none rounded-tl-md md:rounded-md"
            value="profile"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none rounded-tr-md md:rounded-md"
            value="account"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none rounded-bl-md md:rounded-md"
            value="appearance"
          >
            Appearance
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none rounded-br-md md:rounded-md"
            value="alerts"
          >
            Alerts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="appearance">
          <Appearance />
        </TabsContent>
        <TabsContent value="alerts">
          <Alerts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Profile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your public profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            placeholder="Enter your display name"
            onChange={() =>
              toast.info("Changes saved", { description: "Name updated" })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            placeholder="Tell us about yourself"
            onChange={() =>
              toast.info("Changes saved", { description: "Bio updated" })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
function Account() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={() =>
              toast.info("Changes saved", {
                description: "Email updated",
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            onValueChange={() =>
              toast.info("Changes saved", {
                description: "Language preference updated",
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
function Appearance() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(() => {
    const fontSize = document.documentElement.style.fontSize;

    if (fontSize === "14px") return "sm";
    if (fontSize === "18px") return "lg";
    return "md";
  });

  const changeFontSize = (size: string) => {
    setFontSize(size);
    const root = document.documentElement;
    switch (size) {
      case "sm":
        root.style.fontSize = "14px";
        break;
      case "md":
        root.style.fontSize = "16px";
        break;
      case "lg":
        root.style.fontSize = "18px";
        break;
    }
    toast.info("Changes saved", { description: "Font size updated" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch
            id="dark-mode"
            onCheckedChange={setTheme}
            checked={theme === "dark"}
          />
        </div>
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Select
            value={fontSize}
            onValueChange={changeFontSize}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className=""
                value="sm"
              >
                Small
              </SelectItem>
              <SelectItem
                className="focus:bg-accent/20 focus:text-foreground focus:dark:text-accent-foreground"
                value="md"
              >
                Medium
              </SelectItem>
              <SelectItem
                className="focus:bg-accent/20 focus:text-foreground focus:dark:text-accent-foreground"
                value="lg"
              >
                Large
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
function Alerts() {
  const [areas, setAreas] = useState(["Grigorescu", "Marasti", "Zorilor"]);
  const [newArea, setNewArea] = useState("");

  const handleAddArea = () => {
    if (newArea && !areas.includes(newArea)) {
      setAreas([...areas, newArea]);
      setNewArea("");
      toast.info("Changes saved", { description: "Area added successfully" });
    }
  };

  const handleRemoveArea = (area: string) => {
    setAreas(areas.filter(a => a !== area));
    toast.info("Changes saved", { description: "Area removed successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage your notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">
                  Automatic alerts for your issues
                </Label>
                <p className="text-sm text-muted-foreground">
                  When you submit an issue, you will automatically receive
                  updates and notifications on its status and resolution.
                </p>
              </div>
              <Switch
                onCheckedChange={() =>
                  toast.info("Changes saved", {
                    description: "Issue alerts preference updated",
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">
                  Automatic alerts for survey results
                </Label>
                <p className="text-sm text-muted-foreground">
                  When you participate in surveys, polls, or votes, you will
                  automatically receive notifications about the results or
                  outcomes.
                </p>
              </div>
              <Switch
                onCheckedChange={() =>
                  toast.info("Changes saved", {
                    description: "Survey alerts preference updated",
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">Alerts for specific areas</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Add area</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add new area"
                    value={newArea}
                    onChange={e => setNewArea(e.target.value)}
                  />
                  <Button onClick={handleAddArea}>Add</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            {areas.map(area => (
              <div
                key={area}
                className="flex items-center justify-between border-b py-2"
              >
                <span>{area}</span>
                <Button
                  onClick={() => handleRemoveArea(area)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
