import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { DataProvider } from "./../../providers/data";

/**
 * Generated class for the FilterLocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: "page-filter-location",
  templateUrl: "filter-location.html"
})
export class FilterLocationPage {
  locations = [];
  locationsLength = 0;
  constructor(public viewCtrl: ViewController, private dataS: DataProvider) {}

  ionViewDidLoad() {
    let locationsInclued = this.viewCtrl.data.location;
    let obsLocation = this.dataS.getLocation().subscribe(locationsD => {
      if (locationsD) {
        this.locationsLength = locationsD.length;
        if (locationsInclued.length == 0) {
          locationsD.forEach(locationName => {
            this.locations.push({
              id: locationName.$key,
              name: locationName.name,
              isChecked: true
            });
          });
        } else {
          locationsD.forEach(locationName => {
            this.locations.push({
              id: locationName.$key,
              name: locationName.name,
              isChecked: locationsInclued.indexOf(locationName.$key) != -1
            });
          });
        }
      }
      obsLocation.unsubscribe();
    });
  }
  resetFilters() {
    // reset all of the toggles to be checked
    this.locations.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    let filter = this.locations.filter(t => t.isChecked).map(t => t.id);
    if (this.locationsLength == filter.length) this.viewCtrl.dismiss([]);
    else this.viewCtrl.dismiss(filter);
  }

  dismiss() {
    this.viewCtrl.dismiss(undefined);
  }
}
