import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicamentoService } from '../../../services/medicamento/medicamento.service';
import { MedicamentoEstoqueService } from '../../../services/medicamento/estoque-medicamento.service';
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import { Funcionario } from '../../../models/Funcionario';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';
import { MedicamentoEstoqueM } from '../../../models/MedicamentoEstoqueM';
import { Medicamento } from '../../../models/Medicamento';
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
  private entradaService = inject(MedicamentoEstoqueService);
  private funcionarioService = inject(FuncionarioService);

  acolhidoSelecionadoId: number | null = null;

  medicamento: Medicamento = {} as Medicamento;
  medicamentoId!: number;
  entradas: MedicamentoEstoqueM[] = [];
  responsaveis: Funcionario[] = [];

  estoqueAtual = 0;

  novaEntrada: MedicamentoEstoqueM = {
    quantidade: 0,
    quantidade_atual: 0,
    origem: '',
    responsavel: undefined,
    dataEntrada: '',
    dataValidade: '',
    medicamento: { id: 0 },
  };

  alertaEstoque = false;

  ngOnInit(): void {
    this.medicamentoId = Number(this.route.snapshot.paramMap.get('id'));

    // data atual
    this.novaEntrada.dataEntrada = new Date().toISOString().split('T')[0];

    this.carregarMedicamento();
    this.carregarResponsaveis();
    this.carregarEstoque();
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

  carregarResponsaveis(): void {
    this.funcionarioService.selecionar().subscribe({
      next: (lista) => {
        this.responsaveis = lista;

        const usuario = sessionStorage.getItem('usuario');

        if (usuario) {
          const usuarioLogado = JSON.parse(usuario);

          this.novaEntrada.responsavel = this.responsaveis.find((r) => r.id === usuarioLogado.id);
        }
      },
    });
  }

  salvarEntrada(): void {
    this.novaEntrada.medicamento!.id = this.medicamentoId;

    this.entradaService.cadastrar(this.novaEntrada).subscribe({
      next: () => {
        this.toastr.success('Entrada cadastrada!');

        this.carregarEstoque();

        setTimeout(() => {
          this.limparFormEntrada();
        });
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  limparFormEntrada(): void {
    this.novaEntrada = {
      quantidade: 0,
      quantidade_atual: 0,
      origem: '',
      responsavel: undefined,
      dataEntrada: new Date().toISOString().split('T')[0],
      dataValidade: '',
      medicamento: {
        id: this.medicamentoId,
      },
    };
  }

  carregarEstoque(): void {
    this.entradaService.listarPorMedicamento(this.medicamentoId).subscribe({
      next: (lista: MedicamentoEstoqueM[]) => {
        this.entradas = lista;

        if (lista.length > 0) {
          this.estoqueAtual = lista[lista.length - 1].quantidade_atual;
        } else {
          this.estoqueAtual = 0;
        }

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
