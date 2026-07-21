import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EntradaProduto } from '../../models/EntradaProduto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ControleProdutoService {
  // URL base da API de produtos, usada como prefixo em todas as requisições
  private url: string = `${environment.apiUrl}/controle-produto`;

  // Construtor que injeta o HttpClient, permitindo fazer requisições HTTP
  constructor(private http: HttpClient) {}

  cadastrarEntrada(dados: any): Observable<any> {
    return this.http.post<any>(`${this.url}/entrada/cadastro`, dados).pipe(
      catchError((err) => {
        console.error('Erro ao salvar entrada', err);
        return throwError(() => err);
      }),
    );
  }

  cadastrarSaida(dados: any): Observable<any> {
    return this.http.post<any>(`${this.url}/saida/cadastro`, dados).pipe(
      catchError((err) => {
        console.error('Erro ao salvar entrada', err);
        return throwError(() => err);
      }),
    );
  }

  listarPorProduto(produtoId: number): Observable<EntradaProduto[]> {
    return this.http.get<EntradaProduto[]>(`${this.url}/entrada/produto/${produtoId}`);
  }
}
