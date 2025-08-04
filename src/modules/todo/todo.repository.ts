import { Injectable } from '@nestjs/common';
import type { TransactionHost } from '@nestjs-cls/transactional';
import { eq } from 'drizzle-orm';
import type { DbTransactionAdapter } from 'src/db/client';
import { todoTable } from 'src/db/schema';

@Injectable()
export class TodoRepository {
	constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

	async find(id: string) {
		const [todo] = await this.txHost.tx
			.select()
			.from(todoTable)
			.where(eq(todoTable.id, id));

		if (!todo) {
			return null;
		}

		return todo;
	}

	async all() {
		return this.txHost.tx.select().from(todoTable);
	}

	async createTodo(values: { isCompleted: boolean; text: string }) {
		const [todo] = await this.txHost.tx
			.insert(todoTable)
			.values({ ...values })
			.returning({ id: todoTable.id });

		if (!todo.id) {
			return null;
		}

		return todo;
	}

	async removeTodo(values: { id: string }) {
		const [todoRemoved] = await this.txHost.tx
			.delete(todoTable)
			.where(eq(todoTable.id, values.id))
			.returning({ id: todoTable.id });

		if (!todoRemoved.id) {
			return null;
		}

		return todoRemoved;
	}
}
