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
    perfis: [],
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
  /**
   * Método para adicionar os perfis ao novo técnico cadastrado na base
   * @param perfis perfil selecionado no formulário
   */
  addPerfil(perfis: any): void {
    if (this.tecnico.perfis.includes(perfis)) {
      this.tecnico.perfis.slice(this.tecnico.perfis.indexOf(perfis), 1);
    } else {
      this.tecnico.perfis.push(perfis);
    }
  }
  /**
   * Método para solicitar a inclusão do novo técnico ao bando de dados
   */
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
  /**
   * Método para validar o acesso ao botão de criar um técnico
   * @returns verdadeiro para o formúlario valido ou falso para o contrário
   */
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }

}
