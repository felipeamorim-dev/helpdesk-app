import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credenciais } from '../models/credenciais';

// Instalação do auth0: npm i @auth0/angular-jwt
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  authenticate(creds: Credenciais) {
    return this.http.post(`${environment.BASE_URL}/login`, creds, {
      observe: 'response',
      responseType: 'text',
    });
  }

  successfulLogin(authToken: string | undefined) {
    if (authToken) localStorage.setItem('token', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token) return !this.jwtService.isTokenExpired(token);
    else return false;
  }

  logout() {
    localStorage.clear();
  }
}
