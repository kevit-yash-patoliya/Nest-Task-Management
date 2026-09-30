import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLogger } from './lib/logger/logger.app';
import { LoggerInterceptors } from './lib/logger/logger.interceptor';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TasksModule, UsersModule,MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: () => ({
      uri: process.env.MONGO_URL || "mongodb://localhost:27017/",
      dbName: process.env.DB_NAME || "nest-task-management-db",
    }),
    inject: [ConfigService],
  }),
  
],
  controllers: [AppController],
  providers: [
    AppService,
    AppLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptors,
    },
  ],
})
export class AppModule {}
