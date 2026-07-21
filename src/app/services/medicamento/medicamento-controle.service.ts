import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ControleMedicamentoService {
  private http = inject(HttpClient);

  private url: string = `${environment.apiUrl}/controle-medicamento`;

  cadastrar(dados: any): Observable<any> {
    return this.http.post<any>(`${this.url}/cadastro`, dados).pipe(
      catchError((err) => {
        console.error('Erro ao salvar programação', err);
        return throwError(() => err);
      }),
    );
  }

  salvarSaidaEsporadica(dados: any) {
    return this.http.post(`${this.url}/agenda/esporadico`, dados);
  }

  listarPorAcolhido(acolhidoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/acolhido/${acolhidoId}`);
  }
}
