import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailsComponent } from './details/details.component';
import { FavoriteListComponent } from './favorite/favorite-list/favorite-list.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent ,data:{animation:'isLeft'}},
  { path: 'details/:id', component: DetailsComponent, data:{animation : 'isRight'} },
  { path: 'login', component: AuthComponent, data:{animation : 'isRight'},canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent, data:{animation : 'isRight'}, canActivate:[AuthGuard] },
  { path: 'list/favorites', component: FavoriteListComponent, data: { animation: 'isRIght'}, canActivate: [LoggedGuard]},
  { path: '**', component: NotFoundComponent,data:{animation : 'isRight'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
})
export class AppRoutingModule { }
