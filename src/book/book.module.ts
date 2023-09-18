import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from 'src/entity/book.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Book])],
    providers: [BookService],
    controllers: [BookController],
    exports:[BookService]
})
export class BookModule {}
