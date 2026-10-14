CREATE TABLE `studio_assets` (
	`id` text PRIMARY KEY NOT NULL,
	`object_key` text NOT NULL,
	`prompt` text NOT NULL,
	`model` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `studio_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text,
	`actor_id` text NOT NULL,
	`actor_name` text NOT NULL,
	`action` text NOT NULL,
	`at` text NOT NULL,
	`details` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `studio_invites` (
	`email` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `studio_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`fingerprint` text NOT NULL,
	`state` text NOT NULL,
	`response` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `studio_members` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `studio_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`updated_at` text NOT NULL,
	`updated_by` text NOT NULL,
	`event_id` text NOT NULL
);
