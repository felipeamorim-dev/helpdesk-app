import { take } from 'rxjs';
import { TecnicoService } from './../../services/tecnico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  tecnicos!: Array<Tecnico>;
  dataSource = new MatTableDataSource(this.tecnicos);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private tecnicoService:TecnicoService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.tecnicoService.findAll().pipe(take(1)).subscribe({
      next: data => {
        this.tecnicos = data;
        this.dataSource = new MatTableDataSource<Tecnico>(data);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toast.error("Não foi possível encontrar técnicos na base de dados", "Erro ao buscar por técnicos")
      }
    })
  }
  /**
   * Método para realizar a filtragem de elementos da tabela de técnicos
   * @param event evento de digitação do nome do elemento a ser filtrado na tabela de técnicos
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
