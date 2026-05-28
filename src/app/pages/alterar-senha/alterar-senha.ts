import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-alterar-senha',
  imports: [FormsModule, Header, Sidebar],
  templateUrl: './alterar-senha.html',
  styleUrl: './alterar-senha.css',
})
export class AlterarSenha {
  dados = {
    novaSenha: '',
    confirmarSenha: '',
  };

  erroSenha = '';

  constructor(
    private servico: FuncionarioService,
    private toastr: ToastrService,
  ) {}

  alterarSenha() {
    this.erroSenha = '';

    if (this.dados.novaSenha !== this.dados.confirmarSenha) {
      this.erroSenha = 'As senhas não coincidem';
      return;
    }

    if (this.dados.novaSenha.length < 6) {
      this.erroSenha = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }

    const usuarioString = sessionStorage.getItem('usuario');

    if (!usuarioString) {
      this.toastr.error('Sessão expirada');

      return;
    }

    const user = JSON.parse(usuarioString);

    const payload = {
      id: user.id,
      senha: this.dados.novaSenha,
    };

    this.servico.alterarSenha(payload).subscribe({
      next: () => {
        this.toastr.success('Senha alterada com sucesso!');
      },

      error: (err) => {
        console.log(err);

        this.toastr.error('Erro ao alterar senha');
      },
    });
  }
}
