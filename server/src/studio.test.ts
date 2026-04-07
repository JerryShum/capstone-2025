import { describe, expect, it, mock } from "bun:test";
import { Hono } from "hono";

// 1. Define the mock database
const mockDb: any = {
  select: () => mockDb,
  from: () => mockDb,
  innerJoin: () => mockDb,
  where: () => mockDb,
  orderBy: () => mockDb,
  insert: () => mockDb,
  values: () => mockDb,
  returning: () => Promise.resolve([{ id: 1 }]),
  update: () => mockDb,
  set: () => mockDb,
  delete: () => mockDb,
  then: (onFullfilled: any) => Promise.resolve([]).then(onFullfilled),
};

// 2. Mock the module BEFORE importing any routes
mock.module("@server/db", () => ({
  db: mockDb,
}));

// 3. Import the routes
import { studioRoute } from "./routes/studio/studio";

describe("Studio Dashboard API", () => {
  // Create a test app instance
  const app = new Hono<{ Variables: { user: any } }>();
  
  // Inject a test user to bypass auth middleware logic in the route itself
  app.use("*", async (c, next) => {
    c.set("user", { id: "test-user-id" });
    await next();
  });
  
  app.route("/studio", studioRoute);

  it("GET /studio/hello - should return basic connectivity message", async () => {
    const res = await app.request("/studio/hello");
    expect(res.status).toBe(200);
    const body = await res.json() as any;
    expect(body.success).toBe(true);
  });

  it("GET /studio/list - should return user projects list", async () => {
    const res = await app.request("/studio/list");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it("POST /studio/create - should create a new project", async () => {
    const res = await app.request("/studio/create", {
      method: "POST",
    });
    expect(res.status).toBe(201);
    const body = await res.json() as any;
    expect(body.id).toBe(1);
  });
});
