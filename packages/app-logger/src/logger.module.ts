import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { LoggerMiddleware } from "./logger.middleware";
import { MyLoggerService } from "./logger.service";

@Module({
  imports: [],
  controllers: [],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class AppLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
