import { NgModule } from '@angular/core';

import { MirrorComponent } from './mirror.component';
import { ActualiteComponent } from '../modules/actualite/actualite.component';
import { CalendarComponent } from '../modules/calendar/calendar.component';
import { CineComponent } from '../modules/cine/cine.component';
import { GmailComponent } from '../modules/gmail/gmail.component';
import { LequipeComponent } from '../modules/lequipe/lequipe.component';
import { MeteoComponent } from '../modules/meteo/meteo.component';
import { RadioComponent } from '../modules/radio/radio.component';
import { TraficComponent } from '../modules/trafic/trafic.component';

import { routing } from './mirror.routing';

@NgModule({
    imports: [routing],
    declarations: [
        MirrorComponent,
        ActualiteComponent,
        CalendarComponent,
        CineComponent,
        GmailComponent,
        LequipeComponent,
        MeteoComponent,
        RadioComponent,
        TraficComponent,
    ]
})
export class MirrorModule {}
