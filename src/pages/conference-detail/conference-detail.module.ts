import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferenceDetailPage } from './conference-detail';

@NgModule({
  declarations: [
    ConferenceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferenceDetailPage),
  ],
  exports: [
    ConferenceDetailPage
  ]
})
export class ConferenceDetailPageModule {}
