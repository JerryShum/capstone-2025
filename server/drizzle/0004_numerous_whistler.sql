ALTER TABLE "projects" ADD COLUMN "banner_url" varchar(2048) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "videoOperations" ADD COLUMN "geminiVideoUri" varchar(2048);