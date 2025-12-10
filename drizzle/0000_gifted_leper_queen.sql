CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` TEXT COLLATE NOCASE NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'USER' NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "role_check" CHECK("users"."role" IN ('USER', 'ADMIN'))
) STRICT;
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` TEXT COLLATE NOCASE NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
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
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
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
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade
) STRICT;
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`completed` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
) STRICT;
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_user_course` ON `certificates` (`user_id`,`course_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`sid_hash` blob PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL,
	`ip` text NOT NULL,
	`user_agent` text NOT NULL,
	`revoked` integer DEFAULT 0 NOT NULL,
	`created` integer DEFAULT (STRFTIME('%s', 'NOW')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "revoked_check" CHECK("sessions"."revoked" IN (0, 1))
) STRICT;
--> statement-breakpoint
-- VIEWS
CREATE VIEW IF NOT EXISTS "lessons_completed_full" AS
SELECT "u"."id", "u"."email", "c"."title" AS "course", "l"."title" AS "lesson", "lc"."completed"
FROM "lessons_completed" AS "lc"
JOIN "users" AS "u" ON "u"."id" = "lc"."user_id"
JOIN "lessons" AS "l" ON "l"."id" = "lc"."lesson_id"
JOIN "courses" AS "c" ON "c"."id" = "lc"."course_id";
--> statement-breakpoint
CREATE VIEW IF NOT EXISTS "courses_stats" AS
SELECT 
    c.id,
    c.slug,
    c.title,
    c.description,
    c.created,
    COALESCE(SUM(l.seconds), 0) as total_seconds,
    COUNT(l.id) as total_lessons
FROM courses c
LEFT JOIN lessons l ON l.course_id = c.id
GROUP BY c.id;
--> statement-breakpoint
CREATE VIEW IF NOT EXISTS "courses_user_progress" AS
SELECT 
    cs.id,
    cs.slug,
    cs.title,
    cs.description,
    cs.created,
    cs.total_seconds,
    cs.total_lessons,
    u.id as user_id,
    COALESCE(lc.completed_count, 0) as completed_lessons
FROM courses_stats cs
CROSS JOIN users u
LEFT JOIN (
    SELECT course_id, user_id, COUNT(*) as completed_count
    FROM lessons_completed
    GROUP BY course_id, user_id
) lc ON lc.course_id = cs.id AND lc.user_id = u.id;
--> statement-breakpoint
CREATE VIEW IF NOT EXISTS "certificates_full" AS
SELECT 
    cert.id, 
    cert.user_id, 
    u.name,
    cert.course_id, 
    cs.title, 
    cs.total_seconds,
    cs.total_lessons,
    cert.completed
FROM certificates cert
JOIN users u ON u.id = cert.user_id
JOIN courses_stats cs ON cs.id = cert.course_id;
--> statement-breakpoint
CREATE VIEW IF NOT EXISTS "lesson_nav" AS
SELECT "cl"."slug" AS "current_slug", "l".*
FROM "lessons" AS "cl"
JOIN "lessons" AS "l" ON "l"."course_id" = "cl"."course_id" AND "l"."order"
BETWEEN "cl"."order" - 1 AND "cl"."order" + 1
ORDER BY "l"."order";
