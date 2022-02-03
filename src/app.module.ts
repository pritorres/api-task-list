import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '././tasks/task.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './products/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/modules/auth.module';
import { AuthController } from './auth/controllers/auth.controller';
import { UserController } from './user/controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'priscilatorres',
      password: 'panconqueso1',
      database: 'task-list',
      entities: ['entities/*.ts'],
      synchronize: true, // actualiza la db con las entidades del proyecto en cada start-up
      dropSchema: true, // elimina el schema en cada start-up
      autoLoadEntities: true, // carga las entidades en el startup
    }),
    TaskModule,
    CategoryModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule {}
