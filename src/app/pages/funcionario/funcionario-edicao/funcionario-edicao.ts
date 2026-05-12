import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { Funcionario } from '../../../models/Funcionario';
import { FuncionarioService } from '../../../services/funcionario/funcionario.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-funcionario-edicao',
  imports: [RouterLink, FormsModule, Header, NgxMaskDirective, Sidebar],
  templateUrl: './funcionario-edicao.html',
  styleUrl: './funcionario-edicao.css',
})
export class FuncionarioEdicao implements OnInit {
  funcionario: Funcionario = new Funcionario();

  private servico = inject(FuncionarioService);

  constructor(
    private rota: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  //Método de edição
  editar(): void {
    this.servico.editar(this.funcionario).subscribe(() => {
      this.funcionario.ativo = !this.funcionario.dataSaida;
      this.toastr.success('Funcionário editado com sucesso!');
    });
  }

  ngOnInit() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));
    this.servico.buscarPorId(id).subscribe((retorno) => {
      this.funcionario = retorno;

      this.funcionario.dataNascimento = this.formatarData(this.funcionario.dataNascimento);
      this.funcionario.dataAdmissao = this.formatarData(this.funcionario.dataAdmissao);
      this.funcionario.dataSaida = this.formatarData(this.funcionario.dataSaida);

      this.cdr.detectChanges();
    });
  }

  formatarData(data: any): string {
    if (!data) return '';

    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}
