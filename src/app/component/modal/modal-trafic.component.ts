import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-modal-trafic',
    template: `
    <div><h4>Selectionner les paramètre du trafic routier : </h4>
      <div class="w100">
        <mat-icon id="DRIVING"
                  [style.opacity]="selectedTravelMode === 'DRIVING' ? '1' : '0.6'"
                  [color]="selectedTravelMode === 'DRIVING' ? 'primary' : ''"
                  style="cursor: pointer"
                  (click)="onSelectedTravelMode($event)">directions_car</mat-icon>
        <mat-icon id="WALKING"
                  [style.opacity]="selectedTravelMode === 'WALKING' ? '1' : '0.6'"
                  [color]="selectedTravelMode === 'WALKING' ? 'primary' : ''"
                  style="cursor: pointer"
                  (click)="onSelectedTravelMode($event)">directions_walk</mat-icon>
        <mat-icon id="BICYCLING"
                  [style.opacity]="selectedTravelMode === 'BICYCLING' ? '1' : '0.6'"
                  [color]="selectedTravelMode === 'BICYCLING' ? 'primary' : ''"
                  style="cursor: pointer"
                  (click)="onSelectedTravelMode($event)">directions_bike</mat-icon>
        <mat-icon id="TRASMIT"
                  [style.opacity]="selectedTravelMode === 'TRASMIT' ? '1' : '0.6'"
                  [color]="selectedTravelMode === 'TRASMIT' ? 'primary' : ''"
                  style="cursor: pointer"
                  (click)="onSelectedTravelMode($event)">directions_subway</mat-icon>
      </div>

      <label for="zoom"> Zoom : </label>
      <select [(ngModel)]="zoom" class="form-control" id="zoom">
        <option *ngFor="let i of array" [ngValue]="i">{{i}}</option>
      </select>

      <label for="origin"> Origin : </label>
      <input type="text" id="origin" [(ngModel)]="origin" class="form-control" (keyup)="keyUpVille">

      <label for="destination"> Destination : </label>
      <input type="text" id="destination" [(ngModel)]="destination" class="form-control" (keyup)="keyUpVille()">
    </div>
  `
})
export class ModalTraficComponent implements OnInit {

    @Output() output = new EventEmitter();
    private selectedTravelMode: string;
    private origin = '';
    private destination = '';
    private zoom = 0;
    private array = Array.from(Array(21).keys());

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.loadConfig();
    }

    onSelectedTravelMode(e) {
        this.selectedTravelMode = e.target.id;
    }

    loadConfig() {
        this.http.get(`/modules/${environment.serialNumber}/Trafic routier`)
            .subscribe((res) => {
                const data = JSON.parse(res[0].value1.toString());
                this.selectedTravelMode = data.travelMode;
                this.origin = data.origin;
                this.destination = data.destination;
                this.zoom = data.zoom;
                this.output.next(res);
            });
    }

    keyUpVille() {
        if (this.origin !== '' && this.destination !== '') {
            const value = {
                origin: this.origin,
                destination: this.destination,
                travel_mode: this.selectedTravelMode,
                zoom: 17
            };
            this.output.next(JSON.stringify(value));
        }
    }

}
