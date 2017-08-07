import { AboutPage } from "./../about/about";
import { Component } from "@angular/core";
import { NavController, NavParams, IonicPage } from "ionic-angular";
import { FormControl } from "@angular/forms";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { ItemSliding } from "ionic-angular";
import { RatePage } from "./../rate/rate";
import { PopoverController } from "ionic-angular";
import "rxjs/add/operator/debounceTime";
import { AuthProvider } from '../../providers/auth';
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: "page-conference",
  templateUrl: "conference.html"
})
export class ConferencePage {
  conferences: any;
  topics: any;
  searchTerm = "";
  searchControl: FormControl;
  dayControl: FormControl;
  topicControl: FormControl;
  favorite: FormControl;
  searching: any = false;
  filterDay = [];
  filterTopic = [];
  search: boolean = true;
  favConf = [];
  conferencesFavorite: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider,
    private authS: AuthProvider,
    public popoverCtrl: PopoverController
  ) {
    this.searchControl = new FormControl();
    this.dayControl = new FormControl();
    this.topicControl = new FormControl();
    this.favorite = new FormControl();
  }
  ionViewDidLoad() {
    this.topics = this.dataS.getTopic();
    this.setFilteredConferences();
    this.searchControl.valueChanges.debounceTime(400).subscribe(search => {
      this.searching = false;
      this.setFilteredConferences();
    });
    this.dayControl.valueChanges.debounceTime(400).subscribe(search => {
      this.searching = false;
      this.setFilteredConferences();
    });
    this.topicControl.valueChanges.debounceTime(400).subscribe(search => {
      this.searching = false;
      this.setFilteredConferences();
    });
    this.favorite.valueChanges.debounceTime(400).subscribe(search => {
      this.searching = false;
      this.setFilteredConferences();
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  isAuthenticated() {
    if (this.authS.isAuthenticated()) return true;
    this.conferencesFavorite = false;
  }

  rateConference(myEvent, conferenceID, slidingItem) {
    let popover = this.popoverCtrl.create(RatePage,{conferenceID:conferenceID});
    popover.present({
      ev: myEvent

    });
    slidingItem.close();
  }

  isFavorite(conferenceID) {
    return this.dataS.isFavoriteConference(conferenceID);
  }

  addFavorite(conferenceID, slidingItem: ItemSliding) {
    this.dataS.addFavorite(conferenceID);
    slidingItem.close();
  }

  removeFavorite(conferenceID) {
    this.dataS.removeFavorite(conferenceID);
    // console.log(conferenceID);
  }

  showHideSearch() {
    this.search = !this.search;
  }

  reset() {
    this.conferences = this.dataS.filterConferences();
    this.filterDay = [];
    this.filterTopic = [];
    this.searchTerm = "";
  }

  setFilteredConferences() {
    this.conferences = this.dataS.filterConferences(
      this.searchTerm,
      this.filterDay,
      this.filterTopic,
      this.conferencesFavorite
    );
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(AboutPage, {
      item: item
    });
  }
}

