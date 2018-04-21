import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtmPage } from './atm';

@NgModule({
  declarations: [
    AtmPage,
  ],
  imports: [
    IonicPageModule.forChild(AtmPage),
  ],
})
export class AtmPageModule {}
