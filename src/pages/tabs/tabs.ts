import { Component } from '@angular/core';
import { IonicPage,} from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  restaurant = "RestaurantsPage";
  supermarket = "SupermarketPage";
  hospital = "HospitalPage";
  pharmacy = "PharmacyPage";
  church="ChurchPage";
  school="SchoolPage";
  gas_station="GasStationPage";

  constructor() {

  }
}
