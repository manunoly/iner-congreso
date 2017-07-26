import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { DataService } from "./../service/data.service";

@Component({
  selector: "page-rate",
  templateUrl: "rate.html"
})
export class RatePage {
  rate: number = 5;

  constructor(public viewCtrl: ViewController, private dataS: DataService) {}

  ionViewDidLoad() {}

  close() {
    this.viewCtrl.dismiss();
  }

  rateConference() {
    this.dataS.rateConference(this.viewCtrl.data.conferenceID, this.rate);
    this.viewCtrl.dismiss();
  }
}
