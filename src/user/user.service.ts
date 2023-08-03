// implementation of injectable api interface for the controller
// to handle

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<UserEntity> {
    const options: FindOneOptions<UserEntity> = {
      where: { id }, // Find the user with the given id
    };
    return this.userRepository.findOne(options);
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    const options: FindOneOptions<UserEntity> = {
      where: { id }, // Find the user with the given id
    };
    return this.userRepository.findOne(options);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
