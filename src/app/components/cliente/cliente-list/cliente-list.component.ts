import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  clientes!: Array<Cliente>;
  dataSource = new MatTableDataSource(this.clientes);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {

    this.clienteService.findAll().pipe(take(1)).subscribe({
      next: data => {
        this.clientes = data;
        this.dataSource = new MatTableDataSource<Cliente>(data);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.toast.error("Não foi possível encontrar técnicos na base de dados", "Erro ao buscar por técnicos")
      }
    })
  }
  /**
   * Método para realizar a filtragem de elementos da tabela de clientes
   * @param event evento de digitação do nome do elemento a ser filtrado na tabela de clientes
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
