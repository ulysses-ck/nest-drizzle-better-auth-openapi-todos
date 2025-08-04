import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import type { TodoRepository } from './todo.repository';

@Injectable()
export class TodosService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async findOne(id: string) {
		const todo = await this.todoRepository.findOne(id);

		if (!todo) {
			throw new NotFoundException('Todo was not found');
		}

		return todo;
	}

	async create(values: CreateTodoDto) {
		const todo = await this.todoRepository.create(values);
		return todo;
	}

	async remove(id: string) {
		const todoRemoved = await this.todoRepository.remove(id);

		if (!todoRemoved) throw new NotFoundException();

		return todoRemoved;
	}

	async findAll() {
		const todos = await this.todoRepository.findAll();
		return todos;
	}

	async update(id: string, values: UpdateTodoDto) {
		const todoUpdated = await this.todoRepository.update(id, values);

		return todoUpdated;
	}
}
