import { createSelectSchema } from 'drizzle-zod';
import type z from 'zod';
import { todoTable } from './schema';

export type CreateTodoDto = z.infer<typeof createTodoSchema>;

export const createTodoSchema = createSelectSchema(todoTable);
