import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './../dtos/task.dto';
import { Task } from './../entities/task.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    const task = this.taskRepo.find();
    return await task;
  }

  async getOne(id: number): Promise<Task> {
    return await this.taskRepo.findOne(id);
  }

  async getUserTasks(id: number): Promise<Task[]> {
    return this.taskRepo
      .createQueryBuilder()
      .select('task.id', 'id')
      .addSelect('category.name', 'category_id')
      .addSelect('user.name', 'user_id')
      .from(Task, 'task')
      .leftJoin(Category, 'category', 'category.id = task.category_id')
      .leftJoin(User, 'user', 'user.id = task.user_id')
      .getMany();
  }

  async create(body: CreateTaskDto): Promise<Task> {
    return await this.taskRepo.save(body);
  }

  async update(id: number): Promise<Task> {
    return await this.taskRepo.save({
      id,
      ...Body,
    });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }
}
