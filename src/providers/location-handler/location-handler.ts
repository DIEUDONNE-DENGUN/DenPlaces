import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Injectable()
export class LocationHandlerProvider {

  data: any;
  public loading: any;

  constructor(public http: HttpClient, public actionSheetCtrl: ActionSheetController,public location:LocationAccuracy,private alert: AlertController, private toast: ToastController, private loader: LoadingController) {


  }


  /*
     General Utility functions to be
  */

  /*
  @Author: Dieudonne Dengun
  @Date: 12/04/2017
  @Description: Show  and close loading screen to a component

 */
  showLoader(message: string) {

    this.loading = this.loader.create({
      content: message
    });

    this.loading.present();
  }

  /*
   @Description: Close alert dialog
  */
  closeLoader() {

    this.loading.dismiss();
  }

  /*
   @Author: Dieudonne Dengun
   @Date: 12/04/2017
   @Description: Show Toast message to the bottom of the screen
   @param : $message, $position //top, bottom and middle
   */

  showToastMessage(message: string, position: string = "bottom", duration: number = 4000, class_name: string = "toast-default") {

    let toast_message = this.toast.create({
      message: message,
      duration: duration,
      position: position,
      // dismissOnPageChange:true,
      // showCloseButton:true,
      // cssClass:class_name,

    });

    toast_message.present();
  }

  /*
   @Author: Dieudonne Dengun
   @Date: 12/04/2017
   @Description: Show Toast message to the bottom of the screen
   @param : $message
  */
  showSimpleAlertDialog(title: string = "", msg: string = "") {

    let alert = this.alert.create({
      title: title,
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  /*
    @AUthor:Dieudonne Dengun
    @Date:07/05/0218
    @Description:prompt and enable user to enable location service

  */
 enableLocationService(): boolean{
  let enabled=false;
  let alert = this.alert.create({
    title: 'To continue, please you will need to turn on your device location to enable Location Service',
    message: '',
    buttons: [
      // {
      //   text: 'Disagree',
      //   role: 'cancel',
      //   handler: () => {

      //   }
      // },
      {
        text: 'Turn On Now',
        handler: () => {

          //show loader
          this.showLoader('Enabling location service, please wait...');
          this.location.canRequest().then((canRequest: boolean) => {

            if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.location.request(this.location.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                () => {
                  console.log('Request successful');
                  enabled=true;
                  this.closeLoader();
                  return enabled;
              
              },
                (error) =>{ 
                  console.log('Error requesting location permissions', error);
                
                  
                }
              );
            }
          
          });
          
        }
 }
],
      });

      alert.present();
      
      return enabled;
    }     
  /*
    @Description:Filter an array of nearby places in order of closeness to the user current location
  */
  calculateNearbyPlacesByApplyHaversine(locations:any, usersLocation: any): Array<Object> {
    // let usersLocation = {
    //   lat: 40.713744, 
    //   lng: -74.009056
    // };

    let locations_object: any = locations;
    console.log(locations[0]);

    // locations_object.forEach(function (location) {
    //     console.log(location);
    // });
    for (var i = 0; i < locations_object.length; i++) {

      console.log("dengun");
      let placeLocation = {
        lat: locations_object[i].location.latitude,
        lng: locations_object[i].location.longitude
      };

      let distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'miles'
      ).toFixed(2);

      // location.distance 
      console.log(distance);
    }
    // locations.map((location) => {

    // let placeLocation = {
    //   lat: location.latitude,
    //   lng: location.longitude
    // };

    // let distance = this.getDistanceBetweenPoints(
    //     usersLocation,
    //     placeLocation,
    //     'miles'
    //   ).toFixed(2);

    //  // location.distance 
    //  console.log(distance);
    // });


    return locations_object;
  }

  /*
     @Description:Calculate the distance between two points using latitudes and longitudes
  */
  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }


/*
 @Author:Dieudonne Dengun
 @Date:21/05/2018
 @Description:Display actionsheet
*/
showActionSheeet(buttons: Array<any>) {
  buttons.push({
      icon:'close',
      text: 'Cancel',
      role: 'cancel',
  });

let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
  });

actionSheet.present();
}
}
