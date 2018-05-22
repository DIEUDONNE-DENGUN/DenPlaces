import { Component } from '@angular/core';
import { IonicPage,NavController} from 'ionic-angular';
import { ConnectionListernerProvider } from '../../providers/connection-listerner/connection-listerner';

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
  
  selected_place:any;
  rating:any=0;
  showFooter:boolean=true; //show and hide footer using the Fab Icon
  constructor(public connectionService:ConnectionListernerProvider, public navCtlr:NavController) {
     this.connectionService.selectedPlaceObserve$.subscribe(place=>{

       this.selected_place=place;

       if(this.selected_place)
       this.rating=this.selected_place.rating;
       //this.rating=4;
     })
  }


  /*
    @Author:Dieudonne Dengun
    @Date:03/05/2018
    @Description:Navigate to Place Details Page
  */
   showPlaceDetailsPage(place:any){
      
    this.navCtlr.push('PlaceDetailsPage',{place:place});

   }

   /*
    @Author:Dieudonne Dengun
    @Date:03/05/2018
    @Description:Navigate to Place Direction Page
  */
 showDirectionPage(place:any){
   
   this.navCtlr.push('PlaceDirectionPage',{direction:place});
    
}

/*
   @Description:Handle Fab Icon click
*/
   handleFabEvent(){

       this.showFooter=!this.showFooter;
   }
}
