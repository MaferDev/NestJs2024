import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './user.dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
  ) {}
  async fetchUsers() {
    return await this.userRepo.find({});
  }

  async createUser(body: CreateUserDto) {
    return await this.userRepo.save(body);
  }
}
