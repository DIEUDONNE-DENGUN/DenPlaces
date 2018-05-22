import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionListernerProvider } from '../../providers/connection-listerner/connection-listerner';
import { LocationHandlerProvider } from '../../providers/location-handler/location-handler';
import { SocialSharing } from '@ionic-native/social-sharing';


declare var google;
@IonicPage()
@Component({
  selector: 'page-place-details',
  templateUrl: 'place-details.html',
})
export class PlaceDetailsPage {
 
  @ViewChild('contentMap') contentMapElement: ElementRef;
  @ViewChild('map') mapElement: ElementRef;
  map_initialised:boolean=false;
  tab1 ='PlaceDirectionPage'
  apiKey: string = "AIzaSyAoDJ4s8Sf-IdZrNNK58PTeTpmSr7KYAjw"; //API KEY
  map:any;
  comtent_map:any;
  rating: any; //hold the rating for the selected place
  place: any; //hold he selected place object
  show_place_photos: boolean = false; //determine if the place photos sliders be shown or not
  show_place_map: boolean = false; //determine if the current place location be displayed on map 
  place_photos: any;
  constructor(public navCtrl: NavController,public social_sharing: SocialSharing,public location_handler:LocationHandlerProvider,public navParams: NavParams, public connectionListerner:ConnectionListernerProvider) {

    let place = navParams.get('place');

    //check if the details were gotten
    if (place) {

      this.place = place;
      this.rating = place.rating;

      
      let place_photos = place.place_photos;
      if (place.place_photos) {

         if(place_photos.length > 0 ){
        //show the photos slider and hide the map at the header section
        this.show_place_photos = true;
        this.place_photos = [];
        for (let i = 0; i < place_photos.length; i++) {

          let image = place.place_photos[i].getUrl({
            maxHeight: 250,
            maxWeight: 1000
          });

          let photo = {
            link: image
          }
          this.place_photos.push(photo);
        }

      }
      } else {

        //show the map instead since there are photos to display
        this.show_place_map = true;
      }
    }

  }

  ionViewDidLoad() {
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
            this.renderMap();
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
      
        this.renderMap() ;
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
          this.renderMap();
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
   @Description:Render place on map

*/
  renderMap(){
    
    let latLng = new google.maps.LatLng(this.place.latitude, this.place.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 16,
      zoomControl: true,
      fullscreenControl: false,
      gestureHandling: 'none',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let place_lagLng={
      lat: this.place.latitude,
      lng:this.place.longitude
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.comtent_map=new google.maps.Map(this.contentMapElement.nativeElement, mapOptions);

    let map_marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place_lagLng,
      label:{
        text:"C",
        color:"white",
      },
      icon:{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'Blue',
        fillOpacity: .6,
        scale: 20,
        strokeColor: 'white',
        strokeWeight: .5
}
    }); 

    let content_map_marker = new google.maps.Marker({
      map: this.comtent_map,
      animation: google.maps.Animation.BOUNCE,
      position: place_lagLng,
      label:{
        text:"C",
        color:"white",
      },
  
    }); 
  }

  /*

  */
 savePlace(place:any){
    
 }
 /*
   @Description: Save a place on local storage as favorite
 */
  sharePlace(place:any){

    let title = place.place_name;
    let url = place.place_map_url;
    let description = place.place_address;
    let news_default_image =place.place_url;
    let content = description.concat(" \n\n Shared from DenPlaces App !");

    this.location_handler.showActionSheeet([
      {


        text: 'Share on Facebook',
        icon: 'logo-facebook',
        handler: () => {

          this.social_sharing.shareViaFacebook(content, news_default_image, url)
        }
      },
      {
        text: 'Share on Whatsapp',
        icon: 'logo-whatsapp',
        handler: () => {
          this.social_sharing.shareViaWhatsApp(content, news_default_image, url);
        }
      },
      {
        text: 'Share on Twitter',
        icon: 'logo-twitter',
        handler: () => {

          this.social_sharing.shareViaTwitter(content, news_default_image, url);
        }
      },
      {
        text: "Share News' Link",
        icon: 'share',
        handler: () => {

          //share the news generally through any sharing appliactions which is supported
          this.social_sharing.share(content, title, null, url);
        }
      },
    ]);
 }

 /*
  @Description:Show direction for the place
 */
showDirection(place:any){

   this.navCtrl.push('PlaceDirectionPage',{direction:place});
}
}
