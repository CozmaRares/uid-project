import { extraLinks, navLinks } from "@/lib/data/nav";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { MessageSquare, Settings } from "lucide-react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export default function Nav() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const onClick = (to: string) => () => {
    navigate({ to });
    setMobileNavOpen(false);
  };

  const links = navLinks.map(({ text, to }) => (
    <Link
      className="focus-ring relative p-1 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-right after:bg-primary after:transition-[scale] after:[scale:0_1] after:hover:origin-left after:hover:[scale:1_1]"
      activeProps={{ className: "after:![scale:1_1]" }}
      onClick={onClick(to)}
      to={to}
    >
      {text}
    </Link>
  ));

  const otherLinks = extraLinks.map(({ text, to }) => (
    <Link
      className="focus-ring relative p-1 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-right after:bg-primary after:transition-[scale] after:[scale:0_1] after:hover:origin-left after:hover:[scale:1_1]"
      activeProps={{ className: "after:![scale:1_1]" }}
      onClick={onClick(to)}
      to={to}
    >
      {text}
    </Link>
  ));

  return (
    <nav className="bounded-container sticky top-0 z-50 flex flex-row items-center gap-4 border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:gap-6">
      <Link
        to="/"
        className="focus-ring mr-auto rounded-sm p-0.5 text-lg font-semibold text-primary"
      >
        MyCluj
      </Link>
      <DesktopNav
        links={links}
        otherLinks={otherLinks}
      />
      <MobileNav
        links={links}
        otherLinks={otherLinks}
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
      />
      <Link
        to="/settings"
        onClick={onClick("/settings")}
        className="group focus-visible:outline-none"
        activeProps={{
          className: "text-secondary [&>svg]:scale-110",
        }}
      >
        <Settings className="size-4 transition-transform group-hover:scale-125 group-focus-visible:scale-125" />
        <span className="sr-only">Settings</span>
      </Link>
      <Link
        to="/messages"
        search={{ chat: undefined }}
        onClick={onClick("/messages")}
        className="group focus-visible:outline-none"
        activeProps={{
          className: "text-secondary [&>svg]:scale-110",
        }}
      >
        <MessageSquare className="size-4 transition-transform group-hover:scale-125 group-focus-visible:scale-125" />
        <span className="sr-only">Messages</span>
      </Link>
    </nav>
  );
}
