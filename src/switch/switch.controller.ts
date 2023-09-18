import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Switch } from 'src/entity/switch.entity';
import { SwitchService } from './switch.service'; 


@Controller('switch')
export class SwitchController {
    constructor(private switchService: SwitchService){}

    @Post('lendBook')
    public async lendBook(@Body() data: any){
        return this.switchService.lendBook(data)
    }

    @Post('returnBook')
    public async returnBook(@Body() data: any){
        return this.switchService.returnBook(data)
    }
}
