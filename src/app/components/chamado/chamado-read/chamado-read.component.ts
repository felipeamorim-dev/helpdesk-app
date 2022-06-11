import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnicoId:   '',
    clienteId:   '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
    private chamadoService: ChamadoService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  /**
   * Método para buscar pelo id o chamado
   */
  findById(): void {
    this.chamadoService.findById(this.chamado.id).pipe(take(1)).subscribe({
      next: resposta => {
        this.chamado = resposta;
      },
      error: ex => {
        this.toastService.error(ex.error.error);
    }});
  }
  /**
   * Método para converter o valor do status do chamado para uma string que descrevá-o.
   * @param status do chamado
   * @returns retorna uma string que descreve o status do chamado do usuário
   */
  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }
  /**
   * Método para converter o valor da prioridade em um string descritiva da prioridade do chamado
   * @param prioridade do chamado
   * @returns retorna uma string que descreve a prioridade do chamado para o usuário
   */
  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
}
