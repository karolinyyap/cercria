export class EntradaProduto {
  id?: number;
  quantidade: number = 0;
  dataEntrada: string = '';
  dataValidade: string = '';
  origem: string = '';
  observacao?: string;

  produtoId: number | null = null;
  funcionarioId: number | null = null;
}
