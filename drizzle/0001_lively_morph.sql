ALTER TABLE "todo" ALTER COLUMN "isCompleted" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "todo" ALTER COLUMN "isCompleted" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" ALTER COLUMN "text" SET NOT NULL;