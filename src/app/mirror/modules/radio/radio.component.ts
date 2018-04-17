import {Component, OnDestroy, OnInit} from '@angular/core';
import {RadioService} from './radio.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit, OnDestroy {

  constructor( private radioService : RadioService) { }

  ngOnInit() {
    this.radioService.StartPlay();
    //setTimeout(()=> this.radioService.setMuted(true), 5000)
  }

  ngOnDestroy(){
    this.radioService.StopPlay();
  }
}
