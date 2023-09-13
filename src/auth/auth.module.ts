import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { JwtStrategy } from './jwt.strategy';
import { HashPasswordMiddleware } from 'src/hash-password/hash-password.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: JWT_CONSTANT.secret})],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(HashPasswordMiddleware)
      .forRoutes('auth/regist') 
      .apply(HashPasswordMiddleware)
      .forRoutes('auth/alter') 
  }
}
