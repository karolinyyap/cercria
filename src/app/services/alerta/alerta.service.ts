import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  api = 'http://localhost:8080/alerta';

  constructor(private http: HttpClient) {}

  selecionar() {
    return this.http.get<any[]>(`${this.api}/listagem`);
  }
}
