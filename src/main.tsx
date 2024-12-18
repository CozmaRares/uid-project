import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createHashHistory, RouterProvider } from "@tanstack/react-router";
import "@/index.css";
import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import NotFound from "@/components/NotFound";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
