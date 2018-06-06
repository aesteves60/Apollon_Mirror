import {BrowserModule}                       from '@angular/platform-browser';
import {NgModule}                            from '@angular/core';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import {AppRoutingModule}                    from './router/app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

//drag n drop
import {Ng2DragDropModule} from 'ng2-drag-drop';
//sha256
import {sha256} from 'crypto-js/sha256';

//composent de l'application
import {AppComponent}         from './component/app.component';
import {LoginComponent}       from './component/login/login.component';
import {PersonalizeComponent} from './component/personalize/personalize.component';
import {MeteoComponent}       from './component/modules/meteo/meteo.component';
import {MirrorComponent}      from './component/mirror/mirror.component';
import {AproposComponent}     from './component/apropos/apropos.component';
import {ContactComponent}     from './component/contact/contact.component';
import {CineComponent}        from './component/modules/cine/cine.component';
import {AlertComponent}       from './service/alert/alert.component';
import {AccountComponent}     from './component/account/account.component';
import {ModalComponent}       from './component/modal/modal.component';
import {ActualiteComponent}   from './component/modules/actualite/actualite.component';
import {LequipeComponent}     from './component/modules/lequipe/lequipe.component';
import {TraficComponent}     from './component/modules/trafic/trafic.component';
import {Modal_Meteo}         from './component/modal/modal-meteo.component';
import {Modal_Radio}         from './component/modal/modal-radio.component';
import {RadioComponent}      from './component/modules/radio/radio.component';
import { CalendarComponent } from './component/modules/calendar/calendar.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { SidenavComponent } from "./component/sidenav/sidenav.component";
import { GmailComponent } from './component/modules/gmail/gmail.component';

//service
import {LoginService}       from './service/login.service';
import {MirrorService}      from './service/mirror.service';
import {AlertService}       from './service/alert/alert.service';
import {HttpAPIInterceptor} from './HttpInterceptor';
import {SocketService}      from './service/socket.service';
import {AuthGuard}          from './auth/auth.guard';
import {GoogleAuthService}  from './auth/authGoogle.service';
import {RadioService}       from './service/radio.service';
import {MeteoService}       from './service/meteo.service';
import {ModuleService}   from "./service/module.service";
import {UserService}   from "./service/user.service";
import { ArticleService } from "./service/article.service";
import { SidenavService } from "./service/sidenav.service";


//directive
import {
  BottomCenterLeftDirective,
  BottomCenterRightDirective,
  BottomLeftDirective,
  BottomRightDirective,
  LeftDirective,
  RightDirective,
  TopLeftDirective,
  TopRightDirective
} from './component/mirror/mirror.directive';

//Angular Material
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSortModule, MatSlideToggleModule,
  MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule
}                       from '@angular/material';
import { contentModal } from "./component/modal/modal.directive";

// You may not have this explicit reference.
/// <reference path="../../node_modules/@types/gapi/index.d.ts" />
declare var gapi : any;

@NgModule({
  declarations: [
    /*
     * DIRECTIVE
     */
    BottomCenterLeftDirective, BottomCenterRightDirective, BottomLeftDirective,
    BottomRightDirective, LeftDirective, RightDirective,
    TopLeftDirective, TopRightDirective,contentModal,
    /*
     * COMPONENT
     */
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
    ActualiteComponent,
    LequipeComponent,
    TraficComponent,
    RadioComponent,
    CalendarComponent,
    TopbarComponent,
    GmailComponent,
    ModalComponent,
    Modal_Meteo,
    Modal_Radio,
    SidenavComponent
  ],
  imports: [
    Ng2DragDropModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CdkTableModule,
    BrowserAnimationsModule,
    /*
     * ANGULAR MATERIAL
     */
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
    /*
     * SERVICES
     */
    LoginService,
    MirrorService,
    AlertService,
    SocketService,
    RadioService,
    MeteoService,
    ModuleService,
    GoogleAuthService,
    UserService,
    ArticleService,
    SidenavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAPIInterceptor,
      multi: true
    },
    AuthGuard
  ],
  entryComponents: [ ModalComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
