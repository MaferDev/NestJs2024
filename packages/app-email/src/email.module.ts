import { DynamicModule, Module } from "@nestjs/common";
import EmailAsyncOptions, {
  EMAIL_CONFIG_OPTIONS,
  EmailOptions,
} from "./email.interface";
import { EmailService } from "./email.service";

@Module({})
export class EmailModule {
  static register(options: EmailOptions): DynamicModule {
    return {
      module: EmailModule,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useValue: options,
        },
        EmailService,
      ],
    };
  }
  static registerAsync(options: EmailAsyncOptions): DynamicModule {
    return {
      module: EmailModule,
      imports: options.imports,
      providers: [
        {
          provide: EMAIL_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        EmailService,
      ],
      exports: [EmailService],
    };
  }
}
