import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Método para interceptar as requisições e adicionar o token de autenticação do usuário
   * @param request requisição inteceptada
   * @param next manipulador da requisição
   * @returns retorna a requisição com o token adicionado no header
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if(token) {
      const cloneReq = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(cloneReq);
    } else return next.handle(request);
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
