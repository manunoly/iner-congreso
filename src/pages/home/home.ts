import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AuthService } from "./../service/auth.service";
import { DataService } from './../service/data.service';

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
  ) {
    this.user = authS.getUser();
    // this.dataS.loadData();
    this.user.subscribe((data: Object) => {
      if (data != null) {
        this.displayName = data["email"].split("@")[0];
        // this.name = user['displayName'];
      } else this.displayName = "Visitante";
    });
  }
  signInWithGoogle() {
    this.authS.loginGoogle();
  }
  signOut(){
    this.authS.logout();
  }
}
