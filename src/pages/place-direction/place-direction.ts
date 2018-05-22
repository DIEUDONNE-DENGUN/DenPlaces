import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionListernerProvider } from '../../providers/connection-listerner/connection-listerner';
import { LocationHandlerProvider } from '../../providers/location-handler/location-handler';


declare var google;
@IonicPage()
@Component({
  selector: 'page-place-direction',
  templateUrl: 'place-direction.html',
})

export class PlaceDirectionPage {

 

  map_initialised:boolean=false;
  apiKey: string = "AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw"; //API KEY
  map:any;
  destination_name:string="";
  distance:string="";
  place_directions={
    place_origin:null,
    place_destination:null,
    place_travel_mode:"WALKING",
 }
 @ViewChild('map') mapDiv: ElementRef;
 @ViewChild('directionsPanel') directionsPanel: ElementRef;
  constructor(public location_handler:LocationHandlerProvider,public navCtrl: NavController, public navParams: NavParams, public connectionListerner:ConnectionListernerProvider) {
      
        let data=this.navParams.get('direction');
        if(data){
            
           this.place_directions.place_origin=data.current_location;
           this.place_directions.place_destination=data;
           this.destination_name=data.place_name;
           this.distance=data.place_distance;

         
        }
     
  }

  ionViewDidLoad() {
        //load map now
        this.loadGoogleMap();
  }

  /*
    @Author:Dieudonne Dengun
    @Date:12/05/2018
    @Description:Load map for 

  */
 loadGoogleMap(){

  this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");
      if (this.connectionListerner.isOnline()) {
 
        
          //Load the SDK
          window['mapInit'] = () => {
            this.startDestinationNavigation();
            this.enableMap();    
          }
        this.map_initialised=true;
        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(script);
      
      }
    }
    else {

      if (this.connectionListerner.isOnline()) {
      
        this.startDestinationNavigation() ;
        this.enableMap();
      }
      else {
       
        this.disableMap();
      }
    }
 }

 /*
    @Author:Dieudonne Dengun
    @Date:12/04/2018
    @Description:Disable the display map if there is no internet and alert user of network change
  */
 disableMap() {
    
  let title="Offline Status";
  let message="You are currently offline.Please connect to the internet to continue";
  this.location_handler.showSimpleAlertDialog(title,message);
}

/*
  @Author:Dieudonne Dengun
  @Date:12/04/2018
  @Description:Enable and render map if the user internet has been restored after reconnection
*/
enableMap() {
  
  this.location_handler.showToastMessage("You are currently online","bottom",3000);
}

/*
@Author:Dieudonne Dengun
@Date:12/04/2018
@Description:add network change listener to monitor user connection fluctuation
*/
addConnectivityListeners() {

  //determine of the user phone is connected to the internet
  let onOnline = () => {

    setTimeout(() => {
      if (typeof google == "undefined" || typeof google.maps == "undefined" ) {
     
           if(!this.map_initialised){
             //reintialised the map again on the dom
             this.loadGoogleMap();
           }
      } else {

        if (this.map_initialised) {
          this.startDestinationNavigation();
          this.enableMap();
        }

        
      }
    }, 2000);

  };

  //this means the user is offline, so disabled the map
  let onOffline = () => {
    this.disableMap();
  };

  //add online and offline network listeners to the dom to monitor network changes
  document.addEventListener('online', onOnline, false);
  document.addEventListener('offline', onOffline, false);

}


/*
 @Author:Dieudonne Dengun
 @Date: 12/05/2018
 @Description:start navigation routing
*/
  startDestinationNavigation(){
   
    //initialize map 
    let place_origin: any=this.place_directions.place_origin;
    let place_destination :any=this.place_directions.place_destination;
    
    
    let origin_latLng = new google.maps.LatLng(place_origin.lat, place_origin.lng);
    let destination_latLng = new google.maps.LatLng(place_destination.latitude, place_destination.longitude);
    
    //set origin and destination objects to be used by the marker service
    let origin_latlng={
      lat:place_origin.lat,
      lng:place_origin.lng
    }

    let destination_latlng={
      lat:place_destination.latitude,
      lng:place_destination.longitude
    }

    //map options
    let mapOptions = {
      center: origin_latLng,
      zoom: 15,
      zoomControl: false,
      fullscreenControl: false,
      gestureHandling: 'none',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     
    this.map = new google.maps.Map(this.mapDiv.nativeElement, mapOptions);

    //set and initialise directions api 

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    //display the nagivation on map
    directionsService.route({
        origin: origin_latLng,
        destination: destination_latLng,
        travelMode: google.maps.TravelMode[this.place_directions.place_travel_mode]
    },( (res, status) => {

        if(status == google.maps.DirectionsStatus.OK){
           
            directionsDisplay.setDirections(res);


            var _route = res.routes[0].legs[0]; 
		        //set markers for the origin and destination on the map
    let origin_marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: _route.start_location,
      label:{
        text:"C",
        color:"white",
      },
      icon:{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: .6,
        scale: 20,
        strokeColor: 'white',
        strokeWeight: .5
}
    });

    let destination_marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: _route.end_location,
      label:{
        text:"D",
        color:"white",
      },
      icon:{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .6,
        scale: 20,
        strokeColor: 'white',
        strokeWeight: .5
}
    }); 
        } else {
            console.warn(status);
        }

    }).bind(this));

    

  }
}
