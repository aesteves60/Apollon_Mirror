import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeteoService } from './meteo.service';
import { JourMeteo } from './jourMeteo';

@Component({
    selector: 'app-meteo',
    templateUrl: './meteo.component.html',
    styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

    tabMeteo: JourMeteo[] = [];

    constructor(private http: HttpClient, private meteoService: MeteoService) { }

    ngOnInit() {
        this.meteoService.get().subscribe(res => this.tabMeteo = res);
    }
}
