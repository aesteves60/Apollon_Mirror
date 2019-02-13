import { Component } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

    constructor(public sidenavService: SidenavService) { }

    openSideNav() {
        this.sidenavService.toggle();
    }
}
