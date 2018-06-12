import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';


@Injectable()
export class SidenavService {

  private _isOpen: boolean = false;
  private sidenav: MatSidenav;

  public setSidenav(_sidenav: MatSidenav): void {
    this.sidenav = _sidenav;
  }

  public open() {
    this.isOpen = true;
    return this.sidenav.open();
  }

  public close() {
    this.isOpen = false;
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
    this._isOpen = !this._isOpen;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    this._isOpen = !this._isOpen;
  }
}
