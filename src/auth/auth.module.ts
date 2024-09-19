import { Module, forwardRef } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './localStrategy';


@Module({
  imports:[ forwardRef(() => UserModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports:[AuthService],
})
export class AuthModule {}
