import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicamentoService } from '../../../services/medicamento/medicamento.service';
import { EntradaMedicamentoService } from '../../../services/medicamento/entrada-medicamento.service';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';
import { EntradaMedicamento } from '../../../models/EntradaMedicamento';
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import { Acolhido } from '../../../models/Acolhido';
import { Medicamento } from '../../../models/Medicamento';
import { Funcionario } from '../../../models/Funcionario';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-medicamento-estoque',
  imports: [CommonModule, FormsModule, RouterModule, Header, Sidebar],
  templateUrl: './medicamento-estoque.html',
  styleUrl: './medicamento-estoque.css',
})
export class MedicamentoEstoque implements OnInit {
  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  private route = inject(ActivatedRoute);
  private medicamentoService = inject(MedicamentoService);
  private entradaService = inject(EntradaMedicamentoService);
  private funcionarioService = inject(FuncionarioService);

  acolhidoSelecionadoId: number | null = null;

  medicamento: Medicamento = {} as Medicamento;
  medicamentoId!: number;
  entradas: EntradaMedicamento[] = [];
  acolhidos: Acolhido[] = [];
  funcionarios: Funcionario[] = [];

  totalEntradas = 0;
  totalSaidas = 0;

  get estoqueAtual(): number {
    return this.totalEntradas - this.totalSaidas;
  }

  //EDITAR ISSO AQUI
  novaEntrada: EntradaMedicamento = {
    id: 1,
    quantidade: 0,
    dataEntrada: '',
    origem: '',
    responsavel: '',
    dataValidade: '',
    medicamento: { id: 0 },
  };

  alertaEstoque = false;

  ngOnInit(): void {
    this.medicamentoId = Number(this.route.snapshot.paramMap.get('id'));

    this.carregarMedicamento();
    this.carregarResponsavel();
  }

  carregarMedicamento(): void {
    this.medicamentoService.buscarPorId(this.medicamentoId).subscribe({
      next: (m) => {
        this.medicamento = m;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar medicamento', err),
    });
  }

  carregarResponsavel(): void {
    this.funcionarioService.selecionar().subscribe({
      next: (lista) => {
        this.funcionarios = lista;
      },
      error: (err) => console.error('Erro ao carregar funcionarios', err),
    });
  }

  salvarEntrada(): void {
    this.novaEntrada.medicamento = { id: this.medicamentoId };

    const operacao = this.entradaService.cadastrar(this.novaEntrada);

    operacao.subscribe({
      next: () => {
        this.limparFormEntrada();
        this.toastr.success('Entrada cadastrada!');
      },
      error: (err) => console.error('Erro ao salvar entrada', err),
    });
  }

  limparFormEntrada(): void {
    this.novaEntrada = {
      id: 1,
      quantidade: 0,
      dataEntrada: '',
      origem: '',
      responsavel: '',
      dataValidade: '',
      medicamento: { id: this.medicamentoId },
    };
  }
}
