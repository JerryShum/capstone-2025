import { hc } from "hono/client";
import { type ApiRoutes } from "@server/index";

const client = hc<ApiRoutes>("/", {
  init: {
    credentials: "include",
  },
});

export const api = client.api;
