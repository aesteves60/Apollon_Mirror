import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private dragula: DragulaService) {
    this.dragula.setOptions('another-bag2', {
      revertOnSpill: true
    });
  }
}
