import { Component, OnInit, signal, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Produto } from '../../../models/Produto';
import { ProdutoService } from '../../../services/produto/produto.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ControleProdutoService } from '../../../services/produto/controle-produto.service';

@Component({
  selector: 'app-produto-listagem',
  imports: [RouterLink, FormsModule, Header, CommonModule, Sidebar],
  templateUrl: './produto-listagem.html',
  styleUrl: './produto-listagem.css',
})
export class ProdutoListagem implements OnInit {
  produtos = signal<Produto[]>([]);

  private servico = inject(ProdutoService);
  private controleService = inject(ControleProdutoService);
  constructor(
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}
  quantidades: { [produtoId: number]: number } = {};

  ngOnInit(): void {
    this.servico.selecionar().subscribe({
      next: (lista) => {
        this.produtos.set(lista);
        this.produtosFiltro.set(lista);
        this.produtosFiltrados.set(lista);

        lista.forEach((produto) => {
          this.controleService.listarPorProduto(produto.id).subscribe({
            next: (entradas) => {
              entradas.forEach((e) => console.log(e.quantidadeAtual));
              this.quantidades[produto.id] = entradas.reduce(
                (total, e) => total + (e.quantidadeAtual ?? 0),
                0,
              );
              this.cdr.detectChanges();
            },
          });
        });
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
            this.produtos.update((lista) => lista.filter((p) => p.id !== id));
            this.toastr.success('Produto excluído com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao excluir:', err);
          },
        });
      }
    });
  }

  //Configuração do card
  produtoSelecionado = signal<Produto | null>(null);

  abrirDetalhes(produto: Produto) {
    this.produtoSelecionado.set(produto);
  }

  fecharDetalhes() {
    this.produtoSelecionado.set(null);
  }

  //Filtros
  filtroNome: string = '';
  filtroCategoria: string = '';

  produtosFiltro = signal<Produto[]>([]);
  produtosFiltrados = signal<Produto[]>([]);

  filtrar() {
    const filtrados = this.produtosFiltro().filter((p) => {
      const nomeOk = p.nome.toLowerCase().includes(this.filtroNome.toLowerCase());

      const categoriaOk = !this.filtroCategoria || p.categoria === this.filtroCategoria;

      return nomeOk && categoriaOk;
    });

    this.produtosFiltrados.set(filtrados);
  }
}
