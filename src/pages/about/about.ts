import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
 @ViewChild("slides") slides: Slides;
  showSkip = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

}
