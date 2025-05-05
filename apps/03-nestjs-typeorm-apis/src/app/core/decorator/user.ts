import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Record<string, unknown> = ctx.switchToHttp().getRequest();
    const user: object | null = request.user ?? null;
    return user;
    // return data ? user?.[data] : user;
  },
);
