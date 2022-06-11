import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  checkedTecnico: boolean = true;
  checkedAdmin: boolean = false;
  checkedCliente: boolean = false;


  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }
  /**
   * Método para buscar os dados do técnico que será atualizado
   */
  findById(): void {
    this.service.findById(this.tecnico.id).pipe(take(1)).subscribe(resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
      this.tecnico.perfis.push(2);
    })
  }
  /**
   * Método para solicitar a atualização de dados do técnico ao backend da aplicação
   */
  update(): void {
    this.service.update(this.tecnico).pipe(take(1)).subscribe({
      next: () => {
        this.toast.success('Técnico atualizado com sucesso', 'Update');
        this.router.navigate(['tecnicos'])
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
   * Método para adicionar o perfil do técnico a ser atualizado
   * @param perfil selecionado no formulário
   */
  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }

  }
  /**
   * Método utilizado para liberar o botão de atualização do formulário após validar os campos do formulário
   * @returns verdadeiro quando todos os campos do formulário passaram na validação e falso para o contrario
   */
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }
  /**
   * Método para adicionar ou retirar o checked do checkbox do perfil do técnico no formulário
   * @param perfil selecionado no formulário
   */
  verifyPerfil(perfil: string) {
    if(perfil === 'CLIENTES') this.checkedCliente = !this.checkedCliente;
    if(perfil === 'ADMIN') this.checkedAdmin = !this.checkedAdmin;
  }
}
