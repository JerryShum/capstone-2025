ALTER TABLE "projects" ALTER COLUMN "projectTitle" SET DEFAULT 'Untitled Project';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "aspectRatio" varchar(10) DEFAULT '16:9' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "engine" varchar(50) DEFAULT 'veo' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "globalNegativePrompt" varchar(1000) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "executiveSummary" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "cinematicPreset" varchar(100) DEFAULT 'None' NOT NULL;