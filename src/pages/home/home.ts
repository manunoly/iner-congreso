import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AuthService } from "./../service/auth.service";
import { DataService } from "./../service/data.service";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  displayName = "Visitante";
  picture = "./../../assets/icon/favicon.ico";
  user: any;

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
    this.dataS.loadData();
    this.authS.isAdmin();
  }
  signInWithGoogle() {
    this.authS.loginGoogle();
  }

  signInWithFacebook() {
    this.authS.loginGoogle();
  }

  signInWithTwitter() {
    this.authS.loginGoogle();
  }
  signOut() {
    this.authS.logout();
  }
}
