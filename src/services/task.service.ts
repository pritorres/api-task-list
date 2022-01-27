import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './../dtos/task.dto';
import { Task } from './../entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    const user = this.taskRepo.find();
    return await user;
  }

  async getOne(id: number): Promise<Task> {
    return await this.taskRepo.findOne(id);
  }

  async create(body: CreateTaskDto): Promise<Task> {
    return await this.taskRepo.create(body);
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
