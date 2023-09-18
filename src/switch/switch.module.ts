import { Module } from '@nestjs/common';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Switch } from 'src/entity/switch.entity'
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { BookService } from 'src/book/book.service';

@Module({
  imports:[TypeOrmModule.forFeature([Switch]),UserModule,BookModule],
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule {}
