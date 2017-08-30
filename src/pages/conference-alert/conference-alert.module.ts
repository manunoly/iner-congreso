import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferenceAlertPage } from './conference-alert';

@NgModule({
  declarations: [
    ConferenceAlertPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferenceAlertPage),
  ],
})
export class ConferenceAlertPageModule {}
