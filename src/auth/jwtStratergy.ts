import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { jwtSECRET } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger: Logger;
  constructor(@Inject(forwardRef(() => UserService))
  private readonly UserService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSECRET.secret,
    });
    this.logger = new Logger(JwtStrategy.name);
  }

  async validate(payload: any) {
    return await this.UserService.findOne({ email: payload.email });
  }
}