import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { AuthProvider } from "./../../providers/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authS: AuthProvider,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {}

  signInWithGoogle() {
    this.authS
      .loginGoogle()
      .then(respon => {
        this.dismiss();
      })
      .catch(err => {
        console.log(err);
      });
  }

  signInWithFacebook() {
    this.authS
      .loginFacebook()
      .then(respon => {
        this.dismiss();
      })
      .catch(err => {
        console.log(err);
      });
  }

  signInWithTwitter() {
    this.authS
      .loginTwitter()
      .then(respon => {
        this.dismiss();
      })
      .catch(err => {
        console.log(err);
      });
  }

  dismiss() {
    this.viewCtrl.dismiss(undefined);
  }
}
