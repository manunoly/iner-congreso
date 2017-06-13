import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { AuthService } from "./../service/auth.service";

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
    private authS: AuthService
  ) {
    this.user = authS.getUser();
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
