import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';

@Component({
  selector: 'app-recuperar-senha',
  imports: [FormsModule, RouterLink],
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css',
})
export class RecuperarSenha {
  email = '';
  senhaTemporaria = '';
  carregando = false;

  constructor(
    private servico: FuncionarioService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  recuperar() {
    if (!this.email.trim()) {
      this.toastr.warning('Informe seu e-mail.');
      return;
    }

    this.carregando = true;
    this.senhaTemporaria = '';

    this.servico.recuperarSenha(this.email).subscribe({
      next: (resposta) => {
        this.carregando = false;

        this.senhaTemporaria = resposta.senhaTemporaria;
        this.cdr.detectChanges();

        //console.log('Senha temporária:', resposta.senhaTemporaria);
      },

      error: (err) => {
        this.carregando = false;

        if (err.status === 404) {
          this.toastr.error('Nenhum funcionário encontrado com esse e-mail.');
        } else {
          this.toastr.error('Erro ao recuperar senha.');
        }
      },
    });
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }
}
