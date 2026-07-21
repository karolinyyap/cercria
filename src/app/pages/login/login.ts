import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  senha: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  //Método para autenticar a entrada
  entrar() {
    this.http
      .post<any>(`${environment.apiUrl}/funcionario/login`, {
        email: this.email,
        senha: this.senha,
      })
      .subscribe({
        next: (usuario) => {
          console.log(usuario);

          sessionStorage.setItem('usuario', JSON.stringify(usuario));
          console.log(usuario);

          this.router.navigate(['/home']);
        },

        error: (err) => {
          console.log(err);

          if (err.status === 401) {
            alert('Email ou senha inválidos');
          } else {
            alert('Erro ao conectar com servidor');
          }
        },
      });
  }
}
