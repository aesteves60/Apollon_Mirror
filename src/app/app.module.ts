import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// drag n drop
import { NgDragDropModule } from 'ng-drag-drop';

// composent de l'application
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AccountComponent } from './account/account.component';
import { ModalComponent } from './component/modal/modal.component';
import { ModalMeteoComponent } from './component/modal/modal-meteo.component';
import { ModalRadioComponent } from './component/modal/modal-radio.component';
import { ModalTraficComponent } from './component/modal/modal-trafic.component';
import { TopbarComponent } from './core/topbar/topbar.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
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
import { ContentModalDirective } from './component/modal/modal.directive';

import { MaterialModule } from './shared/material.module';

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
        AproposComponent,
        ContactComponent,
        AccountComponent,
        TopbarComponent,
        ModalComponent,
        ModalMeteoComponent,
        ModalRadioComponent,
        ModalTraficComponent,
        SidenavComponent
    ],
    imports: [
        NgDragDropModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule
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
