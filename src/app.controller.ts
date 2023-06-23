import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @Get('health_check')
  @ApiOperation({
    summary: 'Check if the app is working',
  })
  @ApiResponse({
    status: 200,
    description: 'All is good',
  })
  health_check() {
    return this.service.health_check();
  }
}
