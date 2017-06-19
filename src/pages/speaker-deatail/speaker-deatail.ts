import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  ) {
  }

  ionViewDidLoad() {
    let speakerD = this.navParams.data.speaker;
    
    console.log("ionViewDidLoad SpeakerDeatailPage");

    this.speaker = this.dataS.filterSpeaker(speakerD);
  }
}
