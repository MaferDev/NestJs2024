import { HTTP_CLIENT_TOKEN, HttpClientService } from '@dev/http';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './user.dto';
import { UsersEntity } from './user.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
    @Inject(HTTP_CLIENT_TOKEN)
    private readonly apiService: HttpClientService,
  ) {}
  async fetchUsers() {
    try {
      this.logger.log('Fetching all users');
      try {
        await this.apiService.fetch('get', {});
      } catch (error) {
        console.log('Error fetching users', error);
      }
      return await this.userRepo.find({});
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createUser(body: CreateUserDto) {
    return await this.userRepo.save(body);
  }
}
