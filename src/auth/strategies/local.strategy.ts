import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
// cuando tengo una extends(herencia)(passportstrategy) debo llamar siempre al super()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super(); // si utilizo otra conf debe ir aca
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('not allow');
    }
    return user;
  }
}
