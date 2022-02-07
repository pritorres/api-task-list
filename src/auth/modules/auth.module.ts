import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalStrategy } from './../strategies/local.strategy';
import { AuthService } from './../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from './../../user/services/user.service';
import { User } from './../../user/entities/user.entity';
import { secret } from 'src/constanst/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: secret, // esta es la firma, solo con esta puedo desencriptar
      signOptions: {
        expiresIn: '10d', // tiempo de exporacion del token
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
