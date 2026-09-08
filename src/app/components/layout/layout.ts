import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { permissoes } from '../../guards/permissoes';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private servico = inject(FuncionarioService);

  temPermissao(permissao: string): boolean {
    const cargo = this.servico.getCargo();

    if (!cargo) {
      return false;
    }

    const [modulo, acao] = permissao.split(':');

    const permissoesModulo = permissoes[modulo as keyof typeof permissoes];

    if (!permissoesModulo) {
      return false;
    }

    const cargosPermitidos = permissoesModulo[acao as keyof typeof permissoesModulo];

    if (!cargosPermitidos) {
      return false;
    }

    return cargosPermitidos.includes(cargo);
  }

  abrirPagina(rota: string, permissao: string): void {
    if (this.temPermissao(permissao)) {
      this.router.navigate([rota]);
      return;
    }

    this.toastr.error('Você não possui permissão para acessar esta página.', 'Acesso negado');
  }
}
