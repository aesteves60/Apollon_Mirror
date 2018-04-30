import {Component, OnDestroy, OnInit} from '@angular/core';
import {RadioService}                 from '../../../service/radio.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit, OnDestroy {

  icons : string = 'volume_up';

  constructor( private radioService : RadioService) { }

  ngOnInit() {
    this.radioService.StartPlay();
    //setTimeout(()=> this.radioService.setMuted(true), 5000)
  }

  ngOnDestroy(){
    this.radioService.StopPlay();
  }

  Mute(){
    this.icons = 'volume_off';
    this.radioService.setMuted(true);
  }

  UpVolume(){
    console.log(this.radioService.getVolume());
    this.radioService.setVolume(this.radioService.getVolume() + 0.1);
    this.setIcons(this.radioService.getVolume());
  }

  DownVolume(){
    console.log(this.radioService.getVolume());
    this.radioService.setVolume(this.radioService.getVolume() - 0.1);
    this.setIcons(this.radioService.getVolume());
  }

  setIcons(_volume){
    if(_volume < 0.5 ){
      this.icons = 'volume_down'
    } else {
      this.icons = 'volume_up'
    }
  }

}
