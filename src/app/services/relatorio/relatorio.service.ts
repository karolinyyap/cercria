import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private url: string = `${environment.apiUrl}/relatorio`;

  constructor(private http: HttpClient) {}

  gerarRelatorio(dados: any): Observable<Blob> {
    return this.http.post(`${this.url}/gerar`, dados, {
      responseType: 'blob',
    });
  }
}
