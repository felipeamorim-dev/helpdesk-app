import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }
  /**
   * Método para buscar todo os técnicos
   * @returns retorna uma lista de técnicos
   */
  findAll(): Observable<Array<Tecnico>>{
    return this.http.get<Array<Tecnico>>(`${environment.BASE_URL}/tecnicos`);
  }
  /**
   * Método para buscar no banco de dados o Técnico especifico
   * @param id identificador utiizado para realizar a buscar de um técnico
   * @returns retorna um técnico especifico
   */
  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${environment.BASE_URL}/tecnicos/${id}`);
  }
  /**
   * Método para adicionar um novo técnico
   * @param tecnico dados do novo técnico
   * @returns o novo técnico adicionado ao banco de dados
   */
  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${environment.BASE_URL}/tecnicos`, tecnico);
  }
  /**
   * Método para atualizar os dados do técnico
   * @param tecnico dados do técnico a ser atualizado na base de dados
   * @returns o técnico com os dados atualizados
   */
  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${environment.BASE_URL}/tecnicos/${tecnico.id}`, tecnico);
  }
  /**
   * Método para realizar o delete do técnico na base de dados
   * @param id identificador do técnico
   * @returns o técnico que foi deletado da base de dados
   */
  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${environment.BASE_URL}/tecnicos/${id}`);
  }
}
