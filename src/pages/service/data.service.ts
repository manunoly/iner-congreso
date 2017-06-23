import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AuthService } from "./auth.service";

@Injectable()
export class DataService {
  // conferences: Observable<any>;
  conferences: FirebaseListObservable<any>;
  speakers: FirebaseListObservable<any>;
  smallDevice: boolean;

  constructor(
    private afDB: AngularFireDatabase,
    private authS: AuthService,
    public platform: Platform
  ) {}

  loadData() {
    this.afDB.list("/data").subscribe();
    this.speakers = this.afDB.list("/data/speakers", {
      query: {
        orderByChild: "name"
      }
    });
    this.conferences = this.afDB.list("/data/conferences", {
      query: {
        orderByChild: "date"
      }
    });
  }

  isSmallDevice() {
    if (this.smallDevice === undefined) {
      if (this.platform.width() > 575) this.smallDevice = false;
      else this.smallDevice = true;
    }
    return this.smallDevice;
  }

  updateConference() {
    if (this.authS.isAuthenticated()) {
      this.afDB.list("/data/conferences").update("123", {
        title: "Las Energias Limpias",
        location: "Room 2203",
        shortDescription: "Mobile devices and browsers",
        description:
          "Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies like HTML5, Javascript, and CSS. In this talk, we’ll provide background on why and how we created Ionic, the design decisions made as we integrated Ionic with Angular, and the performance considerations for mobile platforms that our team had to overcome. We’ll also review new and upcoming Ionic features, and talk about the hidden powers and benefits of combining mobile app development and Angular.",
        speakers: [
          { name: "Molly Mouse", speakerID: "123" },
          { name: "Burt Bear", speakerID: "1234" }
        ],
        day: "21",
        timeStart: "1:30 pm",
        timeEnd: "2:00 pm",
        topic: ["Services", "Data Manipulation"]
      });
    }
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  addConference() {
    let day = this.getRandomIntInclusive(21, 23);
    let hour = this.getRandomIntInclusive(0, 59);
    if (this.authS.isAuthenticated()) {
      this.afDB.list("/data/conferences").push({
        title: "Conferencia No " + day + hour,
        location: "Room 2203",
        shortDescription: "Mobile devices and browsers",
        description:
          "Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies like HTML5, Javascript, and CSS. In this talk, we’ll provide background on why and how we created Ionic, the design decisions made as we integrated Ionic with Angular, and the performance considerations for mobile platforms that our team had to overcome. We’ll also review new and upcoming Ionic features, and talk about the hidden powers and benefits of combining mobile app development and Angular.",
        speakers: [
          { name: "Molly Mouse", speakerID: "123" },
          { name: "Burt Bear", speakerID: "1234" }
        ],
        day: day,
        date: "2017:01:13:" + day + ":" + hour,
        timeStart: "1:30 pm",
        timeEnd: "2:00 pm",
        topic: ["Services", "Data Manipulation"]
      });
    }
  }

  filterConferences(searchTerm) {
    if (searchTerm === "") return this.conferences;
    return this.conferences.map(data =>
      data.filter(dato =>
        dato.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  filterConference(conferenceID) {
    return this.conferences.map(data =>
      data.filter(dato => dato.$key == conferenceID)
    );
  }

  filterSpeaker(speakerID = "") {
    return this.speakers.map(data =>
      data.filter(dato => dato.$key == speakerID)
    );
  }

  filterSpeakers(searchTerm) {
    if (searchTerm === "") return this.speakers;
    return this.speakers.map(data =>
      data.filter(dato =>
        dato.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  addSpeaker(speaker) {
    if (this.authS.isAuthenticated()) {
      return this.speakers
        .push({
          name: speaker.name,
          degree: speaker.degree,
          profilePic: speaker.profilePic,
          shortAbout: speaker.shortAbout,
          about: speaker.about,
          /* conferences: [
          { title: "Molly Mouse", conferenceID: "123" },
          { title: "Burt Bear", conferenceID: "1234" }
        ],*/
          email: speaker.email
        })
        .then(a => {
          return "Ok";
        })
        .catch(a => {
          return "Error";
        });
    }
  }
  updateSpeaker1(speaker) {
    console.log(speaker);
    return "Ok";
  }
  updateSpeaker(speaker) {
    if (this.authS.isAuthenticated()) {
      return this.filterSpeaker(speaker.id).subscribe(oldSpeaker => {
        let conf = "";
        if (typeof oldSpeaker != "undefined" && oldSpeaker.length == 1 && "conferences" in oldSpeaker[0]){
          conf = oldSpeaker[0].conferences;
        }
        return this.speakers
          .update(speaker.id, {
            name: speaker.name,
            profilePic: speaker.profilePic,
            shortAbout: speaker.shortAbout,
            about: speaker.about,
            conferences: conf,
            email: speaker.email
          })
          .then(_ => {
            return "OK";
          })
          .catch(_ => {
            return "Error";
          });
      });
    }
  }
  /**
   * TODO: Validate is admin role
   */
  deleteSpeaker(speakerID) {
    if (this.authS.isAuthenticated()) {
      return this.speakers
        .remove(speakerID)
        .then(_ => {
          return "OK";
        })
        .catch(_ => {
          return "Error";
        });
    }
  }
}
