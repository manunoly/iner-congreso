import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RatePage } from './rate';

@NgModule({
  declarations: [
    RatePage,
  ],
  imports: [
    IonicPageModule.forChild(RatePage),
  ],
})
export class RatePageModule {}
