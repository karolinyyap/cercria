import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Sidebar } from '../../../components/sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Patrimonio } from '../../../models/Patrimonio';
import { PatrimonioService } from '../../../services/patrimonio/patrimonio.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patrimonio-edicao',
  imports: [Header, Sidebar, FormsModule, RouterLink],
  templateUrl: './patrimonio-edicao.html',
  styleUrl: './patrimonio-edicao.css',
})
export class PatrimonioEdicao {
  patrimonio: Patrimonio = new Patrimonio();

  private servico = inject(PatrimonioService);
  constructor(
    private rota: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  //Método de edição
  editar(): void {
    this.servico.editar(this.patrimonio).subscribe(() => {
      this.toastr.success('Patrimônio editado com sucesso!');
    });
  }

  ngOnInit() {
    const id = Number(this.rota.snapshot.paramMap.get('id'));
    this.servico.buscarPorId(id).subscribe((retorno) => {
      this.patrimonio = retorno;
      this.cdr.detectChanges();
    });
  }

  @ViewChild('form')
  formulario!: NgForm;

  canDeactivate(): Promise<boolean> | boolean {
    console.log(this.formulario?.dirty);

    if (!this.formulario?.dirty) {
      return true;
    }

    return Swal.fire({
      title: 'Existem alterações não salvas',
      text: 'Deseja realmente sair desta página?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Continuar editando',
    }).then((result) => result.isConfirmed);
  }
}
