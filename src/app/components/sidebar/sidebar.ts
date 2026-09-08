import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { permissoes } from '../../guards/permissoes';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  sidebarService = inject(SidebarService);
  servico = inject(FuncionarioService);

  private router = inject(Router);
  private toastr = inject(ToastrService);

  menuAberto: string | null = null;

  toggleMenu(menu: string) {
    this.menuAberto = this.menuAberto === menu ? null : menu;
  }

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
