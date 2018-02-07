import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from "./_auth/auth.guard";

//service
import { LoginService } from "./login/login.service";
import {MirrorService} from "./mirror/mirror.service";
import {AlertService} from "./_tools/alert.service";

//drag n drop
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

//composent de l'application
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPswComponent } from './forgetpsw/forgetpsw.component';
import { ModalModule } from './_tools/modal/modal.module';
import { PersonalizeComponent } from './personalize/personalize.component';
import { MeteoComponent } from './mirror/meteo/meteo.component';
import { MirrorComponent } from './mirror/mirror.component';
import { ItemsPersonalizeComponent } from './items_personalize/items_personalize.component';
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { CineComponent } from './mirror/cine/cine.component';
import { ApimanagerComponent } from './apimanager/apimanager.component';
import { AlertComponent } from './_tools/alert/alert.component';
import {MyMirrorDirective} from "./mirror/mirror.directive";

//Angular Material
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSortModule, MatSlideToggleModule,
  MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
} from '@angular/material';

@NgModule({
  declarations: [
    MyMirrorDirective,
    AlertComponent,
    AppComponent,
    LoginComponent,
    ForgetPswComponent,
    PersonalizeComponent,
    MeteoComponent,
    MirrorComponent,
    ItemsPersonalizeComponent,
    AproposComponent,
    ContactComponent,
    CineComponent,
    ApimanagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
    HttpClientModule,
    DragulaModule,
    CdkTableModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [ LoginService, MirrorService, AlertService,  AuthGuard ],
  entryComponents: [ MeteoComponent, CineComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
