import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavComponent, canActivate:  [AuthGuard], children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'tecnicos',
        component: TecnicoComponent,
      },
      {
        path: 'tecnicos/create',
        component: TecnicoCreateComponent
      },
      {
        path: 'tecnicos/update/:id',
        component: TecnicoUpdateComponent
      },
      {
        path: 'tecnicos/delete/:id',
        component: TecnicoDeleteComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
