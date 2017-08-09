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

@IonicPage({
  // name: 'inicio',
  // segment: 'inicio'
})
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
}
