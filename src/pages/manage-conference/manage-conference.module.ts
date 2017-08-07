import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageConferencePage } from './manage-conference';

@NgModule({
  declarations: [
    ManageConferencePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageConferencePage),
  ],
})
export class ManageConferencePageModule {}
