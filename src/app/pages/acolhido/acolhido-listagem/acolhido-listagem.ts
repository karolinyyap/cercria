import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Acolhido } from '../../../models/Acolhido';
import { NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AcolhidoService } from '../../../services/acolhido/acolhido.service';

@Component({
  selector: 'app-acolhido-listagem',
  imports: [RouterLink, FormsModule, Header, CommonModule, NgxMaskPipe, Sidebar],
  templateUrl: './acolhido-listagem.html',
  styleUrl: './acolhido-listagem.css',
})
export class AcolhidoListagem {
  acolhidos = signal<Acolhido[]>([]);

  private servico = inject(AcolhidoService);

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.servico.selecionar().subscribe({
      next: (retorno) => {
        this.acolhidos.set(retorno);
      },
      error: (err) => {
        console.error('erro:', err);
      },
    });
  }

  //Configuração do card
  acolhidoSelecionado = signal<Acolhido | null>(null);

  abrirDetalhes(acolhido: Acolhido) {
    this.acolhidoSelecionado.set(acolhido);
  }

  fecharDetalhes() {
    this.acolhidoSelecionado.set(null);
  }
  //Filtro de status
  filtroStatus: string = 'todos';

  filtrarAcolhidos() {
    if (this.filtroStatus === 'ativos') {
      return this.acolhidos().filter((a) => a.ativo);
    }

    if (this.filtroStatus === 'inativos') {
      return this.acolhidos().filter((a) => !a.ativo);
    }

    return this.acolhidos();
  }
}
