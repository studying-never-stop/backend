import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post()
    public async addBook(){

    }

    @Get()
    public async getBook(){
        
    }

    @Post()
    public async SearchBook(){

    }
}
