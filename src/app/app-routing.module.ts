import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PersonalizeComponent} from './personalize/personalize.component';
import {MeteoComponent} from './mirror/modules/meteo/meteo.component';
import {MirrorComponent} from './mirror/mirror.component';
import {ContactComponent}    from './contact/contact.component';
import {AproposComponent}    from './apropos/apropos.component';
import {AccountComponent}    from './account/account.component';
import {AuthGuard}           from './_auth/auth.guard';
import {ActualiteComponent}  from './mirror/modules/actualite/actualite.component';
import {LequipeComponent}    from './mirror/modules/lequipe/lequipe.component';
import {TraficComponent}     from './mirror/modules/trafic/trafic.component';
import {RadioComponent}      from './mirror/modules/radio/radio.component';
import { CalendarComponent } from "./mirror/modules/calendar/calendar.component";


const routes: Routes = [
  /*
   * ROUTE AUTHENT
   */
  {path: '', redirectTo: '/personalize', pathMatch: 'full'},
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
