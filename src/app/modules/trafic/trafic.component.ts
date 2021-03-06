import { Component, OnInit } from '@angular/core';
import { TraficService } from './trafic.service';


declare let google: any;
@Component({
    selector: 'app-trafic',
    templateUrl: './trafic.component.html',
    styleUrls: ['./trafic.component.css']
})
export class TraficComponent implements OnInit {

    private lat = 50.633333;
    private lng = 3.066667;
    private zoom = 17;
    private travelMode = ['DRIVING', 'WALKING', 'BICYCLING', 'TRASMIT'];
    public travelModeSelect = 'DRIVING';

    trafic = undefined;
    distance = '';
    duration = '';

    constructor(private traficService: TraficService) { }

    ngOnInit() {
        this.traficService.getConfig().subscribe((res) => {
            const response = JSON.parse(res.toString());
            this.zoom = response['zoom'];
            this.travelModeSelect = response['travel_mode'];

            this.getTrafic();
        })
    }

    getTrafic() {
        this.traficService.getTrafic()
            .subscribe(res => {
                this.trafic = res;
                this.distance = this.trafic.routes[0].legs[0].distance.text;
                this.duration = this.trafic.routes[0].legs[0].duration.text;
                this.InitGoogleMaps(this.trafic.routes[0].legs[0].start_location, this.trafic.routes[0].legs[0].end_location)
            });
    }

    InitGoogleMaps(start, end) {
        const directionsService = new google.maps.DirectionsService;
        const directionsDisplay = new google.maps.DirectionsRenderer;
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.zoom,
            center: { lat: this.lat, lng: this.lng },
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{ color: '#263c3f' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#6b9a76' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#38414e' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#212a37' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#9ca5b3' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#746855' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#1f2835' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#f3d19c' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{ color: '#2f3948' }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#17263c' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#515c6d' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#17263c' }]
                }
            ]
        });
        directionsDisplay.setMap(map);

        directionsService.route({
            origin: { lat: start.lat, lng: start.lng },
            destination: { lat: end.lat, lng: end.lng },
            optimizeWaypoints: true,
            travelMode: this.travelModeSelect,
            drivingOptions: {
                departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
                trafficModel: 'optimistic'
            }
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

}
