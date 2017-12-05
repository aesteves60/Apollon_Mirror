import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private dragula: DragulaService) {
    this.dragula.setOptions('fifth-bag', {
      copy : true,
      invalid: (el, handle) => el.classList.contains('donotdrag'),
      removeOnSpill : false,
      ignoreInputTextSelection : true
    });
  }
}
