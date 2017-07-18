import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AuthService } from "./../service/auth.service";
import { DataService } from "./../service/data.service";
import { ManageSpeakerPage } from './../manage-speaker/manage-speaker';
import { ManageConferencePage } from './../manage-conference/manage-conference';
import { ManageTopicPage } from '../manage-topic/manage-topic';
import { ManageLocationPage } from '../manage-location/manage-location';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  displayName = "Visitante";
  picture = "../../assets/icon/favicon.ico";
  user: any;
  isAdmin: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authS: AuthService,
    private dataS: DataService
  ) {}

  ionViewDidLoad() {
    this.user = this.authS.getUser();
    this.user.subscribe((user: Object) => {
      if (user != null) {
        // this.displayName = user["email"].split("@")[0];
        this.displayName = user["displayName"];
        this.picture = user["photoURL"];

      } else this.displayName = "Visitante";
    });
    this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    this.dataS.loadData();
  }
  signInWithGoogle() {
    this.authS.loginGoogle();
  }

  signInWithFacebook() {
    this.authS.loginFacebook();
  }

  signInWithTwitter() {
    this.authS.loginTwitter();
  }
  signOut() {
    this.authS.logout();
  }

  goToManageSpeaker() {
    this.navCtrl.push(ManageSpeakerPage);
  }

  goToManageConference(){
    this.navCtrl.push(ManageConferencePage);
  }

  goToManageLocation(){
    this.navCtrl.push(ManageLocationPage);
  }

  goToManageTopic(){
    this.navCtrl.push(ManageTopicPage);
  }
}
