import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            // Mock do método getConsumptionHistory
            getConsumptionHistory: jest.fn().mockReturnValue([]),
            checkForHighConsumption: jest.fn().mockReturnValue('No alert'),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getConsumptionHistory', () => {
    it('should return water consumption history', () => {
      const userId = 'user123';
      const startDate = '2023-01-01';
      const endDate = '2023-12-31';

      // Verifica se o método do controlador chama o serviço corretamente e retorna o valor mockado
      expect(appController.getConsumptionHistory(userId, startDate, endDate)).toEqual([]);
    });
  });

  describe('checkForHighConsumption', () => {
    it('should return high consumption alert', () => {
      const userId = 'user123';

      // Verifica o retorno do método de alerta
      expect(appController.checkForHighConsumption(userId)).toBe('No alert');
    });
  });
});

