import {
    AfterContentInit, Component,
    OnInit, ViewChild,
} from '@angular/core';
import {
    BottomCenterLeftDirective,
    BottomCenterRightDirective,
    BottomLeftDirective,
    BottomRightDirective,
    LeftDirective,
    RightDirective,
    TopLeftDirective,
    TopRightDirective
} from './mirror.directive';
import { MirrorService } from './mirror.service';
import { ModuleService } from '../modules/module.service';

// component
import { MeteoComponent } from '../modules/meteo/meteo.component';
import { LequipeComponent } from '../modules/lequipe/lequipe.component';
import { ActualiteComponent } from '../modules/actualite/actualite.component';
import { TraficComponent } from '../modules/trafic/trafic.component';
import { RadioComponent } from '../modules/radio/radio.component';
import { CalendarComponent } from '../modules/calendar/calendar.component';
import { GmailComponent } from '../modules/gmail/gmail.component';
import { SocketService } from '../core/socket.service';
import { Event } from '../core/event';

@Component({
    selector: 'app-mirror',
    templateUrl: './mirror.component.html',
    styleUrls: ['./mirror.component.css'],
    entryComponents: [MeteoComponent, TraficComponent,
        LequipeComponent, ActualiteComponent, RadioComponent, CalendarComponent, GmailComponent]
})
export class MirrorComponent implements AfterContentInit, OnInit {

    @ViewChild(BottomCenterLeftDirective) private bottomCenterLeftDirective: BottomCenterLeftDirective;
    @ViewChild(BottomCenterRightDirective) private bottomCenterRightDirective: BottomCenterRightDirective;
    @ViewChild(BottomLeftDirective) private bottomLeftDirective: BottomLeftDirective;
    @ViewChild(BottomRightDirective) private bottomRightDirective: BottomRightDirective;
    @ViewChild(RightDirective) private rightDirective: RightDirective;
    @ViewChild(LeftDirective) private leftDirective: LeftDirective;
    @ViewChild(TopRightDirective) private topRightDirective: TopRightDirective;
    @ViewChild(TopLeftDirective) private topLeftDirective: TopLeftDirective;

    private list_modules = [];
    private list_directive = [];
    private ipLocale: any;

    constructor(private module$: ModuleService,
        private mirror$: MirrorService,
        private socketService: SocketService) { }

    ngOnInit() {
        this.list_directive = [this.topLeftDirective, this.topRightDirective, this.leftDirective, this.rightDirective,
        this.bottomLeftDirective, this.bottomRightDirective, this.bottomCenterLeftDirective, this.bottomCenterRightDirective];

        this.socketService.onEvent(Event.MIRROR_CHANGE).subscribe(() => this.loadView());

    }

    ngAfterContentInit() {
        this.loadView();
    }

    loadView(): void {
        this.module$.getViews().subscribe(res => {
            this.list_modules = [];
            for (let i = 0; i < res['length']; i++) {
                if (res[i]) {
                    this.list_modules.push(this.mirror$.getMirorItem().find(item => res[i]['name'] === item.name));
                    this.mirror$.loadComponent(this.list_directive[i].viewContainerRef, this.list_modules[i]);
                } else {
                    this.list_modules.push(null);
                    this.mirror$.loadComponent(this.list_directive[i].viewContainerRef, this.list_modules[i]);
                }
            }
        });
    }

    getIpLocale() {
        const pc = new RTCPeerConnection({ iceServers: [] }), noop = () => { };
        // @ts-ignore
        pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
        const self = this;
        pc.onicecandidate = (ice) => {
            if (ice && ice.candidate && ice.candidate.candidate) {
                const myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                this.ipLocale = myIP;
                pc.onicecandidate = noop;
            }
        };
    }

}
