import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavegarPage } from './navegar';

@NgModule({
  declarations: [
    NavegarPage,
  ],
  imports: [
    IonicPageModule.forChild(NavegarPage),
  ],
})
export class NavegarPageModule {}
