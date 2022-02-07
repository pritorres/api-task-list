import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './../dtos/task.dto';
import { Task } from './../entities/task.entity';
import { TaskService } from './../services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return await this.taskService.getAll();
  }

  @Get(':id/task')
  async getUserTask(@Param('id') id: number): Promise<Task[]> {
    return await this.taskService.getUserTasks(id);
  }

  @Get(':id')
  async getTask(@Param('id') id: number): Promise<Task> {
    return await this.taskService.getOne(id);
  }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(body);
  }

  async update(id: number): Promise<Task> {
    return await this.taskService.update(id);
  }

  async delete(id: number): Promise<void> {
    await this.taskService.delete(id);
  }
}
