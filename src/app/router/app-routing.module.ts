import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }       from '../component/login/login.component';
import { PersonalizeComponent } from '../component/personalize/personalize.component';
import { MeteoComponent }       from '../component/modules/meteo/meteo.component';
import { MirrorComponent }      from '../component/mirror/mirror.component';
import { ContactComponent }     from '../component/contact/contact.component';
import { AproposComponent }     from '../component/apropos/apropos.component';
import { AccountComponent }     from '../component/account/account.component';
import { AuthGuard }            from '../auth/auth.guard';
import { ActualiteComponent }   from '../component/modules/actualite/actualite.component';
import { LequipeComponent }     from '../component/modules/lequipe/lequipe.component';
import { TraficComponent }      from '../component/modules/trafic/trafic.component';
import { RadioComponent }       from '../component/modules/radio/radio.component';
import { CalendarComponent }    from "../component/modules/calendar/calendar.component";


const routes: Routes = [
  /*
   * ROUTE AUTHENT
   */
  {path: '*', redirectTo: ''},
  {path: '', redirectTo: 'personalize', pathMatch: 'full'},
  {path: 'personalize', canActivate: [AuthGuard], component: PersonalizeComponent},
  {path: 'account', canActivate: [AuthGuard], component: AccountComponent},
  {path: 'contacter', canActivate: [AuthGuard], component: ContactComponent},
  {path: 'apropos', canActivate: [AuthGuard], component: AproposComponent},
  /*
   * ROUTE PUBLIC
   */
  {path: 'login', component: LoginComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'mirror', component: MirrorComponent},
  {path: 'radio', component: RadioComponent},
  {path: 'meteo', component: MeteoComponent},
  {path: 'actu', component: ActualiteComponent},
  {path: 'equipe', component: LequipeComponent},
  {path: 'trafic', component: TraficComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
