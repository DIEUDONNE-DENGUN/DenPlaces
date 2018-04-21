import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectionListernerProvider } from '../connection-listerner/connection-listerner';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;
@Injectable()
export class GoogleMapHandlerProvider {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  place_service:any;

  apiKey: string="AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw";

  constructor(public connectivityService: ConnectionListernerProvider,public geolocation: Geolocation) {

  }


  /*
   @Description:Initialize and set neccessary map prerequisites
  */
  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }


  /*
   @Description: set up and load google map on the device with API details
  */
  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "mapView";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&libraries=places&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      }
      else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

      }

      this.addConnectivityListeners();

    });

  }

  /*
   @Description:Initial Google Maps once its set up has completed to display on screen
  */

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // let latLng = new google.maps.LatLng(40.713744, -74.009056);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

      });

    });

  }


  /*
   @Description:Disable the load map process when there is no internet by hiding the map
  */
  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  /*
   @Description:Enable the load map process when there is  internet by showing the map
  */
  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }


  /*
  @Author:Dieudonne Dengun
  @Date: 09/04/2018
  @Description: constantly listen for when the user comes back online, and when they do it will trigger the whole loading process

*/
  addConnectivityListeners(): void {

    document.addEventListener('online', () => {

      console.log("online");

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    }, false);

    document.addEventListener('offline', () => {

      console.log("offline");

      this.disableMap();

    }, false);

  }


  /*
   @Author:Dieudonne Dengun
   @Date: 10/04/2018
   @Description: Get nearby activities to  a user's current location
   @Param: @place types


  */
  getNearbyActivities(place_type:string  , user_current_location):void{
 
  let  request = {
    location: user_current_location,
    radius: '500',
    type: [place_type]
  };

  this.place_service = new google.maps.places.PlacesService(this.map);
  this.place_service.nearbySearch(request, this.handleResultsCallback);
}



handleResultsCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      this.addMarker(place);
    }
  }

  }


/*
  @Author:Dieudonne Dengun
  @Date: 09/04/2018
  @Description: add google marker for a search place on Google Map

*/

  addMarker(place): void {


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });

    this.markers.push(marker);

}

}
