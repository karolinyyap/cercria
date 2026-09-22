export class Evento {
  id!: number;
  nome: string = '';
  data: string = '';
  hora: string = '';
  responsaveis: number[] = [];
  status: string = '';
  descricao: string = '';
  acolhidos: number[] = [];
}
