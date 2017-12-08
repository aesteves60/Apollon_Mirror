import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private dragula: DragulaService, private router: Router ) {
    this.dragula.setOptions('fifth-bag', {
      copy : true,
      invalid: (el, handle) => el.classList.contains('donotdrag'),
      removeOnSpill : false,
      ignoreInputTextSelection : true
    });
  }
}
