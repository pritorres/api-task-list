import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/dtos/task.dto';
import { Task } from 'src/entities/task.entity';
import { TaskService } from 'src/services/task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return await this.taskService.getAll();
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
