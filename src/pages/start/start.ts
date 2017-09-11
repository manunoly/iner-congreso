import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from "./../../providers/auth";

/**
 * Generated class for the StartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({name: 'start'})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController,
    private authS: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('Develop by manunoly :)');
  }

    welcome() {
    this.navCtrl.setRoot('NavegarPage');
  }

  signInWithGoogle() {
    this.authS.loginGoogle().then(respon => {
      if (respon)
        this.navCtrl.popToRoot();
      // this.navCtrl.push("NavegarPage");

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
