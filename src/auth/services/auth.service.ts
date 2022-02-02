import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../services/user.service';
import { User } from 'src/entities/user.entity';
import { PayloadToken } from '../modules/token.model';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
    // if (user && isMatch ) {
    //const inMatch = await bcrypt.compare(pass, user.password) //otra opcion realizando la comparacion
    // if (isMatch) {
    // const { password, ...result } = user;//toJSON()
    //    return user}
    //}
  }

  /* async generateJWT(user: User) {
    const payload: PayloadToken = { role: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), //la firma
      user,
    };
  } */

  /* async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } */
}
