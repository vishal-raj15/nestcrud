import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: 3306,
      username: process.env.USER_NAME,
      password: process.env.ROOT_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// passworD123@A#
