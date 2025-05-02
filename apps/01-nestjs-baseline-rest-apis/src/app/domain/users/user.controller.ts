import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleAllowed } from 'src/app/core/decorator/role-allowed';
import { User } from 'src/app/core/decorator/user';
import { AuthGuard } from 'src/app/core/guard/api-guard';
import { CrateUserResponseDto, CreateUserDto } from './user.dto';
import { UsersEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('authorization')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @RoleAllowed('admin', 'user')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [CrateUserResponseDto],
    description: 'user fetched successfully',
  })
  @ApiOperation({ description: 'user fetch api ' })
  @ApiConsumes('application/json')
  @Get()
  async findAll(@User() user: any): Promise<UsersEntity[] | undefined> {
    console.log(user);
    return await this.userService.fetchUsers();
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: CrateUserResponseDto,
    description: 'user created successfully',
  })
  @ApiOperation({ description: 'user create api ' })
  @ApiConsumes('application/json')
  @Post()
  async create(@Body() body: CreateUserDto): Promise<UsersEntity> {
    return await this.userService.createUser(body);
  }
}
