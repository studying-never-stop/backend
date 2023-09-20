import { Injectable } from '@nestjs/common';
//引入数据库
import { Admin, ListCollectionsCursor, Repository, } from 'typeorm';
//注入数据库
import { InjectRepository } from '@nestjs/typeorm';
import { Switch } from 'src/entity/switch.entity'; 
import { IResponse } from 'src/utils/response';
import { UserService } from 'src/user/user.service';
import { BookService } from 'src/book/book.service'; 
import { User } from 'src/entity/user.entity';
import { Book } from 'src/entity/book.entity';
import { BasePrivateKeyEncodingOptions } from 'crypto';

@Injectable()
export class SwitchService {
    private response: IResponse;
    constructor(
        private userService: UserService,
        private bookService: BookService,
        @InjectRepository(Switch) 
        private readonly Switch : Repository<Switch>,
    ){    }

    public async lendBook(data: any){
        let username: string = data.actor;
        let bookname: string = data.book;

        let user: User= await this.userService.findUser(username);
        let book: Book= await this.bookService.findBook(bookname);

        if(user.lendnumber == 5){
            return this.response = {
                code: 1,
                msg:"已达到借书上限，请先归还一些书后再接"
            }
        } else {
            if(book.keep != 0){
                const msg = this.Switch.create({
                    actor: user.name,
                    book: book.name,
                    acttype: ["lend"],
                });
                await this.userService.lend(user.id);
                await this.bookService.lend(book.id);
                await this.Switch
                .save(msg)
                return this.response = {
                    code: 0,
                    msg: "借书成功"
                }
            } else {
                return this.response = {
                    code: 1,
                    msg: "此书已无库存，请下次再借"
                }
            }
        }
    }

    public async returnBook(data: any){
        let username: string = data.actor;
        let bookname: string = data.book;

        let user: User= await this.userService.findUser(username);
        let book: Book= await this.bookService.findBook(bookname);

        const msg = this.Switch.create({
            actor: user.name,
            book: book.name,
            acttype: ["return"],
        });
        await this.userService.return(user.id);
        await this.bookService.return(book.id);
        await this.Switch
        .insert(msg)
        return this.response = {
            code: 0,
            msg: "还书成功"
        }
    }

    public async buyBook(data: any){
        let username: string = data.actor;
        let bookname: string = data.book;

        let user: User= await this.userService.findUser(username);
        let book: Book= await this.bookService.findBook(bookname);

        if(user.lendnumber == 5){
            return this.response = {
                code: 1,
                msg:"已达到借书上限，请先归还一些书后再接"
            }
        } else if(book.keep != 0) {
            const msg = this.Switch.create({
                actor: user.name,
                book: book.name,
                acttype: ["buy"],
            });
            await this.userService.buy(user.id);
            await this.bookService.buy(book.id);
            await this.Switch
            .insert(msg)
            return this.response = {
                code: 0,
                msg: "买书成功"
            }
        } else {
            return this.response = {
                code: 1,
                msg: "已无库存，请下次再买"
            }
        }
        
    }

    public async getInformation(msg: any){
        const query: string = msg.query
        const acttype: string = msg.acttype
        const pagenum: number = msg.pagenum
        const pagesize: number = msg.pagesize
        let thelist = []
        let total: number
        let Switchs: any

        if(query == ''){
            if(acttype == ''){
                Switchs =  await this.Switch.createQueryBuilder('Switch')
                .getMany()
            } else {
                Switchs =  await this.Switch.createQueryBuilder('Switch')
                .where("acttype = :acttype", {acttype: acttype})
                .getMany()
            } 
        } else {
            if(acttype == ''){
                Switchs =  await this.Switch.createQueryBuilder('Switch')
                .where("actor = :actor", {actor: query})
                .orWhere("book = :book", {book: query})
                .getMany()
            } else {
                Switchs =  await this.Switch.createQueryBuilder('Switch')
                .where("actor = :actor", {actor: query})
                .orWhere("book = :book", {book: query})
                .andWhere("acttype = :acttype", {acttype: acttype})
                .getMany()
            }
        }


        total = Switchs.length
        let startNumber: number = (pagenum-1)*pagesize
        let endNumber: number = pagenum*pagesize < total ? pagenum*pagesize : total

        for (let i = startNumber; i < endNumber; i++){
            thelist.push(Switchs[i])
            }

        return {
            code: 0,
            msg: {
                data: thelist,
                total: total
            }
        }
    }

    /**
     * 数据获取总控件
     */
    public async getData(msg: any){
        let request = msg.request
        
        switch(request){
            case ('usernumber'):
                await this.usernmuber(msg)
                break;
            case ('kindofbook'):
                await this.kindOfBook(msg)
                break;
            case ('leftbook'):
                await this.leftBook()
                break;
            case ('monthchange'):
                await this.monthchange(msg)
                break;
            default:
                return this.response = {
                    code: 1,
                    msg: "无找到相应数据"
                }
        }
        
        
    }

    public async countLendNum(){
        return await this.Switch.createQueryBuilder("Switch")
        .where("acttype = :acttype", {acttype: 'lend'})
        .getCount()
    }

    public async countSellNum(){
        return await this.Switch.createQueryBuilder("Switch")
        .where("acttype = :acttype", {acttype: 'buy'})
        .getCount()
    }

    public async countAllSwitch(){
        return await this.Switch.count()
    }

    public async kindOfBook(msg: any){

    }

    public async leftBook(){
        let keepbook: number = await this.bookService.countBooks()
        let sell: number = await this.countSellNum()
        let lend: number = await this.countLendNum()
        let data = [
            { value: keepbook, name: 'keep' },
            { value: sell, name: 'lend' },
            { value: lend, name: 'sell' }
          ]
        
          console.log(data)
          return this.response = {
            code: 0,
            msg: data
          }
    }

    public async usernmuber(msg: any){

    }

    public async monthchange(msg: any){

    }
}
