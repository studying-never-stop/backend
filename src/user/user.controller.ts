import { Controller, Post, Get, Request,Query,Body, Param,Header, SetMetadata, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
//API功能标注(swagger)
@ApiTags("用户模块")
// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
    constructor(private userService:UserService){}

    // @Get('/add')
    // addUser():any{
    //     return this.userService.addUser()
    // }

    // //param参数
    // @Get('/delete/:id')
    // delUser(@Param() params):any{
    //     let id:number = parseInt(params.id)
    //     return this.userService.delUser(id)
    // }

    // @Get('/update/:id')
    // updateUser(@Param() params):any{
    //     let id:number = parseInt(params.id)
    //     return this.userService.updataUser(id)
    // }

    // //注册(原位置)
    // @Post('regist')
    // //api功能标注
    // @ApiOperation({
    //     summary:"用户进行注册"
    // })
    // async registUser(@Body() userDto: User){
    //     return await this.userService.regist(userDto,userDto.phone)
    // }

    @Get("hello")
    //传统方法(设置元数据的装饰器)
    // @SetMetadata( 'role', ['admin'])
    // @Role('admin')
    hello(){
        return this.userService.hello()
    }
}



