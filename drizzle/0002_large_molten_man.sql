CREATE TABLE `certificates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pdfKey` varchar(512),
	`emailSent` boolean NOT NULL DEFAULT false,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `module_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleSlug` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`parentId` int,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `module_comments_id` PRIMARY KEY(`id`)
);
