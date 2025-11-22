CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` TEXT COLLATE NOCASE NOT NULL,
	`password_hash` TEXT NOT NULL,
	`role` TEXT DEFAULT 'USER' NOT NULL,
	`created` TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "role_check" CHECK("users"."role" IN ('USER', 'ADMIN'))
) STRICT;
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` TEXT COLLATE NOCASE NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`lessons` integer NOT NULL,
	`hours` integer NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
) STRICT;
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`slug` TEXT COLLATE NOCASE NOT NULL,
	`title` text NOT NULL,
	`seconds` integer NOT NULL,
	`video` text NOT NULL,
	`description` text NOT NULL,
	`order` integer NOT NULL,
	`free` integer DEFAULT 0 NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "free_check" CHECK("lessons"."free" IN (0, 1))
) STRICT;
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_course_slug` ON `lessons` (`course_id`,`slug`);--> statement-breakpoint
CREATE INDEX `idx_lessons_order` ON `lessons` (`course_id`,`order`);--> statement-breakpoint
CREATE TABLE `lessons_completed` (
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`completed` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	PRIMARY KEY(`user_id`, `course_id`, `lesson_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
) STRICT;
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`completed` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
) STRICT;
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_user_course` ON `certificates` (`user_id`,`course_id`);
--> statement-breakpoint
-- lessons_completed with all information
CREATE VIEW IF NOT EXISTS "lessons_completed_full" AS
SELECT "u"."id", "u"."email", "c"."title" AS "course", "l"."title" AS "lesson", "lc"."completed"
FROM "lessons_completed" AS "lc"
JOIN "users" AS "u" ON "u"."id" = "lc"."user_id"
JOIN "lessons" AS "l" ON "l"."id" = "lc"."lesson_id"
JOIN "courses" AS "c" ON "c"."id" = "lc"."course_id";
--> statement-breakpoint
-- certificates with all information
CREATE VIEW IF NOT EXISTS "certificates_full" AS
SELECT "cert"."id", "cert"."user_id", "u"."name",
       "cert"."course_id", "c"."title", "c"."hours",
       "c"."lessons", "cert"."completed"
FROM "certificates" as "cert"
JOIN "users" AS "u" ON "u"."id" = "cert"."user_id"
JOIN "courses" AS "c" on "c"."id" = "cert"."course_id";
--> statement-breakpoint
-- lessons prev/next
CREATE VIEW IF NOT EXISTS "lesson_nav" AS
SELECT "cl"."slug" AS "current_slug", "l".*
FROM "lessons" AS "cl"
JOIN "lessons" AS "l" ON "l"."course_id" = "cl"."course_id" AND "l"."order"
BETWEEN "cl"."order" - 1 AND "cl"."order" + 1
ORDER BY "l"."order";
