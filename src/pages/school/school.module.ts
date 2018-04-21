import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolPage } from './school';

@NgModule({
  declarations: [
    SchoolPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolPage),
  ],
})
export class SchoolPageModule {}
