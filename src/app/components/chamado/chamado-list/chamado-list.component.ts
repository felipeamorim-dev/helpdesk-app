import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamdo-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  dataSource!: Array<Chamado>;
  displayedColumns: Array<String> = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];

  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.service.findAll()
      .pipe(take(1))
      .pipe(map(data => this.transformaData(data)))
      .subscribe({
        next: data => {
          this.dataSource = data;
        }
      });
  }

  orderByStatus(status: any){

  }

  transformaData(data: any): any{
    data.forEach((chamado: any) => {
      chamado.prioridade = chamado.prioridade === 0 ? 'BAIXA' : chamado.prioridade === 1 ? 'MÉDIA' : 'ALTA';
      chamado.status = chamado.status === 0 ? 'ABERTO' : chamado.status === 1 ? 'ANDAMENTO' : 'ENCERRADO';
    });

    return data;
  }

  applyFilter(event: any) {

  }
}
