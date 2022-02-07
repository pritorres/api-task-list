import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/services/user.service';
import { User } from './../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUserName(username);

    if (user.password !== password) {
      return null;
    }
    return user;
  }

  createToken(user: Omit<User, 'password'>): { access_token: string } {
    const token = this.jwtService.sign({ userId: user.id, name: user.name });

    return { access_token: token };
  }
}
