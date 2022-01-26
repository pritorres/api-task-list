import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.create(body);
  }
}
