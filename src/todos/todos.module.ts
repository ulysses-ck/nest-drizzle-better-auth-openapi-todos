import { Module } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
	controllers: [TodosController],
	providers: [TodoRepository, TodosService],
})
export class TodosModule {}
