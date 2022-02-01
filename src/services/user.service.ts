import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';

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

  async findEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ where: { email } }); // busca al primer email que cohincida con este email
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
