import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEmail,
  IsDate,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDate()
  fecha_nacimiento: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
