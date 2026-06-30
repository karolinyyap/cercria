export class SaidaEsporadica {
  medicamentoId?: number;
  dataSaida: string = '';
  horario: string = '';
  dose: number = 1;
  motivo: string = '';

  responsavel?: {
    id: number;
  };
}
