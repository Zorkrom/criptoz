import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent ,data:{animation:'isLeft'}},
  { path: 'details/:id', component: DetailsComponent, data:{animation : 'isRight'} },
  { path: 'login', component: AuthComponent, data:{animation : 'isRight'} },
  { path: 'register', component: RegisterComponent, data:{animation : 'isRight'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
