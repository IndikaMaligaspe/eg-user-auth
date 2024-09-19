import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './localStrategy';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  logger:Logger
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name)
  }

  @Post('login')
  @UseGuards( LocalAuthGuard )
  async login(@Request() req): Promise<any>{
    try{
      return req.user;
    } catch (err) {
      this.logger.error(`Error loggin in for user {}`, err);
      throw err;
    }
  }
}
