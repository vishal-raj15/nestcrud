import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('work')
  async working(): Promise<string> {
    return 'working';
  }
  @Get()
  async findAllUsers(): Promise<UserEntity[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<UserEntity> {
    try {
      return this.userService.findUserById(id);
    } catch (error) {
      throw new BadRequestException('no user with id : ', String(id));
    }
  }

  @Post()
  async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    try {
      return this.userService.createUser(user);
    } catch (error) {
      throw new BadRequestException('somenthin went wrong');
    }
  }

  @Put()
  async updateUser(@Body() id: number, user: UserEntity): Promise<UserEntity> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
