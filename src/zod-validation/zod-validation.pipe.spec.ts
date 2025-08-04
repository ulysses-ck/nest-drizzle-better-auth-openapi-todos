import { createTodoSchema } from 'src/db/zod-schema';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
	it('should be defined', () => {
		expect(new ZodValidationPipe(createTodoSchema)).toBeDefined();
	});
});
