import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MirrorComponent } from './mirror.component';
import { ActualiteComponent } from '../modules/actualite/actualite.component';
import { CalendarComponent } from '../modules/calendar/calendar.component';
import { CineComponent } from '../modules/cine/cine.component';
import { GmailComponent } from '../modules/gmail/gmail.component';
import { LequipeComponent } from '../modules/lequipe/lequipe.component';
import { MeteoComponent } from '../modules/meteo/meteo.component';
import { RadioComponent } from '../modules/radio/radio.component';
import { TraficComponent } from '../modules/trafic/trafic.component';

const routes: Routes = [
  { path: '', component: MirrorComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'gmail', component: GmailComponent },
  { path: 'cinema', component: CineComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'meteo', component: MeteoComponent },
  { path: 'actualite', component: ActualiteComponent },
  { path: 'equipe', component: LequipeComponent },
  { path: 'trafic', component: TraficComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
