import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from 'drizzle-zod';
import type z from 'zod';
import { todoTable } from '@/todos/entities/todo.entity';

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
export type InsertTodoDto = z.infer<typeof insertTodoSchema>;

export const createTodoSchema = createSelectSchema(todoTable);
export const updateTodoSchema = createUpdateSchema(todoTable);
export const insertTodoSchema = createInsertSchema(todoTable);
