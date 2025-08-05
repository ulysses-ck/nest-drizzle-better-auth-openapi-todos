import type { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { todoTable } from '@/todos/entities/todo.entity';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { account, session, user, verification } from './auth-schema';

const db = drizzle({
	connection: process.env.DATABASE_URL!,
	schema: {
		todoTable,
		account,
		session,
		user,
		verification,
	},
});

export type DB = typeof db;

export type DbTransactionAdapter = TransactionalAdapterDrizzleOrm<typeof db>;

export default db;
