import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { ForgetPswComponent }   from './forgetpsw/forgetpsw.component';
import { InscriptionComponent }   from './inscription/inscription.component';
import { PersonalizeComponent }   from './personalize/personalize.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
  	{ path: 'login', component: LoginComponent },
	{ path: 'forgetpsw', component: ForgetPswComponent },
	{ path: 'inscription', component: InscriptionComponent },
	{ path: 'personalize', component: PersonalizeComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule { }
