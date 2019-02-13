import { Component, OnDestroy, OnInit } from '@angular/core';
import { RadioService } from './radio.service';
import { SocketService } from '../../core/socket.service';

@Component ({
  selector: 'app-radio', templateUrl: './radio.component.html', styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit, OnDestroy {

  icons = 'volume_up';

  constructor(private socketService: SocketService, private radioService: RadioService) {
  }

  ngOnInit() {
    this.radioService.startPlay();
    this.radioService.setMuted(false);

    this.socketService.onUpOrDownVolume ().subscribe ((res) => {
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

    this.socketService.onSetVolume ().subscribe ((res) => this.radioService.setVolume (res['volume']));
  }

  ngOnDestroy() {
    this.radioService.stopPlay ();
  }

  mute() {
    this.radioService.getMute() ? this.setIcons (this.radioService.getVolume ()) : this.icons = 'volume_off';
    this.radioService.setMuted (!this.radioService.getMute());
  }

  upVolume() {
    this.radioService.setVolume (this.radioService.getVolume () + 0.1);
    this.setIcons (this.radioService.getVolume ());
  }

  downVolume() {
    this.radioService.setVolume (this.radioService.getVolume () - 0.1);
    this.setIcons (this.radioService.getVolume ());
  }

  setIcons(_volume) {
    switch (_volume ) {
      case (_volume < 0.5) : this.icons = 'volume_down'; break;
      case (_volume > 0.5) : this.icons = 'volume_up'; break;
      case (_volume = 0) : this.icons = 'volume_mute'; break;
    }
  }
}
