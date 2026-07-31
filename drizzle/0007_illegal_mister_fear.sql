ALTER TABLE `certificates` ADD `certificateId` varchar(32);--> statement-breakpoint
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_certificateId_unique` UNIQUE(`certificateId`);