import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entity/user.entity';
//引入userservice
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        //声明userservice(创建)
        private userService:UserService
    ){}

    @Post('login')
    public async userLogin(@Body() userDto: User){
        return await this.authService.login(userDto);
    }

    @Post('regist')
    async registUser(@Body() userDto: User){
        return await this.authService.regist(userDto,userDto.phone)
    }

    @Post('alter')
    async alterUser(@Body() userDto: User){
        return await this.authService.alter(userDto)
    }
}
