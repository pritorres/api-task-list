import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './../../modules/user.module';
import { LocalStrategy } from './../strategies/local.strategy';
import { AuthService } from './../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from 'src/services/user.service';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'my project', // esta es la firma, solo con esta puedo desencriptar
      signOptions: {
        expiresIn: '10d', // tiempo de exporacion del token
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
