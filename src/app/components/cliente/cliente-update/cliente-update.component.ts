import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  cliente: Cliente = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  checkedCliente: boolean = true;
  checkedAdmin: boolean = false;
  checkedTecnico: boolean = false;

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }
  /**
   * Método para realizar a busca de um cliente pelo id
   */
  findById(): void {
    this.service.findById(this.cliente.id).pipe(take(1)).subscribe(resposta => {
      resposta.perfis = [];
      this.cliente = resposta;
      this.cliente.perfis.push(1);
    })
  }
  /**
   * Método para solicitar a atualizados dos dados do cliente
   */
  update(): void {
    this.service.update(this.cliente).pipe(take(1)).subscribe({
      next: () => {
        this.toast.success('Cliente atualizado com sucesso', 'Update');
        this.router.navigate(['clientes'])
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
   * Método para adicionar ou retirar o perfil do cliente no formulário de cadastro
   * @param perfis enumeração para definir o nivel de acesso do cliente cadastrado na base
   */
  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }

  }
  /**
   * Método para realizar a validação do formulário de criação de novos clientes
   * @returns retorna verdadeiro quando todos os campos do formulários estão devidamente preenchidos e falso para o contrário
   */
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }
  /**
   * Método para realizar a verificação do perfil do cliente.
   * @param perfil perfil a ser analisado
   */
  verifyPerfil(perfil: string) {
    if(perfil === 'TECNICO') this.checkedTecnico = !this.checkedTecnico;
    if(perfil === 'ADMIN') this.checkedAdmin = !this.checkedAdmin;
  }
}
