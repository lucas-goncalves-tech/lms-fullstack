PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sessions` (
	`sid_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` text DEFAULT (STRFTIME('%s', 'NOW')) NOT NULL,
	`created` text NOT NULL,
	`ip` text NOT NULL,
	`user_agent` text NOT NULL,
	`revoked` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "revoked_check" CHECK("__new_sessions"."revoked" IN (0, 1))
);
--> statement-breakpoint
INSERT INTO `__new_sessions`("sid_hash", "user_id", "expires", "created", "ip", "user_agent", "revoked") SELECT "sid_hash", "user_id", "expires", "created", "ip", "user_agent", "revoked" FROM `sessions`;--> statement-breakpoint
DROP TABLE `sessions`;--> statement-breakpoint
ALTER TABLE `__new_sessions` RENAME TO `sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;