import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  links: ReactNode[];
  otherLinks: ReactNode[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MobileNav({
  links,
  otherLinks,
  open,
  onOpenChange,
}: Props) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
    >
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 px-0 text-base hover:bg-transparent hover:text-foreground focus-visible:bg-transparent md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <DrawerDescription className="sr-only">Menu</DrawerDescription>
        <div className="mx-4 max-h-[60svh] overflow-auto py-4">
          <ul className="space-y-3">
            {links.map((link, index) => (
              <li key={`link-${index}`}>{link}</li>
            ))}
            {otherLinks.map((link, index) => (
              <li key={`other-link-${index}`}>{link}</li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
