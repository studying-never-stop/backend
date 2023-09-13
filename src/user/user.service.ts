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

    public async hello(){
        // return await this.redisService.set("management", "helloWord")
        return {
            code: 0,
            msg: "hello world!"
        }
    }
}
