import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerDeatailPage } from './speaker-deatail';

@NgModule({
  declarations: [
    SpeakerDeatailPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakerDeatailPage),
  ],
  exports: [
    SpeakerDeatailPage
  ]
})
export class SpeakerDeatailPageModule {}
