import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './../../modules/user.module';
import { LocalStrategy } from './../strategies/local.strategy';
import { AuthService } from './../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'my project', // esta es la firma, solo con esta puedo desencriptar
      signOptions: {
        expiresIn: '10d', // tiempo de exporacion del token
      },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
