import { ApiProperty } from '@nestjs/swagger';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { todoTable } from '@/todos/entities/todo.entity';

export class UpdateTodoDto {
	@ApiProperty()
	readonly text: string;
	@ApiProperty()
	readonly isCompleted: boolean;
}
export class CreateTodoDto {
	@ApiProperty({
		example: 'Reads mail',
		description: 'Todo title',
	})
	readonly text: string;
	@ApiProperty({
		example: false,
		description: 'Wether todo is completed or not',
	})
	readonly isCompleted: boolean;
}

export const updateTodoSchema = createUpdateSchema(todoTable);
export const createTodoSchema = createInsertSchema(todoTable);
