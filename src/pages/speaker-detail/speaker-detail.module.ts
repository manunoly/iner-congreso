import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerDetailPage } from './speaker-detail';

@NgModule({
  declarations: [
    SpeakerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakerDetailPage),
  ],
})
export class SpeakerDetailPageModule {}
