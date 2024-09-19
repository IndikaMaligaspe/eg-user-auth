import { Module, forwardRef } from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './localStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStratergy';
import { jwtSECRET } from './constants';


@Module({
  imports:[ 
    JwtModule.register({
      secret: jwtSECRET.secret,
      signOptions: { expiresIn: '3000s' },
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports:[AuthService],
})
export class AuthModule {}
