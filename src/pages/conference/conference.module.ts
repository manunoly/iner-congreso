import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferencePage } from './conference';

@NgModule({
  declarations: [
    ConferencePage,
  ],
  imports: [
    IonicPageModule.forChild(ConferencePage),
  ],
})
export class ConferencePageModule {}
