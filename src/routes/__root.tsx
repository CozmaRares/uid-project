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
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <TailwindIndicator />
    </>
  );
}

function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-4 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}
