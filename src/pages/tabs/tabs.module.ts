import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import {SharedModule} from "../../app/shared.module";
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    SharedModule,
    Ionic2RatingModule,
  ],
})
export class TabsPageModule {}
