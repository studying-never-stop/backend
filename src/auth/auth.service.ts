import { Injectable,UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { encript } from 'src/utils/Encription';
import { IResponse } from 'src/utils/response';
import { JwtService } from '@nestjs/jwt';
//引入数据库
import { Admin, Repository } from 'typeorm';
//注入数据库
import { InjectRepository } from '@nestjs/typeorm';


//用户验证
@Injectable()
export class AuthService {
    private response: IResponse;
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        @InjectRepository(User) private readonly user: Repository<User>,
    ){}

    //用户识别
    private async validate(user: User){
        const phone: string = user.phone;
        const password: string = user.password;
        return await this.userService.findOneByPhone(phone)
        .then(res =>{
            if(res == null){
                this.response = {
                    code:3,
                    msg:"用户尚未注册"
                }
                throw this.response
            }
            return res
        })
        .then((dbuser: User) =>{
            const pass = encript(password, dbuser.salt)
            if(pass == dbuser.password){
                return this.response = {
                    code: 0, 
                    msg: { userid: dbuser.id }
                } 
            } else {
                this.response = { 
                    code: 4, 
                    msg: "用户名密码错误"
                }
                throw this.response;
            }
        })
        .catch(err =>{
            return err
        })
    }

    //登录
    public async login(user: User){
        return await this.validate(user)
        .then(async (res: IResponse) => { 
            if (res.code != 0) {
                this.response = res;
                throw this.response;
            }
            const userid = res.msg.userid
            this.response = {
                code: 0,
                msg: {
                    token: await this.createToken(user) ,
                    userid 
                }
            }
            return this.response
        })
        .catch(err => {
            return err
        })
    }

    //注册方法
    public async regist(user: User, phone: string) {
        return this.user.findOneBy({ phone })
        .then(res =>{
            if(res != null){
                this.response = {
                    code: 1,
                    msg: "当前手机号已注册" 
                }
                throw this.response
            }
        })
        .then(async () => {
            try {
                await this.user.save(user)
                this.response = {
                    code: 0,
                    msg: "注册成功"
                }
                return this.response
            } catch (error) {
                this.response = {
                    code: 2,
                    msg: "用户注册失败，请联系相关负责人。错误详情" + error
                }
                throw this.response;
            }
        })
        .catch(err =>{
            console.warn(`发生问题——`,err);
            return err
        })
    }

    //目前用的创建token方法
    private async createToken( user: User){
        return await this.jwtService.sign(user)
    }

    /**
     * 修改密码(或找回密码)
     */
    public async alter( user: User ){
        return await this.userService.findOneByPhone(user.phone)
        .then( async (res: User) => {
            return await this.user.createQueryBuilder('User')
            .update(User)
            .set(user)
            .where("phone = :phone", { phone: user.phone })
            .execute()
            .then(() =>{
                return this.response = {
                    code: 0,
                    msg: "用户修改成功",
                }
            })
        })
    }

    // async signIn(username, pass) {
    //     const user = await this.userService.findOneByPhone(username);
    //     if (user?.password !== pass) {
    //       throw new UnauthorizedException();
    //     }
    //     const payload = { sub: user.id, username: user.name};
    //     return {
    //       access_token: await this.jwtService.signAsync(payload),
    //     }
    // }    
}

