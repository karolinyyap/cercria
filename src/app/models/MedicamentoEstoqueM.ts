import { Funcionario } from './Funcionario';

export class MedicamentoEstoqueM {
  id?: number;
  quantidade: number = 0;
  quantidade_atual: number = 0;
  dataValidade: string = '';
  origem: string = '';
  medicamento?: {
    id: number;
  };
  responsavel?: Funcionario;
  dataEntrada: string = '';
}
