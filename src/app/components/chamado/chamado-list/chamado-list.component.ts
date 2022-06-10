import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, take } from 'rxjs';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamdo-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  chamados!: Array<Chamado>;
  chamadosFiltrados!: Array<Chamado>;
  dataSource = new MatTableDataSource(this.chamados);
  displayedColumns: Array<String> = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private service: ChamadoService) { }

  ngOnInit(): void {
    this.service.findAll()
      .pipe(take(1))
      .pipe(map(data => this.transformaData(data)))
      .subscribe({
        next: data => {
          this.chamados = data;
          this.dataSource = new MatTableDataSource<Chamado>(data);
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  orderByStatus(status: any) {
    let chamadoFilter: Chamado[] = [];
    this.chamados.forEach(chamado => {
      if (chamado.status === status) chamadoFilter.push(chamado);
    });

    this.chamadosFiltrados = chamadoFilter;
    this.dataSource = new MatTableDataSource<Chamado>(chamadoFilter);
    this.dataSource.paginator = this.paginator;
  }

  transformaData(data: any): any{
    data.forEach((chamado: any) => {
      chamado.prioridade = chamado.prioridade === 0 ? 'BAIXA' : chamado.prioridade === 1 ? 'MÉDIA' : 'ALTA';
      chamado.status = chamado.status === 0 ? 'ABERTO' : chamado.status === 1 ? 'ANDAMENTO' : 'ENCERRADO';
    });

    return data;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
