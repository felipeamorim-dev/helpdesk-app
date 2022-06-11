import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
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
    private service: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
  ) { }

  ngOnInit(): void {
  }
  /**
   * Método para adicionar ou retirar o perfil do cliente no formulário de cadastro
   * @param perfis enumeração para definir o nivel de acesso do cliente cadastrado na base
   */
  addPerfil(perfis: any): void {
    if (this.cliente.perfis.includes(perfis)) {
      this.cliente.perfis.slice(this.cliente.perfis.indexOf(perfis), 1);
    } else {
      this.cliente.perfis.push(perfis);
    }
  }
  /**
   * Método para enviar a requisição de criação de novos clientes na base de dados
   */
  create(): void {
    this.service.create(this.cliente).pipe(take(1)).subscribe({
      next: () => {
        this.toast.success("Cliente cadastrado com sucesso", "Cadastro");
        this.router.navigate(['clientes']);
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
   * Método para realizar a validação do formulário de criação de novos clientes
   * @returns retorna verdadeiro quando todos os campos do formulários estão devidamente preenchidos e falso para o contrário
   */
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }
}
