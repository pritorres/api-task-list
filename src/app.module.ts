import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task.module';
import { UserModule } from './modules/user.module';
import { CategoryModule } from './modules/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/modules/auth.module';
import { AuthController } from './auth/controllers/auth.controller';

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
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
