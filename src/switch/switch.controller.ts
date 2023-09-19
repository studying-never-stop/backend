import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Switch } from 'src/entity/switch.entity';
import { SwitchService } from './switch.service'; 


@Controller('switch')
export class SwitchController {
    constructor(private switchService: SwitchService){}

    @Post('addRecord')
    public async lendBook(@Body() data: any){
        if (data.acttype == 'lend'){
            return this.switchService.lendBook(data)
        } else if(data.acttype == 'return') {
            return this.switchService.returnBook(data)
        } else{
            return this.switchService.buyBook(data)
        }
        
    }

    // @Post('returnBook')
    // public async returnBook(@Body() data: any){
    //     return this.switchService.returnBook(data)
    // }

    @Post('getRecord')
    public async getRecord(@Body() msg: any){
        return this.switchService.getInformation(msg)
    }
}
