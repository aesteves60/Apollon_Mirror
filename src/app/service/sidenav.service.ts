import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';


@Injectable()
export class SidenavService {

  private sidenav: MatSidenav;

  public setSidenav(_sidenav: MatSidenav): void {
    this.sidenav = _sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
