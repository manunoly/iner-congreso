import { Component } from "@angular/core";
import { IonicPage, NavController,Events, NavParams } from "ionic-angular";
import { AuthProvider } from "./../../providers/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authS: AuthProvider,
    private events: Events
  ) {}

  ionViewDidLoad() {}

  signInWithGoogle() {
    this.authS.loginGoogle().then(respon => {
      this.events.publish("login");
    /*   if (respon) {
        this.navCtrl.setRoot("NavegarPage");
        this.navCtrl.popToRoot();
      } */
    });
  }

  signInWithFacebook() {
    this.authS.loginFacebook().then(respon => {
      if (respon) this.navCtrl.push("NavegarPage");
    });
  }

  signInWithTwitter() {
    this.authS.loginTwitter().then(respon => {
      if (respon) this.navCtrl.push("NavegarPage");
    });
  }
}
