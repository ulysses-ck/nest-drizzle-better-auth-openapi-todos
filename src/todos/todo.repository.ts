import { Inject, Injectable } from '@nestjs/common';
import type { TransactionHost } from '@nestjs-cls/transactional';
import { eq } from 'drizzle-orm';
import type { DbTransactionAdapter } from 'src/db/client';
import type { InsertTodoDto, UpdateTodoDto } from 'src/todos/dto/todo.dto';
import { DB_PROVIDER } from '@/db/db.provider';
import { todoTable } from './entities/todo.entity';

@Injectable()
export class TodoRepository {
	constructor(
		@Inject(DB_PROVIDER)
		private readonly txHost: TransactionHost<DbTransactionAdapter>,
	) {}

	async findOne(id: string) {
		const [todo] = await this.txHost.tx
			.select()
			.from(todoTable)
			.where(eq(todoTable.id, id));

		if (!todo) {
			return null;
		}

		return todo;
	}

	async findAll() {
		return this.txHost.tx.select().from(todoTable);
	}

	async create(values: InsertTodoDto) {
		const [todo] = await this.txHost.tx
			.insert(todoTable)
			.values({ ...values })
			.returning();

		return todo;
	}

	async remove(id: string) {
		const [todoRemoved] = await this.txHost.tx
			.delete(todoTable)
			.where(eq(todoTable.id, id))
			.returning({ id: todoTable.id });

		if (!todoRemoved.id) {
			return null;
		}

		return todoRemoved;
	}

	async update(id: string, values: UpdateTodoDto) {
		const todo = await this.txHost.tx
			.update(todoTable)
			.set(values)
			.where(eq(todoTable.id, id));

		return todo;
	}
}
