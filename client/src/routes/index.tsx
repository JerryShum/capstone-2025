import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto flex max-w-xl grow flex-col items-center justify-center gap-6">
      index
    </div>
  );
}

export default Index;
