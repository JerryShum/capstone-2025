import { describe, expect, it } from "bun:test";
import { loginSchema } from "./loginSchema";
import { signupSchema } from "./signupSchema";
import { stitchVideoSchema } from "./stitchVideoSchema";
import { scriptAssistSchema } from "./scriptAssistSchema";
import { postScriptSchema } from "./sendScriptSchema";
import { postVideoSchema } from "./sendVideoSchema";
import { updateProjectSchema } from "./updateProjectSchema";

describe("Shared Schemas", () => {
  describe("loginSchema", () => {
    it("should validate a correct login", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject an invalid email", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
    });

    it("should reject a short password", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "short",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("signupSchema", () => {
    it("should validate a correct signup", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });
      expect(result.success).toBe(true);
    });

    it("should reject missing fields", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("stitchVideoSchema", () => {
    it("should validate correct stitch data", () => {
      const result = stitchVideoSchema.safeParse({
        videoURLs: ["https://example.com/1.mp4", "https://example.com/2.mp4"],
        projectId: 123,
      });
      expect(result.success).toBe(true);
    });

    it("should reject less than 2 URLs", () => {
      const result = stitchVideoSchema.safeParse({
        videoURLs: ["https://example.com/1.mp4"],
        projectId: 123,
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid project ID", () => {
      const result = stitchVideoSchema.safeParse({
        videoURLs: ["https://example.com/1.mp4", "https://example.com/2.mp4"],
        projectId: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("scriptAssistSchema", () => {
    it("should validate correct script assist data", () => {
      const result = scriptAssistSchema.safeParse({
        currentContent: "Once upon a time",
        context: {
          characters: [],
          environments: [],
          scripts: [],
        },
      });
      expect(result.success).toBe(true);
    });

    it("should reject missing context", () => {
      const result = scriptAssistSchema.safeParse({
        currentContent: "Once upon a time",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("postScriptSchema", () => {
    it("should validate correct script data", () => {
      const result = postScriptSchema.safeParse({
        title: "Test Project",
        overview: "This is a long enough overview for the project.",
        agegroup: "preschool",
        genre: "adventure",
        artstyle: "cartoon",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid genre", () => {
      const result = postScriptSchema.safeParse({
        title: "Test Project",
        overview: "This is a long enough overview for the project.",
        agegroup: "preschool",
        genre: "invalid-genre",
        artstyle: "cartoon",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("postVideoSchema", () => {
    it("should validate correct video data", () => {
      const result = postVideoSchema.safeParse({
        projectId: 1,
        imageBase64: "data:image/png;base64,header...",
        characters: [],
        environments: [],
        scripts: [{ content: "Scene 1" }],
        prompt: "A beautiful sunset",
        aspectRatio: "16:9",
        engine: "veo",
        cinematicPreset: "Neo-Noir",
        negativePrompt: "blurry",
      });
      expect(result.success).toBe(true);
    });

    it("should reject missing projectId", () => {
      const result = postVideoSchema.safeParse({
        imageBase64: "data:image/png;base64,header...",
        prompt: "A beautiful sunset",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("updateProjectSchema", () => {
    it("should validate correct project update data", () => {
      const result = updateProjectSchema.safeParse({
        projectTitle: "Updated Title",
        aspectRatio: "16:9",
        engine: "veo",
        globalNegativePrompt: "none",
        executiveSummary: "Summary",
        cinematicPreset: "Studio Ghibli",
        flowData: {
          nodes: [],
          edges: [],
        },
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid aspectRatio", () => {
      const result = updateProjectSchema.safeParse({
        projectTitle: "Updated Title",
        aspectRatio: "4:3",
        engine: "veo",
        globalNegativePrompt: "none",
        executiveSummary: "Summary",
        cinematicPreset: "Studio Ghibli",
        flowData: {
          nodes: [],
          edges: [],
        },
      });
      expect(result.success).toBe(false);
    });
  });
});

