import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DenominationComponent } from './denomination/denomination.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DenominationComponent,
    SearchComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
