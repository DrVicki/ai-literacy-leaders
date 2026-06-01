CREATE TABLE `quiz_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonSlug` varchar(64) NOT NULL,
	`passed` boolean NOT NULL DEFAULT false,
	`score` int NOT NULL DEFAULT 0,
	`total` int NOT NULL DEFAULT 0,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lessonSlug` varchar(64) NOT NULL,
	`moduleSlug` varchar(64) NOT NULL,
	`question` text NOT NULL,
	`options` text NOT NULL,
	`correctIndex` int NOT NULL,
	`explanation` text NOT NULL,
	`questionOrder` int NOT NULL DEFAULT 0,
	CONSTRAINT `quiz_questions_id` PRIMARY KEY(`id`)
);
