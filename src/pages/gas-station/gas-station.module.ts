import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GasStationPage } from './gas-station';

@NgModule({
  declarations: [
    GasStationPage,
  ],
  imports: [
    IonicPageModule.forChild(GasStationPage),
  ],
})
export class GasStationPageModule {}
