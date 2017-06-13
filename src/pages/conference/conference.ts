import { AboutPage } from "./../about/about";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { DataService } from "./../service/data.service";

@Component({
  selector: "page-conference",
  templateUrl: "conference.html"
})
export class ConferencePage {
  speakers = [];
  conferences: any;
  conferencesData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService
  ) {
    this.conferences = this.dataS.getConferences();
  }

  addConf() {
    this.dataS.addConference();
  }

  addSpeaker(){
    this.dataS.addSpeaker();
  }

  itemTapped(event, item) {
    this.navCtrl.push(AboutPage, {
      item: item
    });
  }
}
