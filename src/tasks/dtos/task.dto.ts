import { IsNotEmpty, IsNumber } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
