import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-items_personalize',
  templateUrl: './items_personalize.component.html',
  styleUrls: ['./items_personalize.component.css']
})
export class ItemsPersonalizeComponent implements OnInit {

  items_personalize
  constructor(private http: HttpClient) { }

  ngOnInit() {
  	  this.getItems_Personalize();
  }

  public getItems_Personalize(){
    this.http.get('https://restcountries.eu/rest/v2/region/europe')
            .subscribe(data => {
                this.items_personalize = data;
                console.log(this.items_personalize);
            }, 
            err => {
                console.log('Something went wrong!')
            });

  }

}
