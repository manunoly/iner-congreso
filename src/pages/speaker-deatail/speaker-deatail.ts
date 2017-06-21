import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { DataService } from "./../service/data.service";

@Component({
  selector: "page-speaker-deatail",
  templateUrl: "speaker-deatail.html"
})
export class SpeakerDeatailPage {
  speaker: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService
  ) {}

  ionViewDidLoad() {
    let speakerID = this.navParams.data.speaker;
    this.speaker = this.dataS.filterSpeaker(speakerID);
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }
}
