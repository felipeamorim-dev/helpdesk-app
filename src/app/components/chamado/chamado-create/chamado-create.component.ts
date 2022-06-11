import { Chamado } from './../../../models/chamado';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';
import { Cliente } from 'src/app/models/cliente';
import { ChamadoService } from 'src/app/services/chamado.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnicoId: null,
    clienteId: null,
    nomeCliente: '',
    nomeTecnico: ''
  }

  titulo: FormControl = new FormControl('', Validators.required);
  status: FormControl = new FormControl('', Validators.required);
  prioridade: FormControl = new FormControl('', Validators.required);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, Validators.required);
  cliente: FormControl = new FormControl(null, Validators.required);

  tecnicos!: Array<Tecnico>;
  clientes!: Array<Cliente>;

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService:    ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllTecnicos();
    this.findAllClientes();
  }
  /**
   * Método para buscar todos os técnicos da empresa disponiveis para a realização do serviço
   */
  findAllTecnicos(): void {
    this.tecnicoService.findAll().pipe(take(1)).subscribe({
      next: data => {
        this.tecnicos = data;
      },
      error: () => this.toastService.info('Técnicos não encontrados')
    });
  }
  /**
   * Método para buscar todos os clientes que estão cadastrados na plataforma
   */
  findAllClientes(): void {
    this.clienteService.findAll().pipe(take(1)).subscribe({
      next: data => {
        this.clientes = data
      },
      error: () => this.toastService.info('Clientes não encontrados')
    });
  }
  /**
   * Método para enviar a requisição de criar chamado para o backend da aplicação
   */
  create(){
    this.chamado.nomeTecnico = this.tecnicos.filter(tecnico => tecnico.id == this.chamado.tecnicoId)[0].nome;
    this.chamado.nomeCliente = this.clientes.filter(cliente => cliente.id == this.chamado.clienteId)[0].nome;
    this.chamadoService.create(this.chamado).pipe(take(1)).subscribe({
      next: () => {
        this.toastService.success("Chamado criado com sucesso", "Novo Chamado");
        this.router.navigate(['chamados'])
      },
      error: ex => this.toastService.error(ex.error.error)
    });
  }
  /**
   * Método para validar o formulário de criação de chamados
   * @returns retorna verdadeiro ou falso de acordo com a validação do formulário
   */
  validaCampos(): boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }

}
