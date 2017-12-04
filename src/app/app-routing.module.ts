import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { ForgetPswComponent }   from './forgetpsw/forgetpsw.component';

const routes: Routes = [
  	{ path: 'login', component: LoginComponent },
	{ path: 'forgetpsw', component: ForgetPswComponent },
	{ path: 'mirror', component: LoginComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule { }
