import Nav from "@/components/nav/Nav";
import TailwindIndicator from "@/components/TailwindIndicator";
import { Toaster } from "@/components/ui/sonner";
import { ThemeContextProvider } from "@/context/theme";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then(res => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeContextProvider>
      <Nav />
      <div className="px-4 py-8 lg:px-0">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
      <TailwindIndicator />
      <Toaster />
    </ThemeContextProvider>
  );
}
