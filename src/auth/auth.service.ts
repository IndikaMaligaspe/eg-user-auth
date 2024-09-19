import { forwardRef, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  logger:Logger
  constructor(
    @Inject(forwardRef(() => UserService)) 
      private userService: UserService,
      private jwtService: JwtService,
  ){
    this.logger = new Logger(AuthService.name)
   }

  async comparePassword (password: string, hashpassword: string) : Promise<boolean> {
    return new Promise((resolve, reject) =>{
      bcrypt.compare(password, hashpassword)
        .then((isMatch) => { 
            if(isMatch) 
              resolve(true);
            else
              resolve(false); 
            }
          )
          .catch(err => reject(err));
    })
  }

  async getHashPassword (password: string) : Promise<string> {
    return new Promise((resolve, reject) =>{
      bcrypt.hash(password, 10).then((hash) => resolve(hash)).catch(err => reject(err));
    })
  }


  async generateJwtToekn(user: any) {
    const payload = {
      email: user.email
    };

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string) : Promise<User> {
    const query = { email: email };

    const user = await this.userService.findOne(query);
    if(!user) throw new NotFoundException(`User wil provided email ${ email }: , not available. `);
    const isMatched = await this.comparePassword(password, user.password);
    if(!isMatched) throw new UnauthorizedException('Invalid Password !');
    return user;
  }
}


