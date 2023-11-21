import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(
        private menuService: MenuService,
    ){}
    
    @Get('menu')
    getMenu(){
        return this.menuService.getMenu()
    }
}
