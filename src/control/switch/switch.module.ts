import { Module } from '@nestjs/common';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Switch } from 'src/entity/switch.entity'
import { BookModule } from 'src/control/book/book.module';
import { UserModule } from 'src/control/user/user.module';
import { UserService } from 'src/control/user/user.service';
import { BookService } from 'src/control/book/book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Switch]), UserModule, BookModule],
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule { }
