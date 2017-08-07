import { Component } from "@angular/core";
import {  IonicPage,NavController, NavParams, PopoverController } from "ionic-angular";

import { DataProvider } from '../../providers/data';
import { SpeakerDetailPage } from "./../speaker-detail/speaker-detail";
import { RatePage } from "../rate/rate";
@IonicPage()
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
    private dataS: DataProvider,
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

  addFavorite(conferenceID) {
    this.dataS.addFavorite(conferenceID);
  }

  isFavorite(conferenceID) {
    return this.dataS.isFavoriteConference(conferenceID);
  }

  removeFavorite(conferenceID) {
    this.dataS.removeFavorite(conferenceID);
    // console.log(conferenceID);
  }

  goToSpeakerDetail(speakerID: any) {
    this.navCtrl.push(SpeakerDetailPage, {
      speaker: speakerID
    });
  }
}

