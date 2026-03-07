CREATE TABLE "videoOperations" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"status" varchar(50) DEFAULT 'PROCESSING' NOT NULL,
	"videosURL" varchar(2048),
	"created_at" timestamp DEFAULT now()
);
