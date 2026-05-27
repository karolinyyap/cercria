import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcolhidoService } from '../../../services/acolhido/acolhido.service';
import { Acolhido } from '../../../models/Acolhido';
import { MedicamentoService } from '../../../services/medicamento/medicamento.service';
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { ControleMedicamentoService } from '../../../services/medicamento/medicamento-controle.service';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-controle-medicamento',
  imports: [CommonModule, FormsModule, Header, Sidebar, RouterLink],
  templateUrl: './medicamento-controle.html',
  styleUrl: './medicamento-controle.css',
})
export class MedicamentoControle implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  abaAtiva: 'programado' | 'esporadico' = 'programado';
  usuarioLogado: string = '';

  funcionarios: any[] = [];
  medicamentos: { id: number; nome: string }[] = [];

  private route = inject(ActivatedRoute);
  private acolhidoService = inject(AcolhidoService);
  private medicamentoService = inject(MedicamentoService);
  private funcionarioService = inject(FuncionarioService);
  private controleService = inject(ControleMedicamentoService);

  acolhido?: Acolhido;
  acolhidoId!: number;

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage);
      this.usuarioLogado = usuario.nome;
    }

    this.acolhidoId = Number(this.route.snapshot.paramMap.get('id'));

    this.novaProgramacao.acolhidoId = this.acolhidoId;
    this.novaProgramacao.responsavel = this.usuarioLogado;

    this.carregarAcolhido();
    this.carregarMedicamentos();
    this.carregarFuncionarios();
  }

  novaProgramacao = {
    acolhidoId: null as number | null,
    medicamentoId: null as number | null,
    dose: 1,

    intervalo: null as number | null,
    iniciandoEm: '',
    vezesDia: null as number | null,

    horarioFixo: '',

    diasSemana: [] as string[],
    dataInicio: '',
    dataFim: '',
    usoContinuo: false,
    observacao: '',
    responsavel: this.usuarioLogado,
  };

  novaSaidaEsporadica = {
    acolhidoId: null as number | null,
    medicamentoId: null as number | null,
    dataSaida: '',
    horario: '',
    motivo: '',
    dose: 1,
    responsavel: this.usuarioLogado,
  };

  diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  trocarAba(aba: 'programado' | 'esporadico'): void {
    this.abaAtiva = aba;
  }

  toggleUsoContinuo(): void {
    this.novaProgramacao.usoContinuo = !this.novaProgramacao.usoContinuo;

    if (this.novaProgramacao.usoContinuo) {
      this.novaProgramacao.dataFim = '';
    }
  }

  toggleDia(dia: string): void {
    const index = this.novaProgramacao.diasSemana.indexOf(dia);

    if (index >= 0) {
      this.novaProgramacao.diasSemana.splice(index, 1);
    } else {
      this.novaProgramacao.diasSemana.push(dia);
    }
  }

  salvarProgramacao(): void {
    const funcionario = this.funcionarios.find((f) => f.nome === this.usuarioLogado);

    const { medicamentoId, responsavel, acolhidoId, ...resto } = this.novaProgramacao;

    const dados = {
      ...resto,
      vezesAoDia: this.novaProgramacao.vezesDia,
      iniciandoEm: this.novaProgramacao.iniciandoEm,
      diasSemana: this.novaProgramacao.diasSemana.join(','),
      acolhido: {
        id: this.acolhidoId,
      },
      medicamento: {
        id: medicamentoId,
      },
      funcionarioCadastro: {
        id: funcionario?.id,
      },
      dataFim: resto.usoContinuo ? null : resto.dataFim,
    };

    this.controleService.cadastrar(dados).subscribe({
      next: () => {
        this.toastr.success('Medicamento programado com sucesso!');
        this.limparProgramacao();
      },
      error: (err) => console.error('Detalhe do erro:', err.error),
    });
  }

  salvarSaidaEsporadica(): void {
    const funcionario = this.funcionarios.find(
      (f) => f.nome === this.novaSaidaEsporadica.responsavel,
    );

    const dados = {
      data: this.novaSaidaEsporadica.dataSaida,
      horario: this.novaSaidaEsporadica.horario,
      dose: this.novaSaidaEsporadica.dose,
      motivo: this.novaSaidaEsporadica.motivo,
      status: 'DADO',
      acolhido: {
        id: this.acolhidoId,
      },
      medicamento: {
        id: this.novaSaidaEsporadica.medicamentoId,
      },
      funcionarioResponsavel: {
        id: funcionario?.id,
      },
    };

    //console.log('ESPORADICO →', dados);

    this.controleService.salvarSaidaEsporadica(dados).subscribe({
      next: () => {
        this.toastr.success('Saída registrada!');
        setTimeout(() => {
          this.limparSaidaEsporadica();
        });
      },

      error: (err) => {
        console.log(err);
        this.toastr.error('Erro ao registrar saída');
      },
    });
  }

  limparProgramacao(): void {
    this.novaProgramacao = {
      acolhidoId: this.acolhidoId,
      medicamentoId: null,
      dose: 1,
      intervalo: null,
      iniciandoEm: '',
      vezesDia: null,
      horarioFixo: '',
      diasSemana: [],
      dataInicio: '',
      dataFim: '',
      usoContinuo: false,
      observacao: '',
      responsavel: this.usuarioLogado,
    };
  }

  limparSaidaEsporadica(): void {
    this.novaSaidaEsporadica = {
      acolhidoId: this.acolhidoId,
      medicamentoId: null,
      dataSaida: '',
      horario: '',
      motivo: '',
      dose: 1,
      responsavel: this.usuarioLogado,
    };

    this.cdr.detectChanges();
  }

  carregarAcolhido(): void {
    this.acolhidoService.buscarPorId(this.acolhidoId).subscribe({
      next: (a) => {
        this.acolhido = a;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Erro ao carregar acolhido', err);
      },
    });
  }

  carregarMedicamentos(): void {
    this.medicamentoService.selecionar().subscribe({
      next: (lista) => {
        this.medicamentos = lista;
      },

      error: (err) => {
        console.error('Erro ao carregar medicamentos', err);
      },
    });
  }

  carregarFuncionarios(): void {
    this.funcionarioService.selecionar().subscribe({
      next: (lista) => {
        this.funcionarios = lista;

        this.novaSaidaEsporadica.responsavel = this.usuarioLogado;
      },

      error: (err) => {
        console.error('Erro ao carregar funcionários', err);
      },
    });
  }
}
