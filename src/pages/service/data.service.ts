import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import "rxjs/Operator";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AuthService } from "./auth.service";

@Injectable()
export class DataService {
  conferences = [];
  speakers = [];
  constructor(private afDB: AngularFireDatabase, private authS: AuthService) {}
  loadData() {
    this.afDB.list("/data").subscribe((data: Object) => {
      let conferences = data[0];
      this.conferences = [];
      for (let i in conferences) {
        this.conferences.push(conferences[i]);
      }
      this.speakers = [];
      let speakers = data[1];
      for (let i in speakers) {
        this.speakers.push(speakers[i]);
      }
      console.log(this.conferences);
    });
  }
  getConferences() {
    return this.afDB.list("/data/conferences");
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
  addConference() {
    if (this.authS.isAuthenticated()) {
      this.afDB.list("/data/conferences").push({
        title: "The Ionic package service",
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

  getSpeakers() {
    return this.afDB.list("/data/speakers");
  }

  addSpeaker() {
    if (this.authS.isAuthenticated()) {
      this.afDB.list("/data/speakers").push({
        name: "The Ionic package service",
        profilePic: "assets/img/speakers/bear.jpg",
        shortAbout: "Mobile devices and browsers",
        about:
          "Mobile devices and browsers are now advanced enough that developers.",
        conferences: [
          { title: "Molly Mouse", conferenceID: "123" },
          { title: "Burt Bear", conferenceID: "1234" }
        ],
        email: "email@email.com"
      });
    }
  }

  updateSpeaker() {
    if (this.authS.isAuthenticated()) {
      this.afDB.list("/data/conferences").update("123", {
        name: "The Ionic package service",
        profilePic: "assets/img/speakers/bear.jpg",
        shortAbout: "Mobile devices and browsers",
        about:
          "Mobile devices and browsers are now advanced enough that developers.",
        conferences: [
          { title: "Molly Mouse", conferenceID: "123" },
          { title: "Burt Bear", conferenceID: "1234" }
        ],
        email: "email@email.com"
      });
    }
  }
}
