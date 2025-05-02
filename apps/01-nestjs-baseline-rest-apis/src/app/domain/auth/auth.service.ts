import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  // This service would typically handle authentication logic
  validateUser(username: string, password: string): boolean {
    // Placeholder for user validation logic
    return username === 'test' && password === 'test';
  }

  login(user: any) {
    console.log('Login user:', user);
    // Placeholder for login logic
    return { access_token: 'token' };
  }
}
