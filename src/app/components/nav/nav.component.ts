import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private toast: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['home']);
  }
  /**
   * Método para realizar o logout do usuário da aplicação
   */
  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout');
  }
}
