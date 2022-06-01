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

  findAll(): Observable<Tecnico>{
    return this.http.get<Tecnico>(`${environment.BASE_URL}/tecnicos`);
  }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${environment.BASE_URL}/tecnicos/${id}`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${environment.BASE_URL}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${environment.BASE_URL}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${environment.BASE_URL}/tecnicos/${id}`);
  }
}
