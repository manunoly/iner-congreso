import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {
  rate: number = 5;

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log(this.viewCtrl.data.conferenceID);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
