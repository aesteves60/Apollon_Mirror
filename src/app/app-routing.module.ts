import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { ForgetPswComponent }   from './forgetpsw/forgetpsw.component';
import { InscriptionComponent }   from './inscription/inscription.component';
import { PersonalizeComponent }   from './personalize/personalize.component';
import { MeteoComponent } from './mirror/meteo/meteo.component';
import { MirrorComponent } from './mirror/mirror.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { AproposComponent } from './apropos/apropos.component';
import { ApimanagerComponent } from './apimanager/apimanager.component';
import { AuthGuard } from "./_auth/auth.guard";


const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mirror', component: MirrorComponent },
  { path: 'meteo', component: MeteoComponent },
	{ path: 'forgetpsw' , canActivate: [ AuthGuard ], component: ForgetPswComponent },
  { path: 'inscription' , canActivate: [ AuthGuard ], component: InscriptionComponent },
	{ path: 'personalize', canActivate: [ AuthGuard ], component: PersonalizeComponent },
	{ path: 'contacter' , canActivate: [ AuthGuard ], component: ContactComponent },
	{ path: 'apropos' , canActivate: [ AuthGuard ], component: AproposComponent },
	{ path: 'account' , canActivate: [ AuthGuard ], component: AccountComponent  }
	{ path: 'forgetpsw', component: ForgetPswComponent },
  { path: 'inscription', component: InscriptionComponent },
	{ path: 'meteo', component: MeteoComponent },
	{ path: 'personalize', component: PersonalizeComponent },
	{ path: 'mirror', component: MirrorComponent },
	{ path: 'contacter', component: ContactComponent },
	{ path: 'apropos', component: AproposComponent },
	{ path: 'account', component: AccountComponent  },
	{ path: 'apimanager', component: ApimanagerComponent  }

];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule { }
