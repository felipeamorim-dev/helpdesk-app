import { map, take } from 'rxjs';
import { Chamado } from 'src/app/models/chamado';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnicoId: undefined,
    clienteId: undefined,
    nomeCliente: '',
    nomeTecnico: ''
  }

  clientes!: Array<Cliente>;
  tecnicos!: Array<Tecnico>;

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService:    ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById(this.chamado.id);
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(id: any){
    this.chamadoService.findById(id)
      .pipe(take(1))
      .subscribe({
        next: chamado => {
          this.chamado = chamado;
        },
        error: () => this.toastService.info('Chamado não encontrado')
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().pipe(take(1)).subscribe({
      next: data => {
        this.tecnicos = data;
      },
      error: () => this.toastService.info('Técnicos não encontrados')
    });
  }

  findAllClientes(): void {
    this.clienteService.findAll().pipe(take(1)).subscribe({
      next: data => {
        this.clientes = data
      },
      error: () => this.toastService.info('Clientes não encontrados')
    });
  }

  update(){
    this.chamado.nomeTecnico = this.tecnicos.filter(tecnico => tecnico.id == this.chamado.tecnicoId)[0].nome;
    this.chamado.nomeCliente = this.clientes.filter(cliente => cliente.id == this.chamado.clienteId)[0].nome;

    this.chamadoService.update(this.chamado).pipe(take(1)).subscribe({
      next: () => {
        this.toastService.success('Chamado atualizado com sucesso', 'Chamado Atualizado');
        this.router.navigate(['chamados']);
      },
      error: ex => this.toastService.error(ex.error.error)
    })
  }

  retornaStatus(status: any): string {
    return status == '0' ? 'ABERTO' : status == '1' ? 'EM ANDAMENTO' : 'ENCERRADO';
  }

  retornaPrioridade(prioridade: any): string {
    return prioridade == '0' ? 'BAIXA' : prioridade == '1' ? 'MÉDIA' : 'ALTA';
  }

  validaCampos(): boolean{
    return this.prioridade.valid && this.status.valid && this.titulo.valid
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }
}
