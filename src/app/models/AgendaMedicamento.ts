export class AgendaMedicamento {
  id?: number;
  data: string = '';
  horario: string = '';
  dose: number = 0;
  motivo?: string;
  status: string = '';
  // PENDENTE | TOMOU | NAO_TOMOU | CANCELADO
  motivoNaoTomou?: string;
  dataBaixa?: string;
  observacao?: string;
  acolhido?: {
    id: number;
  };

  medicamento?: {
    id: number;
  };

  controleUso?: {
    id: number;
  };

  estoqueMedicamento?: {
    id: number;
  };

  funcionarioResponsavel?: {
    id: number;
  };
}
