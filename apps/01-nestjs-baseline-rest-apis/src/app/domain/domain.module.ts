import { DBModule } from '@dev/database';
import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
@Module({
  imports: [
    UserModule,
    DBModule.forRoot({
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DomainModule {}
