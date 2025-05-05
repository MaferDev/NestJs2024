import { HTTP_CLIENT_TOKEN, HttpClientService } from '@dev/http';
import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UserQueryDto } from './user.dto';
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
  async fetchUsers(data: UserQueryDto) {
    try {
      this.logger.log('Fetching all users');
      throw new ForbiddenException();

      return await this.userRepo.find({});
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async createUser(body: CreateUserDto) {
    return await this.userRepo.save(body);
  }
}
