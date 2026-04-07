import { describe, expect, it } from "bun:test";
import app from "./app";

describe("API Endpoints", () => {
  it("GET /api/hello should return 401 because it is protected", async () => {
    const res = await app.request("/api/hello");
    expect(res.status).toBe(401);
    const body = await res.json() as any;
    expect(body.message).toBe("Unauthorized");
  });

  it("GET /api/auth/session should return something other than 401 (proves whitelist works)", async () => {
    const res = await app.request("/api/auth/session");
    // It should not be 401 because /api/auth is whitelisted
    expect(res.status).not.toBe(401);
  });

  it("GET /non-existent should return 404 (or serve static index.html)", async () => {
    // Note: Hono's serveStatic usually returns 200 with index.html for unknown routes if configured that way
    const res = await app.request("/non-existent");
    
    // Based on app.ts, it serves static files for everything else
    // In a test environment without the actual static folder populated, it might differ
    // but typically we expect a 200 if static serving is catch-all
    expect([200, 404]).toContain(res.status);
  });
});
