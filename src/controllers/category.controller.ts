import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }

  @Post()
  async create(@Body() body: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(body);
  }
}
