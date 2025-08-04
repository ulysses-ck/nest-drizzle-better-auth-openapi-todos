import { Module } from '@nestjs/common';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './controllers/todos/todos.controller';
import { DbModule } from './db/db.module';
import { DB_PROVIDER } from './db/db.provider';
import { TodosService } from './providers/todos/todos.service';

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
	],
	controllers: [AppController, TodosController],
	providers: [AppService, TodosService],
})
export class AppModule {}
