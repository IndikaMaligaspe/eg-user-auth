import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      })
    }),
  ],
    // MongooseModule.forRoot('mongodb://localhost:27017/eg-db')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
