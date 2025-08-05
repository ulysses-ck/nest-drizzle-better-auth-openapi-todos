import { Module } from '@nestjs/common';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DB_PROVIDER } from './db/db.provider';
import { auth } from './lib/auth';
import { TodosModule } from './todos/todos.module';

@Module({
	imports: [
		DbModule,
		ClsModule.forRoot({
			global: true,
			plugins: [
				new ClsPluginTransactional({
					imports: [DbModule],
					adapter: new TransactionalAdapterDrizzleOrm({
						drizzleInstanceToken: DB_PROVIDER,
					}),
				}),
			],
		}),
		AuthModule.forRoot(auth),
		TodosModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
