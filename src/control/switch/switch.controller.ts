import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Switch } from 'src/entity/switch.entity';
import { SwitchService } from './switch.service';
import { Role } from '../../tools/role/role.decorator'; // 自定义的角色装饰器
import { AuthGuard } from '../../guards/auth.guard'; // 自定义的权限守卫


@Controller('switch')
@UseGuards(AuthGuard)
export class SwitchController {
    constructor(private switchService: SwitchService) { }

    @Post('addRecord')
    @Role("admin")
    public async lendBook(@Body() data: any) {
        if (data.acttype == 'lend') {
            return this.switchService.lendBook(data)
        } else if (data.acttype == 'return') {
            return this.switchService.returnBook(data)
        } else {
            return this.switchService.buyBook(data)
        }

    }

    @Post('getRecord')
    @Role("admin")
    public async getRecord(@Body() msg: any) {
        return this.switchService.getInformation(msg)
    }

    @Post('getData')
    @Role("admin")
    public async getData(@Body() request: any) {
        return await this.switchService.getData(request)
    }
}
