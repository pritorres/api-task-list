import { Controller, Get } from '@nestjs/common';
import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/services/category.service';

@Controller('task')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAll();
  }
}
