import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './sidenav.service';
import { LoginService } from '../../login/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../account/user.service';
import { User } from '../../account/user';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav') sidenav: MatSidenav;
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    location: string;
    user: User;

    constructor(changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private sidenavService: SidenavService,
        private router: Router,
        private user$: UserService,
        private loginS: LoginService) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.loadRouter();
        this.loadUser();
    }

    loadUser() {
        this.user$.getUser().subscribe(user => this.user = user);
        this.user = this.user$.user;
    }

    loadRouter() {
        this.location = this.router.url;

        this.router.events.subscribe((path) => {
            if (path instanceof NavigationEnd) {
                this.location = path.url;
            }
        });
    }

    closeSidenav() {
        if (this.mobileQuery.matches) {
            this.sidenavService.toggle();
        }
    }

    logout() {
        this.loginS.logout();
        this.sidenavService.close();
    }

    ngOnInit() {
        this.sidenavService.setSidenav(this.sidenav);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
