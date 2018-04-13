import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERIAL_NUMBER} from '../../../assets/config';

@Component({
  selector: 'modal-meteo',
  template: `
    <div><h4>Selectionner une ville : </h4>
      <input list="browsers" name="browser" [(ngModel)]="selectedVille" (keyup)="findVille($event)">
    </div>              
    `
})
export class Modal_Meteo implements OnInit {
  @Output() output = new EventEmitter();
  selectedVille : any;

  constructor(private http :HttpClient) { }

  ngOnInit() {
    this.http.get('/API/get_meteo_config', {params: { serial_number: SERIAL_NUMBER}})
             .subscribe((res) => {
               this.output.next(res);
               this.selectedVille = res
             });
  }

  findVille(e): void {
    this.output.next(e.target.value);
  }

}


