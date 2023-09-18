import { Injectable } from '@nestjs/common';
//引入数据库
import { Admin, ListCollectionsCursor, Repository, } from 'typeorm';
//注入数据库
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { error } from 'console';
import { IResponse } from 'src/utils/response';
import * as Redis from 'ioredis';
import { RedisService } from 'src/redis/redis.service';


@Injectable()
export class UserService {

    private response: IResponse;
    //创建一个redis的服务
    constructor(
        @InjectRepository(User) 
        private readonly user: Repository<User>,
        private readonly redisService : RedisService
    ){    }

    // addUser(){
    //     const data = new User()
    //     // data.id=1;
    //     data.name = 'admin2';
    //     data.password='admin2';
    //     data.phone=13700001111;
    //     data.email='136@163.com';
    //     data.role=['admin'];
    //     return this.user.save(data)
    // }

    // delUser(id:number){
    //     return this.user.delete(id);
    // }

    // updataUser(id:number){
    //     let data = new User()
    //     data.name='common';
    // }

    public async findOneByPhone(phone: string){
        return await this.user.findOneBy({phone})
    }

    public async getUser(msg: any){
        const query: string = msg.query
        const pagenum: number = msg.pagenum
        const pagesize: number = msg.pagesize
        let thelist = []
        let total
        
        if(query == ''){
            let allOfUser = await this.user
            //选择哪张表
            .createQueryBuilder("User")
            .select( "User.id" ) //同sql语句，不过每个最多选两个多的要用adSelect()
            .addSelect( 'User.name' )
            .addSelect( 'User.phone' )
            .addSelect( 'User.email' )
            .addSelect( 'User.role' )
            .addSelect( 'User.readtimes' )
            // .addSelect('role' )
            //同where的用法
            // .where("user.id = :id", { id: 1 })
            .getMany();

        total = allOfUser.length
        let startNumber: number = (pagenum-1)*pagesize
        let endNumber: number = pagenum*pagesize < total ? pagenum*pagesize : total
        for (let i = startNumber; i < endNumber; i++){
            thelist.push(allOfUser[i])
            } 
        }
        else{
            let findUser = await this.user.createQueryBuilder("User")
            .select( "User.id" ) //同sql语句，不过每个最多选两个多的要用adSelect()
            .addSelect( 'User.name' )
            .addSelect( 'User.phone' )
            .addSelect( 'User.email' )
            .addSelect( 'User.role' )
            .addSelect( 'User.readtimes' )
            .where("User.name = :name", { name: query })
            .orWhere("User.phone = :phone", { phone: query }) //或者用另一个where查询
            .getOne();

            thelist.push(findUser)
            total = 1;
        }
        return {
            code: 0,
            msg: {
                data: thelist,
                total: total
            }
        }
    }

    public async editUser( user: User , id: number){
        return await this.user
        .createQueryBuilder("User")
        .where("User.id = :id", {id: id})
        .getOne()
        .then( async (res: User) => {
            return await this.user.createQueryBuilder('User')
            .update(User)
            .set(user)
            .where("id = :id", { id: user.id })
            .execute()
            .then(() =>{
                return this.response = {
                    code: 0,
                    msg: "用户修改成功",
                }
            })
        })
    }

    public async delUser( id: number ){        
            return await this.user.createQueryBuilder('User')
            .delete()
            .from(User)
            .where("id = :id", { id: id })
            .execute()
            .then(() =>{
                return this.response = {
                    code: 0,
                    msg: "用户删除成功",
                }
            })        
    }

    public async addReadTime( id: number){
        return await this.user.createQueryBuilder('User')
        .update(User)
        .set({
            readtimes: () => "'readtimes' + 1"
        })
        .where("id = :id", {id: id})
        .execute()
        .then(() =>{
            return this.response = {
                code: 0,
                msg: "添加成功",
            }
        })
    }

    public async lend(id: number){
        return await this.user.createQueryBuilder('User')
        .update(User)
        .set({
            state: () => "reading",
            lendnumber: () => "'lendnumber' + 1"
        })
        .where("id = :id", {id: id})
        .execute()
    }

    public async return(id: number){
        let lendnum: any = this.checknumber(id);
        if(lendnum.lendnumber == 1){
            return await this.user.createQueryBuilder('User')
            .update(User)
            .set({
                state: () => "free",
                lendnumber: () => "'lendnumber' - 1"
            })
            .where("id = :id", {id: id})
            .execute()
        } else {
            return await this.user.createQueryBuilder('User')
            .update(User)
            .set({
                lendnumber: () => "'lendnumber' - 1"
            })
            .where("id = :id", {id: id})
            .execute()
        }
    }

    public async checknumber(id: number){
        return await this.user.createQueryBuilder('User')
        .select("User.lendnumber")
        .where("id = :id", { id: id })
        .getOne()
    }

    public async findUser(id: number){
        return await this.user.findOneBy({id})
    }
}
