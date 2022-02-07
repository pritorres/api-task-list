import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
/* import * as bcrypt from 'bcrypt';
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async getAll(): Promise<User[]> {
    const user = this.userRepo.find();
    return await user;
  }

  async getOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  async getUserName(name: string): Promise<User> {
    return this.userRepo.findOne({ where: { name } });
  }

  async create(body: CreateUserDto): Promise<User> {
    //const hashPassword = await bcrypt.hash(body.password, 10); // encriptacion de password
    return await this.userRepo.save(body);
  }

  async update(id: number): Promise<User> {
    return await this.userRepo.save({
      id,
      ...Body,
    });
  }

  async delete(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
