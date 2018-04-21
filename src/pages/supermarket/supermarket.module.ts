import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupermarketPage } from './supermarket';

@NgModule({
  declarations: [
    SupermarketPage,
  ],
  imports: [
    IonicPageModule.forChild(SupermarketPage),
  ],
})
export class SupermarketPageModule {}
