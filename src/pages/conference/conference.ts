import { AboutPage } from "./../about/about";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import * as firebase from "firebase/app";

@Component({
  selector: "page-conference",
  templateUrl: "conference.html"
})
export class ConferencePage {
  speakers = [];
  conferences = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afDB.list("/data").subscribe((data: Object) => {
      let conferences = data[0];
      this.conferences = [];
      for (let i in conferences) {
        console.log(conferences[i]);
        console.log(i);
        this.conferences.push(conferences[i]);
      }
      let speakers = data[1];
      for (let i in speakers) {
        this.speakers.push(speakers[i]);
      }
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(AboutPage, {
      item: item
    });
  }
}
