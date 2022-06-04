import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast:    ToastrService,
    private router:          Router,
  ) { }

  ngOnInit(): void {
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfil.includes(perfil)) {
      this.tecnico.perfil.slice(this.tecnico.perfil.indexOf(perfil), 2);
    } else {
      this.tecnico.perfil.push(perfil);
    }
  }

  create(): void {
    this.service.create(this.tecnico).pipe(take(1)).subscribe({
      next: () => {
        this.toast.success("Técnico cadastrado com sucesso", "Cadastro");
        this.router.navigate(['tecnicos']);
      },
      error: ex => {
        if(ex.error.errors) {
          ex.error.errors.forEach((element: any) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }

}
