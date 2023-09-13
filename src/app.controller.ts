import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app 总模块')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({
    summary: "测试接口"
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
