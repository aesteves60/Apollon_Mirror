import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RadioService, Radio } from '../../modules/radio/radio.service';

@Component({
    selector: 'app-modal-radio',
    template: `
    <div><h4>Selectionner une Radio : </h4>
      <select id="radios" class="form-control"  (change)="onChange($event.target.value)" [ngModel]="selectedRadio.name">
        <option *ngFor="let radio of radios">
          {{radio.name}}
        </option>
      </select>
    </div>
    `
})
export class ModalRadioComponent implements OnInit {

    @Output() output = new EventEmitter();
    selectedRadio: Radio;
    radios: Array<Radio>;

    constructor(private http: HttpClient, private radioService: RadioService) {
        this.selectedRadio = { id: 1, name: 'Skyrock', src: 'http://www.skyrock.fm/stream.php/tunein16_128mp3.mp3' }
    }

    ngOnInit() {
        this.radioService.getRadios().subscribe((result) => {
            this.radios = <Radio[]>result;
            this.radioService.getRadioConfig().subscribe(res => {
                this.selectedRadio = this.radios.find(r => res[0].value1 === r.src);
                this.output.next(this.selectedRadio.src);
            });
        });

    }

    onChange(e) {
        this.selectedRadio = this.radios.find(res => res.name === e);
        this.output.next(this.selectedRadio.src);
    }
}
