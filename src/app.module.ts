import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TaskModule } from '././tasks/task.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './categories/category.module';
import { AuthModule } from './auth/modules/auth.module';
import { AuthController } from './auth/controllers/auth.controller';
import config from './config';

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
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
