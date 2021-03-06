import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

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
   * Método para buscar os dados do técnico por id
   */
  findById(): void {
    this.service.findById(this.tecnico.id).pipe(take(1)).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }
  /**
   * Método para solicitar o exclusão do cadastro do técnico do bando de dados através do seu id
   */
  delete(): void {
    this.service.delete(this.tecnico.id).pipe(take(1)).subscribe({
      next: () => {
        this.toast.success('Técnico deletado com sucesso', 'Delete');
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
}
