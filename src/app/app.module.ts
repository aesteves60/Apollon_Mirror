import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

import { Ng2DragDropModule } from 'ng2-drag-drop';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPswComponent } from './forgetpsw/forgetpsw.component';
import { ModalModule } from './modal/modal.module';
import { InscriptionComponent } from './inscription/inscription.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { AccountComponent } from './account/account.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPswComponent,
    InscriptionComponent,
    PersonalizeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule,
    Ng2DragDropModule.forRoot()
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
