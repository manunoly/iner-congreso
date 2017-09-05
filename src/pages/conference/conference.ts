import { FilterTopicPage } from "./../filter-topic/filter-topic";
// import { AboutPage } from "./../about/about";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  IonicPage,
  Events,
  PopoverController,
  ItemSliding,
  Item
} from "ionic-angular";
import { FormControl } from "@angular/forms";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { RatePage } from "./../rate/rate";
import "rxjs/add/operator/debounceTime";
import { AuthProvider } from "../../providers/auth";
import { DataProvider } from "../../providers/data";

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
  filterTopic = [];
  search: boolean = true;
  favConf = [];
  conferencesFavorite: boolean = false;
  day: number = 0;
  excludeTracks: any;
  activeItemSliding: ItemSliding = null;
  hasFavorite = false;
  congreso = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider,
    private authS: AuthProvider,
    public popoverCtrl: PopoverController,
    private events: Events
  ) {
    this.searchControl = new FormControl();
    this.dayControl = new FormControl();
    this.topicControl = new FormControl();
    this.favorite = new FormControl();
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.events.subscribe("myCalendar", _ => {
        console.log(
          "Filtrar Conferencias desde comp conferencias ionViewDidLoad"
        );
        this.conferences = this.dataS.filterConferences(
          undefined,
          undefined,
          undefined,
          true
        );
      });
    });
    // this.topics = this.dataS.getTopic();
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
    this.hasFavorite = this.dataS.hasFavoriteConference();
    this.setFilteredConferences();
  }

  onSearchInput() {
    this.searching = true;
  }

  isAuthenticated() {
    if (this.authS.isAuthenticated()) return true;
    this.conferencesFavorite = false;
  }

  rateConference(myEvent, conferenceID, slidingItem) {
    let popover = this.popoverCtrl.create(RatePage, {
      conferenceID: conferenceID
    });
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
  }

  removeFavorite(conferenceID, slidingItem) {
    this.dataS.removeFavorite(conferenceID);
  }

  openOption(itemSlide: ItemSliding, item: Item) {
    this.dataS.showNotification("Deslice hacia la Izquierda para mostrar estas opciones");
    this.activeItemSliding = itemSlide;
    let swipeAmount = 125; //set your required swipe amount
    itemSlide.startSliding(swipeAmount);
    itemSlide.moveSliding(swipeAmount);

    itemSlide.setElementClass("active-options-right", true);
    itemSlide.setElementClass("active-swipe-right", true);

    item.setElementStyle("transition", null);
    item.setElementStyle(
      "transform",
      "translate3d(-" + swipeAmount + "px, 0px, 0px)"
    );
  }

  showHideSearch() {
    this.search = !this.search;
  }

  filterAll() {
    this.searchTerm = "";
    this.day = 0;
    this.filterTopic = [];
    this.conferencesFavorite = false;
    this.setFilteredConferences();
  }

  setFilteredConferences() {
    console.log(this.congreso);
    this.conferences = this.dataS.filterConferences(
      this.searchTerm,
      this.day,
      this.filterTopic,
      this.conferencesFavorite
    );
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }

/*   itemTapped(event, item) {
    this.navCtrl.push(AboutPage, {
      item: item
    });
  } */

  popFilterTopic(myEvent) {
    let modal = this.popoverCtrl.create(FilterTopicPage, {
      topics: this.filterTopic
    });
    modal
      .present({
        ev: myEvent
      })
      .then(_ => {})
      .catch(_ => {});
    modal.onDidDismiss((data: any[]) => {
      if (data) {
        this.searching = true;
        this.filterTopic = data;
        this.setFilteredConferences();
        setTimeout(() => {
          this.searching = false;
        });
      }
    });
  }
}
