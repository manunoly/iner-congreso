import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";

// import { DataProvider } from "../../providers/data";

@IonicPage({
  // name: 'inicio',
  // segment: 'inicio'
})
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {}

  ionViewDidLoad() {
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
