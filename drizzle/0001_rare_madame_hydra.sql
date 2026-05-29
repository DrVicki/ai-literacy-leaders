CREATE TABLE `enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripePaymentIntentId` varchar(255),
	`stripeSessionId` varchar(255),
	`amountPaid` int DEFAULT 0,
	`currency` varchar(8) DEFAULT 'usd',
	`emailSent` boolean NOT NULL DEFAULT false,
	`enrolledAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` int NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lesson_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleSlug` varchar(64) NOT NULL,
	`moduleOrder` int NOT NULL,
	`lessonSlug` varchar(64) NOT NULL,
	`lessonOrder` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	CONSTRAINT `lessons_id` PRIMARY KEY(`id`)
);
