import { Funcionario } from './Funcionario';

export interface MedicamentoEstoqueM {
  id?: number;
  quantidade: number;
  quantidade_atual: number;
  dataValidade: string;
  origem: string;
  medicamento?: {
    id: number;
  };
  responsavel?: Funcionario;
  dataEntrada: string;
}
