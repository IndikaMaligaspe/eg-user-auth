import { Injectable, Inject, Logger, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose'
import { User, UserDocument } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel:  Model<UserDocument>,
    @Inject(forwardRef(()=>AuthService)) private AuthService:AuthService
  ){
    this.logger = new Logger(UserService.name)
  }

  async create(createUserDto: CreateUserDto) : Promise<User> {
    this.logger.log('Creating User');

    const hasPassword = await this.AuthService.getHashPassword(createUserDto.password);
    createUserDto.password = hasPassword;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(query: any): Promise<User> {
    return this.userModel.findOne(query).select('+password');
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
