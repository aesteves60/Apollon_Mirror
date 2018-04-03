import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


declare let google : any;
@Component({
  selector: 'app-trafic',
  templateUrl: './trafic.component.html',
  styleUrls: ['./trafic.component.css']
})
export class TraficComponent implements OnInit {

  public lat: Number = 50.633333;
  public lng: Number =  3.066667;
  public zoom: Number = 17;
  public travelMode = ['DRIVING', 'WALKING', 'BICYCLING', 'TRASMIT'];
  public travelModeSelect = 0;

  trafic = undefined;
  distance = '';
  duration = '';

  constructor( private http : HttpClient) { }

  ngOnInit() {
    this.getTrafic();
  }

  getTrafic() {
    this.http.get('/API/trafic')
      .subscribe(res => {
        this.trafic = res;
        this.distance = this.trafic.routes[0].legs[0].distance.text;
        this.duration = this.trafic.routes[0].legs[0].duration.text;
        this.InitGoogleMaps(this.trafic.routes[0].legs[0].start_location, this.trafic.routes[0].legs[0].end_location)
      });
  }

  InitGoogleMaps(start, end){
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: this.lat, lng: this.lng},
    });
    directionsDisplay.setMap(map);

    directionsService.route({
      origin: { lat: start.lat, lng: start.lng},
      destination: { lat: end.lat, lng: end.lng},
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
        trafficModel: 'optimistic'
      }
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        console.log(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}