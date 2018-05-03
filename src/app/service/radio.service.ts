import {Injectable}   from '@angular/core';
import {HttpClient}   from '@angular/common/http';
import {Config}       from '../../assets/config';
import { Observable } from "rxjs/Observable";


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

  getRadioConfig(): Observable<any> {
  const options = {
      params: {
        serial_number: Config.SERIAL_NUMBER,
        module: 'Radio'
      }
    };
    return this.http.get<string>('/API/get_config', options)
                    .map(res => res);
  }

  getRadios(): Observable<Radio[]>{
    return this.http.get<Radio[]>('/API/get_radios')
                    .map((res) => res);
  }

  StartPlay(): void {
    if (this.audio.paused) {
      this.audio.load();
      this.audio.play();
    }
  }

  StopPlay(): void {
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
