import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerPage } from './speaker';

@NgModule({
  declarations: [
    SpeakerPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakerPage),
  ],
})
export class SpeakerPageModule {}
