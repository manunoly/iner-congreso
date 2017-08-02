import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Slides } from "ionic-angular";
import { ConferencePage } from "./../conference/conference";

@Component({
  selector: "page-slide",
  templateUrl: "slide.html"
})
export class SlidePage {
  @ViewChild("slides") slides: Slides;
  showSkip = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

/*   ionViewDidLoad() {
    console.log("ionViewDidLoad SlidePage");
  } */

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  goToConferences() {
    this.navCtrl.push(ConferencePage);
  }
}
