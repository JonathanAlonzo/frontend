//packages
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  //Protected routes by ..canActivated 
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'main/:uid', component: MainComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login']))},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
