import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import { DataProvider } from './../../providers/data';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
 @ViewChild("slides") slides: Slides;
  showSkip = true;
  small: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataS: DataProvider) {
  }
  ionViewDidLoad(){
   this.small = this.dataS.isSmallDevice();
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }
  ngAfterViewInit() {
    !(function(d: any, s: any, id: any) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? "http" : "https";
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "twitter-wjs");
  }

}
