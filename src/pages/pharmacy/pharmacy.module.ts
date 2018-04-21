import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PharmacyPage } from './pharmacy';

@NgModule({
  declarations: [
    PharmacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PharmacyPage),
  ],
})
export class PharmacyPageModule {}
