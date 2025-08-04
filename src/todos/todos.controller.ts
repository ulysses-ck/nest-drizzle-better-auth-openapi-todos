import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import type { CreateTodoDto, UpdateTodoDto } from "./dto/todo.dto";
import type { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

	@Get()
	findAll() {
		return this.todosService.findAll();
	}

	@Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

	@Patch(":id")
	update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
		return this.todosService.update(id, updateTodoDto);
	}

	@Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
