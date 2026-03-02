import { expect, test, describe } from "bun:test";
import { loginRoute } from "./routes/account/loginRoute";

describe("testing", () => {
  test("should pass to verify CI working", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("Login API", ()=>{
    test("POST /login: empty body, return 400", async() =>{
        const res = await loginRoute.request("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({}),
        });

        expect(res.status).toBe(400);
    });
});