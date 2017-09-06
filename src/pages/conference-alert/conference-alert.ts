import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { AuthProvider } from "./../../providers/auth";
import { DataProvider } from "./../../providers/data";

@IonicPage()
@Component({
  selector: "page-conference-alert",
  templateUrl: "conference-alert.html"
})
export class ConferenceAlertPage {
  conferences: any;
  isUserAuthenticated: boolean;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authS: AuthProvider,
    private dataS: DataProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.isUserAuthenticated = true;
        this.conferences = this.dataS.filterConferences(
          undefined,
          undefined,
          undefined,
          undefined
        );
      } else {
        this.isUserAuthenticated = false;
        this.navCtrl.push("start");
        this.user.unsubscribe();
      }
    });
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }
}
