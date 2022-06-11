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
  /**
   * Método para buscar todos os chamados
   * @returns retorna uma lista de chamados armazenados no banco de dados
   */
  findAll(): Observable<Array<Chamado>>{
    return this.http.get<Array<Chamado>>(`${environment.BASE_URL}/chamados`);
  }
  /**
   * Método para buscar um chamado pelo seu identificador
   * @param id identificador do chamado
   * @returns retorna um chamado especifico
   */
  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${environment.BASE_URL}/chamados/${id}`);
  }
  /**
   * Método para criar um novo chamando
   * @param chamado dados do chamado a ser criado
   * @returns retorna o novo chamado adicionado a base de dados
   */
  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${environment.BASE_URL}/chamados`, chamado);
  }
  /**
   * Método para realizar a atualização de chamado
   * @param chamado dados do chamado a ser atualizado
   * @returns
   */
  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${environment.BASE_URL}/chamados/${chamado.id}`, chamado);
  }

}
