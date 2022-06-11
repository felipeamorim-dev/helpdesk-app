import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: FormControl = new FormControl('', Validators.email)
  senha: FormControl = new FormControl('', Validators.min(3));

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
  }
  /**
   * Método para realizar a requisição de login do usuário
   */
  logar(){
    this.authService.authenticate(this.creds).pipe(take(1)).subscribe({
      next: resposta => {
        this.authService.successfulLogin(resposta.headers.get('Authorization')?.substring(7));
        this.router.navigate(['']);
      },
      error: () => this.toast.error('Usuário e/ou senha inválidos')
    })
  }
  /**
   * Método utilizado para liberar o botão de login
   * @returns retorna verdadeiro se os vampos dos formulários estiver valido
   */
  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
