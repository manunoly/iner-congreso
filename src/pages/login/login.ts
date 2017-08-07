import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth";

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
    private authS: AuthProvider
  ) {}

  ionViewDidLoad() {}

  signInWithGoogle() {
    this.authS.loginGoogle();
  }

  signInWithFacebook() {
    this.authS.loginFacebook();
  }

  signInWithTwitter() {
    this.authS.loginTwitter();
  }
}
