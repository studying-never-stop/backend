import { Controller, Post, Get, Request, Query, Body, Param, Header, SetMetadata, UseGuards, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/tools/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
//API功能标注(swagger)
@ApiTags("用户模块")
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth('jwt')
export class UserController {
    constructor(private userService: UserService) { }

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

    @Post("getUser")
    // @Role('admin')
    getUser(@Body() msg: any) {
        return this.userService.getUser(msg)
    }

    @Post("findUser")
    // @Role('admin')
    findUser(@Body() name: string) {
        return this.userService.getUser(name)
    }

    @Put("editUser/:id")
    editUser(@Body() user: User, @Param('id') id: number) {
        return this.userService.editUser(user, id)
    }

    @Delete("delUser/:id")
    delUser(@Param('id') id: number) {
        return this.userService.delUser(id)
    }

}



