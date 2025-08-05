import type { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { todoTable } from '@/todos/entities/todo.entity';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as authSchema from './auth-schema';

const db = drizzle({
	connection: process.env.DATABASE_URL!,
	schema: {
		todoTable,
		authSchema,
	},
});

export type DB = typeof db;

export type DbTransactionAdapter = TransactionalAdapterDrizzleOrm<typeof db>;

export default db;
