import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  private url: string = `${environment.apiUrl}/alerta`;

  constructor(private http: HttpClient) {}

  selecionar() {
    return this.http.get<any[]>(`${this.url}/listagem`);
  }
}
