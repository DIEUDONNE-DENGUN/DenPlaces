import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceDetailsPage } from './place-details';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    PlaceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceDetailsPage),
    Ionic2RatingModule 
  ],
})
export class PlaceDetailsPageModule {}
