import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPswComponent } from './forgetpsw/forgetpsw.component';
import { ModalModule } from './modal/modal.module';
import { InscriptionComponent } from './inscription/inscription.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { AccountComponent } from './account/account.component';
import { MeteoComponent } from './mirror/meteo/meteo.component';

//Angular Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatDialogModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPswComponent,
    InscriptionComponent,
    PersonalizeComponent,
    AccountComponent, 
    MeteoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule,
    HttpClientModule,
    DragulaModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
