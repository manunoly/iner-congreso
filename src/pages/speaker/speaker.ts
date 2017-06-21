import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormControl } from "@angular/forms";

import { SpeakerDeatailPage } from "./../speaker-deatail/speaker-deatail";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { DataService } from "./../service/data.service";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: "page-speaker",
  templateUrl: "speaker.html"
})
export class SpeakerPage {
  speakers: any;
  speaker: any;
  searchTerm: string = "";
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService
  ) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.setFilteredSpeakers();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredSpeakers();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  addSpeaker() {
    this.dataS.addSpeaker();
  }

  goToSpeakerDetail(speakerID: any) {
    this.navCtrl.push(SpeakerDeatailPage, {
      speaker: speakerID
    });
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }

  filterSpeaker(speaker) {
    this.speaker = this.dataS.filterSpeaker(speaker);
    // this.dataS.filterSpeaker("-KmgYzhT7U3imA_veDra").subscribe((data: JSON) => {
    //   this.speaker = JSON.stringify(data[0]);
    // });
  }

  setFilteredSpeakers() {
    this.speakers = this.dataS.filterSpeakers(this.searchTerm);
  }
}
