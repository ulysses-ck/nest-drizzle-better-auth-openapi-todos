import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todo', {
	id: uuid().primaryKey().defaultRandom().notNull(),
	isCompleted: boolean().notNull().default(false),
	text: text().notNull(),
});
