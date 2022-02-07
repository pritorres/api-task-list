import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAll(): Promise<Category[]> {
    const category = this.categoryRepo.find();
    return await category;
  }

  async getOne(id: number): Promise<Category> {
    return await this.categoryRepo.findOne(id);
  }

  async create(body: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepo.save(body);
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
