import { Component, signal, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxMaskDirective } from 'ngx-mask';
import { Acolhido } from '../../../models/Acolhido';
import { AcolhidoService } from '../../../services/acolhido/acolhido.service';

@Component({
  selector: 'app-acolhido-cadastro',
  imports: [RouterLink, FormsModule, Header, NgxMaskDirective, Sidebar],
  templateUrl: './acolhido-cadastro.html',
  styleUrl: './acolhido-cadastro.css',
})
export class AcolhidoCadastro {
  //JSON de Acolhidos
  acolhidos: Acolhido[] = [];

  private servico = inject(AcolhidoService);

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {}

  //Objeto do tipo acolhido
  acolhido = new Acolhido();

  //Método de cadastro
  cadastrar(form: any): void {
    this.acolhido.ativo = !this.acolhido.dataSaida;

    this.servico.cadastrar(this.acolhido).subscribe((retorno) => {
      this.acolhidos.push(retorno);

      this.acolhido = new Acolhido();
      form.reset();

      this.toastr.success('Acolhido cadastrado com sucesso!');
      this.router.navigate(['/acolhido/listagem']);
    });
  }
}
