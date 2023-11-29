import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // 如果没有设置角色要求，则允许访问
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // 假设用户信息存储在请求中的 user 字段中

    // 假设 user 包含一个名为 roles 的字段用于表示用户角色
    // 检查用户是否具有所需的角色
    const hasRequiredRole = roles.some((role) => user.roles.includes(role));
    return hasRequiredRole;
  }
}
