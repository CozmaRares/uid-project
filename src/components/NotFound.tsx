import { Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="space-y-4 pt-16 text-center">
      <h1 className="text-4xl font-bold text-primary">Not Found</h1>
      <p>
        <Link
          to="/"
          className="inline-flex flex-row items-center gap-1 rounded-md bg-primary/90 p-2 text-xl text-primary-foreground transition-colors hover:bg-primary"
        >
          <Home />
          Go to Main Page
        </Link>
      </p>
    </div>
  );
}
