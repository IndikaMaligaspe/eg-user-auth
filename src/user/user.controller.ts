import { Controller, Get, Post, Body, Patch, Param, Delete , Request, Logger} from '@nestjs/common';
import { ConflictException } from '@nestjs/common'; 
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  logger:Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) : Promise <CreateUserDto>{
    try{
      const query = { email: createUserDto.email };
      const isUser = await this.userService.findOne(query);
      if(isUser) throw new ConflictException('User Already existing')
      return this.userService.create(createUserDto);
    } catch (err) {
      this.logger.error('Error when creating user !', err);
      throw err;
    }
    
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) : Promise <UserDto>{
    const query = { email: email };
    return await this.userService.findOne(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
