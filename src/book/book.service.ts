import { Injectable } from '@nestjs/common';
//引入数据库
import { Admin, ListCollectionsCursor, Repository, } from 'typeorm';
//注入数据库
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity'
import { IResponse } from 'src/utils/response';

@Injectable()
export class BookService {
    private response: IResponse;
    //创建一个redis的服务
    constructor(
        @InjectRepository(Book) 
        private readonly book: Repository<Book>,
    ){    }

    public async addBook(book: Book){
        if (await this.book.createQueryBuilder('Book')
        .where("name = :name", { name :book.name }).getOne()){
            return this.response = {
                code: 1,
                msg: "这本书已在库中"
            }
        } else {
            await this.book.save(book)
            this.response = {
                code: 0,
                msg: "注册成功"
            }
            return this.response
        }
    }

    public async searchBook(name: string){
        let theBook =  await this.book.createQueryBuilder('Book')
        .where("name = :name", { name :name })
        .getOne()
        if(theBook){
            return this.response = {
                code: 0,
                msg: theBook
            }
        } else {
            return this.response = {
                code: 1,
                msg: "查无此书"
            }
        }
    }
}
