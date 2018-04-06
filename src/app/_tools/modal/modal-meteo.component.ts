import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'modal-meteo',
  template: `
    <div><h3>Selectionné une ville : </h3>
      <select>
        <option>Paris</option>
        <option>Lille</option>
        <option>Lyon</option>
      </select>
    </div>              
  `
})
export class Modal_Meteo implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}


