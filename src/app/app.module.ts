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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import { NgxPaginationModule } from 'ngx-pagination';

import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SafehtmlPipe } from './pipes/safehtml.pipe';
import { SafehtmlpipePipe } from './pipes/safehtmlpipe.pipe';
import { UniquePipe } from './pipes/unique.pipe';
import { TrackcitationmodalComponent } from './track-citation-modal/trackcitationmodal/trackcitationmodal.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AcknowledgementComponent,
    HomeComponent,
    MasterComponent,
    ApplicationdetailsComponent,
    RegisterCitationComponent,
    SearchCitationComponent,
    ContactDetailsComponent,
    SafehtmlPipe,
    SafehtmlpipePipe,
    UniquePipe,
    TrackcitationmodalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule, MatIconModule, MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    NgxPaginationModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
