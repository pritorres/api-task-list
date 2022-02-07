import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { AuthModule } from 'src/auth/modules/auth.module';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [ApiKeyGuard, AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    ApiKeyGuard,
    /* {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    }, */
  ],
  exports: [UserService],
})
export class UserModule {}
