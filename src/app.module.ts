import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './control/user/user.module';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { RedisService } from './redis/redis.service';
import { BookService } from './control/book/book.service';
import { BookController } from './control/book/book.controller';
import { BookModule } from './control/book/book.module';
import { MenuModule } from './control/menu/menu.module';
import { Book } from './entity/book.entity';
import { SwitchModule } from './control/switch/switch.module';
import { Switch } from './entity/switch.entity';





@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'wsy021031',
    database: 'library',
    entities: [User, Book, Switch],
    synchronize: true,
    //自动加载实体
    // autoLoadEntities:true,
  }), UserModule, AuthModule, BookModule, MenuModule, SwitchModule,],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
