import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MedicamentoEstoqueM } from '../../models/MedicamentoEstoqueM';

@Injectable({ providedIn: 'root' })
export class MedicamentoEstoqueService {
  private url = 'http://localhost:8080/entrada-medicamento';
  private http = inject(HttpClient);

  cadastrar(e: MedicamentoEstoqueM): Observable<MedicamentoEstoqueM> {
    return this.http.post<MedicamentoEstoqueM>(this.url + '/cadastro', e).pipe(
      catchError((err) => {
        console.error('Erro ao cadastrar entrada', err);
        return throwError(() => err);
      }),
    );
  }

  listarPorMedicamento(medicamentoId: number): Observable<MedicamentoEstoqueM[]> {
    return this.http.get<MedicamentoEstoqueM[]>(`${this.url}/medicamento/${medicamentoId}`);
  }

  buscarPorId(id: number): Observable<MedicamentoEstoqueM> {
    return this.http.get<MedicamentoEstoqueM>(`${this.url}/${id}`);
  }

  editar(e: MedicamentoEstoqueM): Observable<MedicamentoEstoqueM> {
    return this.http.put<MedicamentoEstoqueM>(this.url + '/edicao', e).pipe(
      catchError((err) => {
        console.error('Erro ao editar entrada', err);
        return throwError(() => err);
      }),
    );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
