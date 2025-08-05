import { todoTable } from "@/todos/entities/todo.entity";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export class UpdateTodoDto {
	readonly text: string;
	readonly isCompleted: boolean;
}
export class CreateTodoDto {
	readonly text: string;
	readonly isCompleted: boolean;
}

export const updateTodoSchema = createUpdateSchema(todoTable);
export const createTodoSchema = createInsertSchema(todoTable);
