import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageLocationPage } from './manage-location';

@NgModule({
  declarations: [
    ManageLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageLocationPage),
  ],
})
export class ManageLocationPageModule {}
