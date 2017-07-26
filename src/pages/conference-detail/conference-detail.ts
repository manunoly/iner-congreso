import { Component } from "@angular/core";
import { NavController, NavParams, PopoverController } from "ionic-angular";

import { DataService } from "./../service/data.service";
import { SpeakerDetailPage } from "./../speaker-detail/speaker-detail";
import { RatePage } from "../rate/rate";
@Component({
  selector: "page-conference-detail",
  templateUrl: "conference-detail.html"
})
export class ConferenceDetailPage {
  confence: any;
  conferenceID: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService,
    public popoverCtrl: PopoverController
  ) {}

  ionViewDidLoad() {
    this.conferenceID = this.navParams.data.conferenceID;
    this.confence = this.dataS.filterConference(this.conferenceID);
  }

  rateConference(myEvent) {
    let popover = this.popoverCtrl.create(RatePage, {
      conferenceID: this.conferenceID
    });
    popover.present({
      ev: myEvent
    });
  }

  goToSpeakerDetail(speakerID: any) {
    this.navCtrl.push(SpeakerDetailPage, {
      speaker: speakerID
    });
  }
}
