import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';

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

  constructor() { }

  ngOnInit(): void {
  }

  logar(){

  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
