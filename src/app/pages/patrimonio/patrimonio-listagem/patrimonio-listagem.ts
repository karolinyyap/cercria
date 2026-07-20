import { Component, OnInit, signal, inject } from '@angular/core';
import { Patrimonio } from '../../../models/Patrimonio';
import { PatrimonioService } from '../../../services/patrimonio/patrimonio.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Header } from '../../../components/header/header';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patrimonio-listagem',
  imports: [Sidebar, Header, RouterLink, FormsModule, CommonModule],
  templateUrl: './patrimonio-listagem.html',
  styleUrl: './patrimonio-listagem.css',
})
export class PatrimonioListagem implements OnInit {
  // Signal para armazenar lista vinda dos serviços
  patrimonios = signal<Patrimonio[]>([]);

  // Injeção do serviço responsável pelas operações com patrimônio
  private servico = inject(PatrimonioService);
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.servico.selecionar().subscribe({
      next: (lista) => {
        this.patrimonios.set(lista);
        this.patrimoniosFiltro.set(lista);
        this.patrimoniosFiltrados.set(lista);
      },
      error: (err) => {
        console.error('erro:', err);
      },
    });
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esse medicamento será excluído!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servico.remover(id).subscribe({
          next: () => {
            this.patrimonios.update((lista) => lista.filter((p) => p.id !== id));
            this.toastr.success('Patrimônio excluído com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao excluir:', err);
          },
        });
      }
    });
  }

  //Configuração do card
  patrimoniosSelecionado = signal<Patrimonio | null>(null);

  abrirDetalhes(patrimonio: Patrimonio) {
    this.patrimoniosSelecionado.set(patrimonio);
  }

  fecharDetalhes() {
    this.patrimoniosSelecionado.set(null);
  }

  filtroNome = '';
  filtroEspecificacao = '';

  patrimoniosFiltro = signal<Patrimonio[]>([]);
  patrimoniosFiltrados = signal<Patrimonio[]>([]);

  //Filtros
  filtrar() {
    const lista = this.patrimoniosFiltro();

    const filtrados = lista.filter((p) => {
      const tombamentoOk =
        this.filtroNome === '' || p.tombamento.toString().includes(this.filtroNome);

      const especificacaoOk = p.especificacao
        ?.toLowerCase()
        .includes(this.filtroEspecificacao.toLowerCase());

      return tombamentoOk && especificacaoOk;
    });

    this.patrimoniosFiltrados.set(filtrados);
  }
}
