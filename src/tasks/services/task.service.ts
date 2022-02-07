import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './../dtos/task.dto';
import { Task } from './../entities/task.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from './../../user/entities/user.entity';

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
      .createQueryBuilder('task')
      .select('task.id', 'id')
      .addSelect('category.name', 'category')
      .addSelect('user.name', 'user')
      .innerJoin(Category, 'category', 'category.id = task.category_id')
      .innerJoin(User, 'user', 'user.id = task.user_id')
      .where('task.user_id = :id', { id })
      .printSql()
      .getRawMany();
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
