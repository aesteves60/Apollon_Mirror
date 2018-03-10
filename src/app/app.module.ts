import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//service
import { LoginService } from "./login/login.service";
import { MirrorService } from "./mirror/mirror.service";
import { AlertService } from "./_tools/alert.service";
import { HttpAPIInterceptor } from "./_tools/HttpInterceptor";
import { AuthGuard } from "./_auth/auth.guard";


//drag n drop
import { NgDragDropModule } from 'ng-drag-drop';
//sha256
import { sha256 } from 'crypto-js/sha256';

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
import { MyMirrorDirective } from "./mirror/mirror.directive";

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
    NgDragDropModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule,
    HttpClientModule,
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
  providers: [
    LoginService,
    MirrorService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAPIInterceptor,
      multi: true
    },

    AuthGuard
  ],
  entryComponents: [ MeteoComponent, CineComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
