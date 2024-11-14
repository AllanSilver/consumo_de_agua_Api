import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Simulação de um banco de dados em memória para armazenar os consumos
  private waterConsumptions: WaterConsumption[] = [];

  // Método para registrar o consumo de água
  registerConsumption(userId: string, consumption: number, date: string): void {
    const newConsumption: WaterConsumption = { userId, consumption, date };
    this.waterConsumptions.push(newConsumption);
  }

  // Método para buscar o histórico de consumo em um intervalo de datas
  getConsumptionHistory(userId: string, startDate: string, endDate: string): WaterConsumption[] {
    return this.waterConsumptions.filter(
      (record) =>
        record.userId === userId &&
        new Date(record.date) >= new Date(startDate) &&
        new Date(record.date) <= new Date(endDate),
    );
  }

  // Método para verificar o consumo elevado
  checkForHighConsumption(userId: string): string {
    const userConsumptions = this.waterConsumptions.filter(
      (record) => record.userId === userId,
    );

    if (userConsumptions.length < 2) {
      return 'Dados insuficientes para gerar alertas.';
    }

    // Ordenando os consumos por data, do mais recente para o mais antigo
    userConsumptions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const currentMonthConsumption = userConsumptions[0].consumption;
    const previousMonthConsumption = userConsumptions[1].consumption;

    if (currentMonthConsumption > previousMonthConsumption) {
      return 'Alerta: Seu consumo de água aumentou em relação ao mês anterior.';
    } else {
      return 'Seu consumo de água está estável ou diminuiu em relação ao mês anterior.';
    }
  }
}

// Interface WaterConsumption
export interface WaterConsumption {
  userId: string;
  consumption: number;
  date: string;
}

