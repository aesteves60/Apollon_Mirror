import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// drag n drop
import { Ng2DragDropModule } from 'ng2-drag-drop';

// composent de l'application
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { MeteoComponent } from './modules/meteo/meteo.component';
import { MirrorComponent } from './mirror/mirror.component';
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { CineComponent } from './modules/cine/cine.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AccountComponent } from './account/account.component';
import { ModalComponent } from './component/modal/modal.component';
import { ActualiteComponent } from './modules/actualite/actualite.component';
import { LequipeComponent } from './modules/lequipe/lequipe.component';
import { TraficComponent } from './modules/trafic/trafic.component';
import { ModalMeteoComponent } from './component/modal/modal-meteo.component';
import { ModalRadioComponent } from './component/modal/modal-radio.component';
import { ModalTraficComponent } from './component/modal/modal-trafic.component';
import { RadioComponent } from './modules/radio/radio.component';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { TopbarComponent } from './core/topbar/topbar.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { GmailComponent } from './modules/gmail/gmail.component';
import { LoginService } from './login/login.service';
import { MirrorService } from './mirror/mirror.service';
import { AlertService } from './shared/alert/alert.service';
import { HttpAPIInterceptor } from './core/HttpInterceptor';
import { SocketService } from './core/socket.service';
import { AuthGuard } from './core/auth/auth.guard';
import { GoogleAuthService } from './core/auth/authGoogle.service';
import { RadioService } from './modules/radio/radio.service';
import { MeteoService } from './modules/meteo/meteo.service';
import { ModuleService } from './modules/module.service';
import { UserService } from './account/user.service';
import { ArticleService } from './modules/actualite/article.service';
import { SidenavService } from './core/sidenav/sidenav.service';
import { TraficService } from './modules/trafic/trafic.service';


// directive
import {
    BottomCenterLeftDirective,
    BottomCenterRightDirective,
    BottomLeftDirective,
    BottomRightDirective,
    LeftDirective,
    RightDirective,
    TopLeftDirective,
    TopRightDirective
} from './mirror/mirror.directive';

// Angular Material
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
import { ContentModalDirective } from './component/modal/modal.directive';

@NgModule({
    declarations: [
        /*
         * DIRECTIVE
         */
        BottomCenterLeftDirective, BottomCenterRightDirective, BottomLeftDirective,
        BottomRightDirective, LeftDirective, RightDirective,
        TopLeftDirective, TopRightDirective, ContentModalDirective,
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
        ModalMeteoComponent,
        ModalRadioComponent,
        ModalTraficComponent,
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
        TraficService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAPIInterceptor,
            multi: true
        },
        AuthGuard
    ],
    entryComponents: [ModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
