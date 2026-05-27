export class ControleUsoMedicamento {
  id?: number;
  dose: number = 0;
  intervalo?: number;
  iniciandoEm?: string;
  vezesAoDia?: number;
  horarioFixo?: string;
  diasSemana: string[] = [];
  dataInicio: string = '';
  dataFim?: string;
  usoContinuo: boolean = false;
  observacao?: string;
  ativo: boolean = true;

  medicamento?: {
    id: number;
  };

  acolhido?: {
    id: number;
  };

  funcionarioCadastro?: {
    id: number;
  };
}
