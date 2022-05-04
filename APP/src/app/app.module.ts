import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginButtonComponent } from './auth/login-button/login-button.component';
import { DenominationComponent } from './denomination/denomination.component';
import { DetailsGraphComponent } from './details/coin/details-graph/details-graph.component';
import { FooterGraphComponent } from './details/coin/footer-graph/footer-graph.component';
import { HeaderGraphComponent } from './details/coin/header-graph/header-graph.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './list/search/search.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DenominationComponent,
    SearchComponent,
    DetailsComponent,
    HeaderGraphComponent,
    DetailsGraphComponent,
    FooterGraphComponent,
    LoginButtonComponent,
    AuthComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
