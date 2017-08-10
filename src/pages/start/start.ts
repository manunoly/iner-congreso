import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('Develop by manunoly :)');
  }

    welcome() {
    this.navCtrl.setRoot('NavegarPage');
  }
}
