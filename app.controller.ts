import { Controller, Get, Query } from '@nestjs/common';
import { AppService, WaterConsumption } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Endpoint para obter o histórico de consumo de água
  @Get('history')
  getConsumptionHistory(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): WaterConsumption[] {
    return this.appService.getConsumptionHistory(userId, startDate, endDate);
  }

  // Endpoint para verificar o alerta de alto consumo de água
  @Get('alert')
  checkForHighConsumption(@Query('userId') userId: string): string {
    return this.appService.checkForHighConsumption(userId);
  }
}


