import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//drag n drop
import { Ng2DragDropModule } from 'ng2-drag-drop';
//sha256
import { sha256 } from 'crypto-js/sha256';

//composent de l'application
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { MeteoComponent } from './mirror/modules/meteo/meteo.component';
import { MirrorComponent } from './mirror/mirror.component';
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { CineComponent } from './mirror/modules/cine/cine.component';
import { AlertComponent } from './_tools/alert/alert.component';
import { AccountComponent } from './account/account.component';
import { ModalComponent } from './_tools/modal/modal.component';
import { EmptyComponent } from './mirror/modules/empty/empty.component';
import { ActualiteComponent } from './mirror/modules/actualite/actualite.component';
import { LequipeComponent } from './mirror/modules/lequipe/lequipe.component';
import { TraficComponent } from './mirror/modules/trafic/trafic.component';

//service
import { LoginService } from "./login/login.service";
import { MirrorService } from "./mirror/mirror.service";
import { AlertService } from "./_tools/alert/alert.service";
import { HttpAPIInterceptor } from "./_tools/HttpInterceptor";
import { SocketService } from "./_tools/socket.service";
import { AuthGuard } from "./_auth/auth.guard";

//directive
import { BottomCenterLeftDirective,
  BottomCenterRightDirective,
  BottomLeftDirective,
  BottomRightDirective,
  LeftDirective,
  RightDirective,
  TopLeftDirective,
  TopRightDirective } from "./mirror/mirror.directive";

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
    BottomCenterLeftDirective, BottomCenterRightDirective, BottomLeftDirective,
    BottomRightDirective, LeftDirective, RightDirective,
    TopLeftDirective, TopRightDirective,
    AlertComponent,
    AppComponent,
    LoginComponent,
    PersonalizeComponent,
    MeteoComponent,
    MirrorComponent,
    AproposComponent,
    ContactComponent,
    CineComponent,
    AccountComponent,
    ModalComponent,
    EmptyComponent,
    ActualiteComponent,
    LequipeComponent,
    TraficComponent
  ],
  imports: [
    /*AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDJot1R7QoZkfhcSBdxqdXzAgrnKuWF-zg'
    }),
    AgmDirectionModule,*/
    Ng2DragDropModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
    SocketService,
    AuthGuard
  ],
  entryComponents: [ MeteoComponent, CineComponent, ModalComponent, EmptyComponent, MirrorComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
