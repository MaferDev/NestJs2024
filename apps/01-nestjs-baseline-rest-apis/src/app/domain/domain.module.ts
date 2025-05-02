import { ConfigModule, ConfigService } from '@dev/config';
import { DBModule } from '@dev/database';
import { EmailModule } from '@dev/email';

import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer, RouteInfo } from '@nestjs/common/interfaces';
import { AuthMiddleware } from '../core/middleware/auth.middleware';
import { LoggerMiddleware } from '../core/middleware/log.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersEntity } from './users/user.entity';
import { UserModule } from './users/user.module';
export const GLOBAL_PREFIX = '/api/v1';

// useClass - to get a private instance of the options provider.
// useFactory - to use a function as the options provider.
// useExisting - to re-use an existing (shared, SINGLETON) service as the options provider.

@Module({
  imports: [
    EmailModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          service: configService.get().email.service_name,
          user: configService.get().email.username,
          pass: configService.get().email.password,
        };
      },
    }),
    AuthModule,
    UserModule,
    DBModule.forRoot({
      entities: [UsersEntity],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DomainModule implements NestModule {
  public authRoutes: Array<RouteInfo> = [
    {
      path: `*`,
      method: RequestMethod.ALL,
    },
  ];

  public publicRoutes: Array<RouteInfo> = [
    {
      path: `${GLOBAL_PREFIX}/health`,
      method: RequestMethod.GET,
    },
  ];
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...this.publicRoutes)
      .forRoutes(...this.authRoutes);

    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
