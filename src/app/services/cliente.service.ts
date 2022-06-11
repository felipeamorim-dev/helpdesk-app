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
  /**
   * Método para buscar uma lista de clientes cadastrado no banco de dados
   * @returns retorna uma lista de clientes
   */
  findAll(): Observable<Array<Cliente>>{
    return this.http.get<Array<Cliente>>(`${environment.BASE_URL}/clientes`);
  }
  /**
   * Método para busca um cliente pelo seu identificador
   * @param id identificador do cliente
   * @returns retorna o cliente desejado
   */
  findById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.BASE_URL}/clientes/${id}`);
  }
  /**
   * Método para realizar o cadastro de um novo cliente
   * @param cliente dados do cliente
   * @returns retorna um novo cliente
   */
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.BASE_URL}/clientes`, cliente);
  }
  /**
   * Método para realizar a atualização dos dados do cliente
   * @param cliente dados do cliente
   * @returns retorna o cliente atualizado
   */
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.BASE_URL}/clientes/${cliente.id}`, cliente);
  }
  /**
   * Método para deletar um cliente do banco de dados
   * @param id identificador do cliente
   * @returns retorna nada
   */
  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${environment.BASE_URL}/clientes/${id}`);
  }
}
