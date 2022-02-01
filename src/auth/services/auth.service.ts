import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../services/user.service';
import { User } from 'src/entities/user.entity';
import { PayloadToken } from '../modules/token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtServices = JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findEmail(email);
    // if (user && isMatch ) {
    //const inMatch = await bcrypt.compare(pass, user.password) //otra opcion realizando la comparacion
    // if (isMatch) {
    // const { password, ...result } = user;
    //    return user}
    //}

    if (user && user.password === pass) {
      const { password, ...result } = user; //toJSON()
      return result;
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { sub: user.id }; //falta role: user.role
    return {
      access_token: this.jwtServices.toString(payload), //la firma
      user,
    };
  }
}
