import { Injectable } from '@nestjs/common';
//引入数据库
import { Admin, Repository } from 'typeorm';
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
        console.log(msg)
        return {
            // if query == '':
            //     cursor.execute("select * from users")
            // else:
            //     cursor.execute("select * from users where username = '" + query + "'")
            // users = cursor.fetchall()
            // cursor.execute("select count(*) from users ")
            // total = cursor.fetchall()[0][0]
            // showusers = users[(pagenum-1)*pagesize:pagenum*pagesize]
            // thelist = []
            // for i in showusers:
            //     thelist.append({'ID':i[0],'username':i[1],'password':i[2],'email':i[3],'rolename':i[4],'mobile':i[5]})
                
            // return dumps({
            //     'data':{
            //     'total':total,
            //     'pagenum':pagenum,
            //     'users':thelist,
            //     },
            //     'meta' : {
            //         'msg' : '传输成功',
            //         'status' : 200
            //     },
            // })
        }
    }
}
