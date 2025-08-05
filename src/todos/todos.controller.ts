import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { ZodValidationPipe } from '@/zod-validation/zod-validation.pipe';
import {
	type CreateTodoDto,
	createTodoSchema,
	type UpdateTodoDto,
} from './dto/todo.dto';
import { TodosService } from './todos.service';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
	constructor(
		@Inject(TodosService) private readonly todosService: TodosService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(createTodoSchema))
	@ApiOperation({
		summary: 'Create a todo',
	})
	@ApiResponse({
		status: 201,
		description: 'Returns a todo',
	})
	@UseGuards(AuthGuard)
	async create(@Body() createTodoDto: CreateTodoDto) {
		const todoCreated = await this.todosService.create(createTodoDto);
		return todoCreated;
	}

	@Get()
	async findAll() {
		const todos = await this.todosService.findAll();
		return todos;
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const todo = await this.todosService.findOne(id);
		return todo;
	}

	@Patch(':id')
	@UsePipes(new ZodValidationPipe(createTodoSchema))
	async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
		const updatedTodo = await this.todosService.update(id, updateTodoDto);
		return updatedTodo;
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		const todo = await this.todosService.remove(id);
		return todo;
	}
}
