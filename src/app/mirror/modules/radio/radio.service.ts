import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERIAL_NUMBER} from '../../../../assets/config';


export interface Radio {
  id: number,
  name: string,
  src: string
}

@Injectable()
export class RadioService {

  private audio: any;

  constructor(private http: HttpClient) {
    this.audio = new Audio();
    this.getRadioConfig().subscribe(res => this.audio.src = res);
  }

  getRadioConfig(){
    const options = {
      params: {
        serial_number: SERIAL_NUMBER,
        module: 'Radio'
      }
    };
    return this.http.get<string>('/API/get_config', options)
                    .map(res => res);
  }

  getRadios(){
    return this.http.get<Radio[]>('/API/get_radios')
                    .map((res) => res);
  }

  StartPlay() {
    if (this.audio.paused) {
      this.audio.load();
      this.audio.play();
    }
  }

  StopPlay() {
    if (this.audio.played) {
      this.audio.pause();
    }
  }

  getVolume(): number {
    return this.audio.volume;
  }

  setVolume(value: number) {
    console.log(value);
    if((value > 0) || (value < 1)) {
      this.audio.volume = value.toFixed(2);
    }
  }

  setMuted(value: boolean) {
    this.audio.muted = value;
  }
}
