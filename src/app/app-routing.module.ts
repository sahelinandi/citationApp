import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AcknowledgementComponent} from './acknowledgement/acknowledgement.component';
import { HomeComponent } from './home/home.component';
import { ApplicationdetailsComponent } from './applicationdetails/applicationdetails.component';
import { RegisterCitationComponent } from './register-citation/register-citation.component';
import { SearchCitationComponent } from './search-citation/search-citation.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', component:DashboardComponent },
  { path: 'index.html', component:DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'acknowledgement', component: AcknowledgementComponent },
  { path: 'applicationdetails', component: ApplicationdetailsComponent },
  { path: 'registercitation', component: RegisterCitationComponent },
  { path: 'searchcitation', component: SearchCitationComponent },
  { path: 'login',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
