import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '../../tools/role/role.decorator'; // 自定义的角色装饰器
import { AuthGuard } from '../../guards/auth.guard'; // 自定义的权限守卫
import { BookService } from './book.service';
import { Book } from 'src/entity/book.entity';

@Controller('book')
@UseGuards(AuthGuard)//对是否可访问进行判断
export class BookController {
    constructor(private bookService: BookService) { }

    @Post('addBook')
    @Role("admin")//确定可访问的角色
    public async addBook(@Body() book: Book) {
        return this.bookService.addBook(book)
    }

    @Post('getBook')
    public async getBook(@Body() msg: any) {
        return this.bookService.getBook(msg)
    }

    @Put("editBook/:id")
    @Role("admin")
    editUser(@Body() book: Book, @Param('id') id: number) {
        return this.bookService.editBook(book, id)
    }

    @Delete("delBook/:id")
    @Role("admin")
    delUser(@Param('id') id: number) {
        return this.bookService.delBook(id)
    }
}
