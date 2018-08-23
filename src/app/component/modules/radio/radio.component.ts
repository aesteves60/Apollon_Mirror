import { Component, OnDestroy, OnInit } from '@angular/core';
import { RadioService } from '../../../service/radio.service';
import { SocketService } from '../../../service/socket.service';

@Component ({
  selector: 'app-radio', templateUrl: './radio.component.html', styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit, OnDestroy {

  icons: string = 'volume_up';

  constructor(private socket$: SocketService, private radioService: RadioService) {
  }

  ngOnInit() {

    this.socket$.onUpOrDownVolume ().subscribe ((res) => {
      const volume = this.radioService.getVolume ();
      switch (res['value']) {
        case 'up'   :
          this.radioService.setVolume (volume + 0.2);
          break;
        case 'down' :
          this.radioService.setVolume (volume - 0.2);
          break;
        case 'mute' :
          this.radioService.setMuted (true);
          break;
        case 'play' :
          this.radioService.setMuted (false);
          break;
      }
      !this.radioService.getMute () ? this.setIcons (this.radioService.getVolume ()) : this.icons = 'volume_off';
    });

    this.socket$.onSetVolume ().subscribe ((res) => this.radioService.setVolume (res['volume']));
  }

  ngOnDestroy() {
    this.radioService.StopPlay ();
  }

  Mute() {
    this.radioService.getMute () ? this.setIcons (this.radioService.getVolume ()) : this.icons = 'volume_off';
    this.radioService.setMuted (!this.radioService.getMute ());
  }

  UpVolume() {
    this.radioService.setVolume (this.radioService.getVolume () + 0.1);
    this.setIcons (this.radioService.getVolume ());
  }

  DownVolume() {
    this.radioService.setVolume (this.radioService.getVolume () - 0.1);
    this.setIcons (this.radioService.getVolume ());
  }

  setIcons(_volume) {
    if (_volume < 0.5) {
      this.icons = 'volume_down';
    } else {
      this.icons = 'volume_up';
    }
  }

}
