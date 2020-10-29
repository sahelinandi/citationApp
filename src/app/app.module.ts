import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { ApplicationdetailsComponent } from './applicationdetails/applicationdetails.component';
import { RegisterCitationComponent } from './register-citation/register-citation.component';
import { SearchCitationComponent } from './search-citation/search-citation.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AcknowledgementComponent,
    HomeComponent,
    MasterComponent,
    ApplicationdetailsComponent,
    RegisterCitationComponent,
    SearchCitationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
