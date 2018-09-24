import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../../environments/config';

@Component({
  selector: 'modal-meteo',
  template: `
    <div><h4>Selectionner une ville : </h4>
      <input [(ngModel)]="selectedVille" (keyup)="findVille($event)" class="form-control">
    </div>
  `
})
export class Modal_Meteo implements OnInit {
  @Output() output = new EventEmitter();
  selectedVille: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(`/apipollon/modules/${Config.SERIAL_NUMBER}/Météo`)
      .subscribe((res) => {
        this.output.next(res);
        this.selectedVille = res[0].value1;
      });
  }

  findVille(e): void {
    this.output.next(e.target.value);
  }

}


