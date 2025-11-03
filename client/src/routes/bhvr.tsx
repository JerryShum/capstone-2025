import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import beaver from "@/assets/beaver.svg";
import type { ApiResponse } from "shared";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api";

export const Route = createFileRoute("/bhvr")({
  component: Index,
});

function Index() {
  const [data, setData] = useState<ApiResponse | undefined>();

  const { mutate: sendRequest } = useMutation({
    mutationFn: async () => {
      try {
        console.log("calling api");
        const res = await api.hello.$get();
        const data = await res.json();

        setData(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6">
      <a
        href="https://github.com/stevedylandev/bhvr"
        target="_blank"
        rel="noopener"
      >
        <img
          src={beaver}
          className="h-16 w-16 cursor-pointer"
          alt="beaver logo"
        />
      </a>
      <h1 className="text-5xl font-black">bhvr</h1>
      <h2 className="text-2xl font-bold">Bun + Hono + Vite + React</h2>
      <p>A typesafe fullstack monorepo</p>
      <div className="flex items-center gap-4">
        <Button onClick={() => sendRequest()}>Call API</Button>
        <Button variant="secondary" asChild>
          <a target="_blank" href="https://bhvr.dev" rel="noopener">
            Docs
          </a>
        </Button>
      </div>
      {data && (
        <pre className="rounded-m bg-background p-4">
          <code className="text-foreground">
            Message: {data.message} <br />
            Success: {data.success.toString()}
          </code>
        </pre>
      )}
    </div>
  );
}

export default Index;
