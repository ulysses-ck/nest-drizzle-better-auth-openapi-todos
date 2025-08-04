import { Module } from '@nestjs/common';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DB_PROVIDER } from './db/db.provider';
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
		TodosModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
