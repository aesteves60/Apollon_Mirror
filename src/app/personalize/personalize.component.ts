import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {
  private elements;

  public ItemMirrorUpLeft     = [];
  public ItemMirrorUpRight    = [];
  public ItemMirrorLeft       = [];
  public ItemMirrorRight      = [];
  public ItemMirrorDownRight  = [];
  public ItemMirrorDown1      = [];
  public ItemMirrorDown2      = [];
  public ItemMirrorDownLeft   = [];
      
  constructor(private dragula: DragulaService, private http: HttpClient) { 
    this.getElements(http);

    var i = 0;
    dragula.drop.subscribe((value) => {

      //id de la div qui a receptionné le drop
      console.log(value[2].children[1].classList[0]);
      for (i = 0 ; i<value[2].childNodes.length ; i++) {

        //console.log(value[2].childNodes[i]);
        if(value[2].childNodes[i].innerText == 'Vide') 
        {
          //console.log(value[2].childNodes[i].innerText);
          value[2].childNodes[i].value = '';
        }
      }

      switch(value[2].id) { 
        case 'MirrorUpLeft' : {
          this.ItemMirrorUpLeft[0] = value[1].innerText;
        }  
      }
    });
  }

	ngOnInit() {

  }
  private onDrag(args) {
    let [e, el] = args;
    // do something
  }
  private onDrop(args: any): void {
      //on regarde le tableau et on le vide et le rempli
      
  }

  public getElements(http : HttpClient){
    this.http.get('https://restcountries.eu/rest/v2/region/europe')
            .subscribe(data => {
                this.elements = data;
                console.log(this.elements);
            }, 
            err => {
                console.log('Something went wrong!')
            });

  }
}
