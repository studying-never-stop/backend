import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { RedisService } from './redis/redis.service';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';





@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'wsy021031',
    database: 'library',
    entities: [User],
    synchronize: true,
    //自动加载实体
    // autoLoadEntities:true,
  }), UserModule, AuthModule, BookModule,  ],
  controllers: [AppController, BookController],
  providers: [AppService, RedisService, BookService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
