import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: "page-rate",
  templateUrl: "rate.html"
})
export class RatePage {
  rate: number = 5;

  constructor(public viewCtrl: ViewController, private dataS: DataProvider) {}

  ionViewDidLoad() {}

  close() {
    this.viewCtrl.dismiss().catch(() => {});
  }

  rateConference() {
    this.dataS.rateConference(this.viewCtrl.data.conferenceID, this.rate);
    this.viewCtrl.dismiss().catch(() => {});
  }
}

