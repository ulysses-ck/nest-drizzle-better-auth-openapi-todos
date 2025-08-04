import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTodoDto, UpdateTodoDto } from 'src/db/zod-schema';
import type { TodoRepository } from 'src/modules/todo/todo.repository';

@Injectable()
export class TodosService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async findById(id: string) {
		const todo = await this.todoRepository.findById(id);

		if (!todo) {
			throw new NotFoundException('Todo was not found');
		}

		return todo;
	}

	async createTodo(values: CreateTodoDto) {
		const todo = await this.todoRepository.createTodo(values);
		return todo;
	}

	async removeTodo(values: { id: string }) {
		const todoRemoved = await this.todoRepository.removeTodo(values);

		if (!todoRemoved) throw new NotFoundException();

		return todoRemoved;
	}

	async getAllTodos() {
		const todos = await this.todoRepository.findAll();
		return todos;
	}

	async updateTodo(values: UpdateTodoDto) {
		const todoUpdated = await this.todoRepository.updateTodo(values);

		return todoUpdated;
	}
}
