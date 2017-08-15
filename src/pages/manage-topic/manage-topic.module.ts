import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageTopicPage } from './manage-topic';

@NgModule({
  declarations: [
    ManageTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageTopicPage),
  ],
})
export class ManageTopicPageModule {}
