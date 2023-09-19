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

    public async getBook(msg: any){
        const query: string = msg.query
        const pagenum: number = msg.pagenum
        const pagesize: number = msg.pagesize
        let thelist = []
        let total: number
        let Books: any

        if(query == ''){
            Books =  await this.book.createQueryBuilder('Book')
            .getMany()
        } else {
            Books =  await this.book.createQueryBuilder('Book')
            .where("writer = :writer", {writer: query})
            .orWhere("name = :name", { name: query })
            .orWhere("kind = :kind", { kind: query})
            .getMany()
        }

        total = Books.length
        let startNumber: number = (pagenum-1)*pagesize
        let endNumber: number = pagenum*pagesize < total ? pagenum*pagesize : total

        for (let i = startNumber; i < endNumber; i++){
            thelist.push(Books[i])
            }

        return {
            code: 0,
            msg: {
                data: thelist,
                total: total
            }
        }
    }

    public async delBook(id: number){
        return await this.book.createQueryBuilder('Book')
        .delete()
        .from(Book)
        .where("id = :id", { id: id })
        .execute()
        .then(() =>{
            return this.response = {
                code: 0,
                msg: "此书删除成功",
            }
        })
    }

    public async editBook(book: Book, id: number){
        return await this.book.createQueryBuilder('User')
            .update(Book)
            .set(book)
            .where("id = :id", { id: id })
            .execute()
            .then(() =>{
                return this.response = {
                    code: 0,
                    msg: "本书修改成功",
                }
            })
    }

    public async lend(id: number){
        return await this.book.createQueryBuilder('Book')
        .update(Book)
        .set({
            keep: false,
            bereadtimes: () => "bereadtimes + 1"
        })
        .where("id = :id", {id: id})
        .execute()
    }

    public async return(id: number){
        return await this.book.createQueryBuilder('Book')
        .update(Book)
        .set({
            keep: true,
            // bereadtimes: () => "bereadtimes + 1"
        })
        .where("id = :id", {id: id})
        .execute()
    }

    public async findBook(name: string){
        return await this.book.findOneBy({name})
    }

}
