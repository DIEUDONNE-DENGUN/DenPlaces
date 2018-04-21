import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusStationPage } from './bus-station';

@NgModule({
  declarations: [
    BusStationPage,
  ],
  imports: [
    IonicPageModule.forChild(BusStationPage),
  ],
})
export class BusStationPageModule {}
