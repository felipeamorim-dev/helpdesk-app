import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<Cliente>>{
    return this.http.get<Array<Cliente>>(`${environment.BASE_URL}/clientes`);
  }

  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.BASE_URL}/clientes/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.BASE_URL}/clientes`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.BASE_URL}/clientes/${cliente.id}`, cliente);
  }

  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${environment.BASE_URL}/clientes/${id}`);
  }
}
