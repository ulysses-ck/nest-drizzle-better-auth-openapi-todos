import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todo', {
	id: uuid().primaryKey().defaultRandom(),
	isCompleted: boolean(),
	text: text(),
});
