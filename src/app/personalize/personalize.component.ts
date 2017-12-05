 import { Component, OnInit } from '@angular/core';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {

	msg = '';

	items = [
	'Candlestick',
	'Dagger',
	'Revolver',
	'Rope',
	'Pipe',
	'Wrench'
	];

  public ItemMirrorUpLeft     = [];
  public ItemMirrorUpRight    = [];
  public ItemMirrorLeft       = [];
  public ItemMirrorRight      = [];
  public ItemMirrorDownRight  = [];
  public ItemMirrorDown1       = [];
  public ItemMirrorDown2       = [];
  public ItemMirrorDownLeft   = [];
      
  constructor(private dragula: DragulaService) { }

	ngOnInit() {
    this.dragula
      .drag
      .subscribe(value => {
        this.msg = `Dragging the ${ value[1].innerText }!`;
  	});

  	this.dragula
    	.drop
    	.subscribe(value => {
      	this.msg = `Dropped the ${ value[1].innerText }!`;

      setTimeout(() => {
        this.msg = '';
      }, 1000);
    });
  }


  private onDrop(args: any): void {
    let [e] = args;
    console.log(args);
    console.log(e);
    console.log(e.innerText);

    let s: any = [];
    s = e.innerText.split(",");
    console.log(s[1]);
    // console.log([e].childer);
    
    //this.addClass(e, 'ex-moved');
  }
}
