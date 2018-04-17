import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERIAL_NUMBER} from '../../../assets/config';

@Component({
  selector: 'modal-meteo',
  template: `
    <div><h4>Selectionner une ville : </h4>
      <input [(ngModel)]="selectedVille" (keyup)="findVille($event)">
    </div>
  `
})
export class Modal_Meteo implements OnInit {
  @Output() output = new EventEmitter();
  selectedVille: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const options = {
      params: {
        serial_number: SERIAL_NUMBER,
        module : 'Météo'
      }
    };
    this.http.get('/API/get_config', options)
      .subscribe((res) => {
        this.output.next(res);
        this.selectedVille = res;
      });
  }

  findVille(e): void {
    this.output.next(e.target.value);
  }

}


