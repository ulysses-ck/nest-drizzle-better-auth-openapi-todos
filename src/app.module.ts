import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
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
	controllers: [AppController],
	providers: [AppService, TodosService],
})
export class AppModule {}
