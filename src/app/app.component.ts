import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
// import { Nav } from 'ionic-angular/navigation/nav-interfaces';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  rootParams: any;

  menuItems: any[] = [
    {
      name: '',
      page: 'TabsPage',
      
    },
    {
      name: 'Favorite Locations',
      page: 'FavoritPlacePage',
     
    },
    {
      name: 'About',
      page: 'AboutPage',
      
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
   
    this.rootPage = this.menuItems[0].page;
    this.rootParams = this.menuItems[0].params;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#C2185B');
      splashScreen.hide();
    });
  }

  
  openPage(page) {
    this.nav.push(page.page);
    // this.nav.setRoot(page.page, page.params);
  }
}
