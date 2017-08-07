import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageSpeakerPage } from './manage-speaker';

@NgModule({
  declarations: [
    ManageSpeakerPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageSpeakerPage),
  ],
})
export class ManageSpeakerPageModule {}
