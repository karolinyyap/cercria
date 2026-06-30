export class ControleUsoMedicamento {
  dose: number = 1;
  intervalo?: number;
  iniciandoEm?: string;
  vezesAoDia?: number;
  horarioFixo?: string;
  diasSemana: string[] = [];
  dataInicio: string = '';
  dataFim?: string;
  usoContinuo: boolean = false;
  observacao?: string;

  medicamento: { id: number } = {
    id: 0,
  };

  acolhido: { id: number } = {
    id: 0,
  };

  funcionarioCadastro: { id: number } = {
    id: 0,
  };
}
