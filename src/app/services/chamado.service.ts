import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Chamado>>{
    return this.http.get<Array<Chamado>>(`${environment.BASE_URL}/chamados`);
  }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${environment.BASE_URL}/chamados/${id}`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${environment.BASE_URL}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${environment.BASE_URL}/chamados/${chamado.id}`, chamado);
  }

}
