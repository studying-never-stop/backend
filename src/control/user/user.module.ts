import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { HashPasswordMiddleware } from 'src/tools/hash-password/hash-password.middleware';
import { AppModule } from 'src/app.module';
import { RedisService } from 'src/redis/redis.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  providers: [UserService, RedisService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {

}
