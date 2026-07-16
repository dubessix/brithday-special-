import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: () => <Outlet />,
});
