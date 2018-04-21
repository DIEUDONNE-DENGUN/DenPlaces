import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NightClubPage } from './night-club';

@NgModule({
  declarations: [
    NightClubPage,
  ],
  imports: [
    IonicPageModule.forChild(NightClubPage),
  ],
})
export class NightClubPageModule {}
