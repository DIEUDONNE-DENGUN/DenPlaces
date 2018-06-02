import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public browserTab:BrowserTab,public iab:InAppBrowser) {

  }

   /*
  @Author:Dieudonne Dengun
  @Date:26/03/2018
  @Description:Show author's social media page in a browser
*/
 showAuthorSocialMediaPage(url){

  //open url from the browser's service
    
  this.browserTab.isAvailable()
  .then((isAvailable: boolean) => {

    //check if browsertab is supported or available for the device
    if (isAvailable) {
      
      this.browserTab.openUrl(url).then(success => {

        if (success) {
          //this means the browser was successfully open
        }
      });

    } else {

      // open URL with InAppBrowser instead since browsertab not available
      
      this.iab.create(url, "_system", "location=true");


    }

  });
}
}
