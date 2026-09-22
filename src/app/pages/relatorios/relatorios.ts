import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';

import { RelatorioService } from '../../services/relatorio/relatorio.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [FormsModule, Header, Sidebar],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios {
  private relatorioService = inject(RelatorioService);

  tipoSelecionado: string = '';

  gerando: boolean = false;

  relatorios = [
    {
      id: 'acolhidos',
      nome: 'Relatório de Acolhidos',
    },
    {
      id: 'funcionarios',
      nome: 'Relatório de Funcionários',
    },
    {
      id: 'medicamento',
      nome: 'Relatório de Medicamentos',
    },
    {
      id: 'produto',
      nome: 'Relatório de Produtos',
    },
    /*{
      id: 'estoqueMedicamentos',
      nome: 'Relatório de Estoque de Medicamentos',
    },
    {
      id: 'entradas',
      nome: 'Relatório de Entradas de Produtos',
    },
    {
      id: 'saidas',
      nome: 'Relatório de Saídas de Produtos',
    },
    {
      id: 'usoMedicamentos',
      nome: 'Relatório de Uso de Medicamentos',
    },*/
    {
      id: 'patrimonio',
      nome: 'Relatório de Patrimônio',
    },
    {
      id: 'evento',
      nome: 'Relatório de Eventos',
    },
  ];

  gerarRelatorio(): void {
    if (!this.tipoSelecionado) {
      return;
    }

    this.gerando = true;

    const dados = {
      tipo: this.tipoSelecionado,
    };

    this.relatorioService.gerarRelatorio(dados).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio-${this.tipoSelecionado}.pdf`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.gerando = false;
      },

      error: (erro) => {
        console.error('Erro ao gerar relatório:', erro);

        this.gerando = false;

        alert('Não foi possível gerar o relatório.');
      },
    });
  }

  limpar(): void {
    this.tipoSelecionado = '';
  }
}
