import { Component } from "@angular/core";
import {
  IonicPage /* ,
  NavController,
  NavParams,
  MenuController */
} from "ionic-angular";
import { DataProvider } from './../../providers/data';

@IonicPage(
  {
    // name: 'inicio',
    // segment: 'inicio'
  }
)
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  small: boolean;
  constructor(private dataS: DataProvider)
  {}
  ionViewDidLoad(){
    this.small = this.dataS.isSmallDevice();
   }
}
