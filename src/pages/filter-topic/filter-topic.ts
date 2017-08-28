import { Component } from "@angular/core";
import { IonicPage, ViewController } from "ionic-angular";
import { DataProvider } from "./../../providers/data";

/**
 * Generated class for the FilterTopicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-filter-topic",
  templateUrl: "filter-topic.html"
})
export class FilterTopicPage {
  topics = [];
  topicsLength = 0;
  constructor(public viewCtrl: ViewController, private dataS: DataProvider) {}

  ionViewDidLoad() {
    let topicsInclued = this.viewCtrl.data.topics;
    let obsTopic = this.dataS.getTopic().subscribe(topicsD => {
      if (topicsD) {
        this.topicsLength = topicsD.length;
        if (topicsInclued.length == 0) {
          topicsD.forEach(topicName => {
            this.topics.push({
              id: topicName.$key,
              name: topicName.topic,
              isChecked: true
            });
          });
        } else {
          topicsD.forEach(topicName => {
            this.topics.push({
              id: topicName.$key,
              name: topicName.topic,
              isChecked: topicsInclued.indexOf(topicName.$key) != -1
            });
          });
        }
      }
      obsTopic.unsubscribe();
    });
  }
  resetFilters() {
    // reset all of the toggles to be checked
    this.topics.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    let filter = this.topics.filter(t => t.isChecked).map(t => t.id);
    if (this.topicsLength == filter.length) this.viewCtrl.dismiss([]);
    else this.viewCtrl.dismiss(filter);
  }

  dismiss() {
    this.viewCtrl.dismiss(undefined);
  }
}
