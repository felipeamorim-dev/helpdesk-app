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
  /**
   * Método para realizar o envio do usuário e senha
   * @param creds credenciais de autenticação do usuário
   * @returns retorna o usuário autenticado
   */
  authenticate(creds: Credenciais) {
    return this.http.post(`${environment.BASE_URL}/login`, creds, {
      observe: 'response',
      responseType: 'text',
    });
  }
  /**
   * Método para armazenar o token no local storage
   * @param authToken token a ser armazenado no local storage
   */
  successfulLogin(authToken: string | undefined) {
    if (authToken) localStorage.setItem('token', authToken);
  }
  /**
   * Método para avaliar se o token é valido ou está expirado
   * @returns retorna um boolean baseado na validade do token de autenticação
   */
  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token) return !this.jwtService.isTokenExpired(token);
    else return false;
  }
  /**
   * Método utilizado para limpar o local storage após o logout do usuário
   */
  logout() {
    localStorage.clear();
  }
}
