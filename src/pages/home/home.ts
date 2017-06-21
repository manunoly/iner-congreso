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
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authS: AuthService,
    private dataS: DataService
  ) {}
  ionViewDidLoad() {
    this.user = this.authS.getUser();
    this.user.subscribe((data: Object) => {
      if (data != null) {
        // this.displayName = data["email"].split("@")[0];
        this.displayName = data["displayName"];
      } else this.displayName = "Visitante";
    });
    this.dataS.loadData();
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
