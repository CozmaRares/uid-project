import { ReactNode } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  links: ReactNode[];
  otherLinks: ReactNode[];
};

export default function DesktopNav({ links, otherLinks }: Props) {
  return (
    <div className="hidden h-[2em] flex-row items-center justify-center md:flex">
      <ul className="flex items-center justify-center gap-5">
        {links.map((link, index) => (
          <li key={index}>{link}</li>
        ))}
      </ul>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="none"
            className="mx-3 size-8"
          >
            <EllipsisVertical className="size-4" />
            <span className="sr-only">More links</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 min-w-fit">
          <ul className="space-y-3">
            {otherLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
      <div className="h-full w-[1px] flex-grow bg-primary" />
    </div>
  );
}
