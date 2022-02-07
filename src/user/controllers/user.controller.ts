import { UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { UnauthorizedException } from '@nestjs/common';

import { CreateUserDto } from './../dto/user.dto';
import { User } from './../entities/user.entity';
import { UserService } from './../services/user.service';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authServices: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Post('auth/login')
  async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    const user = await this.authServices.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException('user not exit');
    }

    const token = this.authServices.createToken(user);
    return token;
  }
  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.userService.create(body);
  }
}
