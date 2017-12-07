import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { ForgetPswComponent }   from './forgetpsw/forgetpsw.component';
import { InscriptionComponent }   from './inscription/inscription.component';
import { PersonalizeComponent }   from './personalize/personalize.component';
import { MeteoComponent } from './mirror/meteo/meteo.component';
import { MirrorComponent } from './mirror/mirror.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
  	{ path: 'login', component: LoginComponent },
	{ path: 'forgetpsw', component: ForgetPswComponent },
	{ path: 'inscription', component: InscriptionComponent },
	{ path: 'meteo', component: MeteoComponent },
	{ path: 'personalize', component: PersonalizeComponent },
	{ path: 'mirror', component: MirrorComponent },
	{ path: 'account', redirectTo: '/mirror'  }

];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule { }
