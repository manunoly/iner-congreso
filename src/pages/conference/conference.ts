import { AboutPage } from "./../about/about";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormControl } from "@angular/forms";

import { DataService } from "./../service/data.service";
import "rxjs/add/operator/debounceTime";

@Component({
  selector: "page-conference",
  templateUrl: "conference.html"
})
export class ConferencePage {
  speakers = [];
  conferences: any;
  conferencesData: any;
  searchTerm: string = "";
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService
  ) {
    this.searchControl = new FormControl();
  }
  ionViewDidLoad() {
    // this.conferences = this.dataS.getConferences();
    /*  this.dataS.getConferences().subscribe((data: Object)=>{
      this.conferences = data;
    })*/
    this.setFilteredConferences();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredConferences();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredConferences() {
    this.conferences = this.dataS.filterConferences(this.searchTerm);
  }

  addConf() {
    this.dataS.addConference();
  }

  addSpeaker() {
    this.dataS.addSpeaker();
  }

  itemTapped(event, item) {
    this.navCtrl.push(AboutPage, {
      item: item
    });
  }
}
