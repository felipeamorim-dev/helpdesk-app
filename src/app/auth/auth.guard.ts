import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

// Adicionando guarda de rotas: ng g guard auth/auth
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  /**
   * Método para proteger as rotas das páginas da aplicação
   * @param route
   * @param state
   * @returns retornar verdadeiro para as rotas que podem ser visualizadas pelo usuário autenticado
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let authenticate = this.authService.isAuthenticated();

    if (authenticate) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
