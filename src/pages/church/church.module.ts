import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChurchPage } from './church';

@NgModule({
  declarations: [
    ChurchPage,
  ],
  imports: [
    IonicPageModule.forChild(ChurchPage),
  ],
})
export class ChurchPageModule {}
