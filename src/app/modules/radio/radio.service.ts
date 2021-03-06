
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const serialNumber = environment.serialNumber;

export interface Radio {
    id: number;
    name: string;
    src: string;
}

@Injectable()
export class RadioService {

    private audio: any;

    constructor(private http: HttpClient) {
        this.audio = new Audio();
        this.getRadioConfig().subscribe(res => this.audio.src = res[0].value1);
    }

    getRadioConfig(): Observable<any> {
        return this.http.get<string>(`/modules/${serialNumber}/Radio`).pipe(
            map(res => res));
    }

    getRadios(): Observable<Radio[]> {
        return this.http.get<Radio[]>('/radios').pipe(
            map((res) => res));
    }

    startPlay(): void {
        if (this.audio.paused) {
            this.audio.load();
            this.audio.play();
        }
    }

    stopPlay(): void {
        if (this.audio.played) {
            this.audio.pause();
        }
    }

    getVolume(): number {
        return this.audio.volume;
    }

    setVolume(value: number) {
        if ((value >= 0) && (value <= 1)) {
            this.audio.volume = value.toFixed(2);
        }
    }

    getMute() {
        return this.audio.muted;
    }

    setMuted(value: boolean) {
        this.audio.muted = value;
    }
}
