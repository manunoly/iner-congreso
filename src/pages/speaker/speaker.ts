import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormControl } from "@angular/forms";

import { SpeakerDeatailPage } from "./../speaker-deatail/speaker-deatail";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { ManageSpeakerPage } from "./../manage-speaker/manage-speaker";
import { DataService } from "./../service/data.service";
import { AuthService } from "./../service/auth.service";
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
  isAdmin = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService,
    private authS: AuthService
  ) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.setFilteredSpeakers();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredSpeakers();
    });
    this.authS.isAdmin2().subscribe(status => console.log(status[0]));

    // .subscribe(admin => {
    //   console.log(admin);
    //   if (admin) this.isAdmin = true;
    // });
  }

  onSearchInput() {
    this.searching = true;
  }

  goToManageSpeaker() {
    this.navCtrl.push(ManageSpeakerPage);
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
