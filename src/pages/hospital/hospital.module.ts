import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalPage } from './hospital';

@NgModule({
  declarations: [
    HospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalPage),
  ],
})
export class HospitalPageModule {}
