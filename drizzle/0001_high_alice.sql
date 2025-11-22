CREATE TABLE `sessions` (
	`sid_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` text DEFAULT (STRFTIME('%s', 'NOW')) NOT NULL,
	`created` text NOT NULL,
	`ip` text NOT NULL,
	`user_agent` text NOT NULL,
	`revoked` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "revoked_check" CHECK("sessions"."revoked" IN (0, 1))
) STRICT;
