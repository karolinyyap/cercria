export class SaidaProduto {
  id?: number;
  quantidade: number = 0;
  dataSaida: string = '';
  motivo: string = '';

  produtoId: number | null = null;
  funcionarioId: number | null = null;
}
