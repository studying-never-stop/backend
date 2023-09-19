import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from 'src/entity/book.entity';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post('addBook')
    public async addBook(@Body() book: Book){
        return this.bookService.addBook(book)
    }

    @Post('getBook')
    public async getBook(@Body() msg: any){
        return this.bookService.getBook(msg)
    }

    @Put("editBook/:id")
    editUser(@Body() book: Book, @Param('id') id: number){
        return this.bookService.editBook(book, id)
    }

    @Delete("delBook/:id")
    delUser( @Param('id') id: number){
        return this.bookService.delBook(id)
    }
}
