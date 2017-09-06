import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DataProvider } from "./../../providers/data";

/**
 * Generated class for the TopicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-topic",
  templateUrl: "topic.html"
})
export class TopicPage {
  topics: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider
  ) {}

  ionViewDidLoad() {
    this.topics = this.dataS.getTopic();
  }
}
