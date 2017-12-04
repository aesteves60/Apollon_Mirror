import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgetPswComponent } from './forgetpsw/forgetpsw.component';
import { ModalModule } from './modal/modal.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPswComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
