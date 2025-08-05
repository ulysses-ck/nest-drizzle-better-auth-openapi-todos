import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as authSchema from '@/db/auth-schema';
import db from '@/db/client';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			authSchema,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
});
