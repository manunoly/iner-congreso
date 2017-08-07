import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";

import { DataProvider } from "../../providers/data";
import { AuthProvider } from "../../providers/auth";
import { ManageSpeakerPage } from "./../manage-speaker/manage-speaker";
import { ManageConferencePage } from "./../manage-conference/manage-conference";
import { ManageTopicPage } from "../manage-topic/manage-topic";
import { ManageLocationPage } from "../manage-location/manage-location";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  displayName = "Visitante";
  picture = "../../assets/icon/favicon.ico";
  user: any;
  isAdmin: any;
  ManageSpeakerPage: ManageSpeakerPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private authS: AuthProvider,
    private dataS: DataProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.authS.getUser();
    this.user.subscribe((user: Object) => {
      if (user != null) {
        // this.displayName = user["email"].split("@")[0];
        this.displayName = user["displayName"];
        if (
          user["photoURL"] !=
          "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        )
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

  openMenu() {
    this.menuCtrl.open();
  }

  ngAfterViewInit() {
    !(function(d: any, s: any, id: any) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? "http" : "https";
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "twitter-wjs");
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

  goToManageConference() {
    this.navCtrl.push(ManageConferencePage);
  }

  goToManageLocation() {
    this.navCtrl.push(ManageLocationPage);
  }

  goToManageTopic() {
    this.navCtrl.push(ManageTopicPage);
  }
}
