import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    const user = this.userRepo.find();
    return await user;
  }

  async getOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  async create(body: CreateUserDto): Promise<User> {
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
