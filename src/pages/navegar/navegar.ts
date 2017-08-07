import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-navegar",
  templateUrl: "navegar.html"
})
export class NavegarPage {
  HomePage: any = "HomePage";
  ConferencePage: any = "ConferencePage";
  SpeakerPage: any = "SpeakerPage";
  AboutPage: any = "AboutPage";
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myIndex = navParams.data.tabIndex || 0;
  }
}
