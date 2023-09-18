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
        let userid: number = data.userid;
        let bookid: number = data.bookid;


        let user: User= await this.userService.checknumber(userid);
        console.log(user.lendnumber)
        if(user.lendnumber == 5){
            return this.response = {
                code: 1,
                msg:"已达到借书上限，请先归还一些书后再接"
            }
        } else {
            let user = await this.userService.findUser(userid);
            let book = await this.bookService.findBook(bookid);

            const msg = this.Switch.create({
                actioner: user.name,
                book: book.name,
                acttype: ["lend"],
            });
            console.log(msg)
            await this.userService.lend(userid);
            await this.bookService.lend(bookid);
            await this.userService.addReadTime(userid);
            await this.Switch
            .save(msg)
            return this.response = {
                code: 0,
                msg: "借书成功"
            }
            
        }
    }

    public async returnBook(data: any){
        let userid: number = data.userid;
        let bookid: number = data.bookid;

        let user = await this.userService.findUser(userid);
        let book = await this.bookService.findBook(bookid);

        const msg = this.Switch.create({
            actioner: user.name,
            book: book.name,
            acttype: ["return"],
        });
        await this.userService.return(userid);
        await this.bookService.return(bookid);
        await this.Switch
        .insert(msg)
        return this.response = {
            code: 0,
            msg: "还书成功"
        }
    }
}
