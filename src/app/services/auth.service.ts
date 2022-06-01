import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${environment.BASE_URL}/login`, creds, {observe: 'response', responseType: 'text'} );
  }

  successfulLogin(authToken: string | undefined){
    if (authToken) localStorage.setItem('token', authToken);
  }

  logout(){
    localStorage.clear();
  }
}
