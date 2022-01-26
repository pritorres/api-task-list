import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    const user = this.categoryRepo.find();
    return await user;
  }

  async getOne(id: number): Promise<Category> {
    return await this.categoryRepo.findOne(id);
  }

  async create(): Promise<Category> {
    return await this.categoryRepo.create();
  }

  async update(id: number): Promise<Category> {
    return await this.categoryRepo.save({
      id,
      ...Body,
    });
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepo.delete(id);
  }
}
