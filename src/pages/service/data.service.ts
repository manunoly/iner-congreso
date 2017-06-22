import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/of";

import "rxjs/Operator";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AuthService } from "./auth.service";

@Injectable()
export class DataService {
  // conferences: Observable<any>;
  conferences: any;
  speakers = [];
  getData: any;

  constructor(private afDB: AngularFireDatabase, private authS: AuthService) {
    /*this.afDB.list("/data/conferences").subscribe(data => {
      this.conferences = data;
    });*/
    /* this.afDB.list("/data").subscribe((data: Object) => {
      let conferences = data[0];
      let tmpData = [];
      for (let i in conferences) {
        tmpData.push(conferences[i]);
      }
      this.conferences = Observable.create(observer => {
        observer.next(tmpData);
      });

      this.speakers = [];
      let speakers = data[1];
      for (let i in speakers) {
        this.speakers.push(speakers[i]);
      }
    });*/
  }
  loadData() {
    this.getData = this.afDB.list("/data").subscribe();
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
    if (searchTerm === "")
      return this.afDB.list("/data/conferences", {
        query: {
          orderByChild: "date"
        }
      });
    return this.afDB
      .list("/data/conferences", {
        query: {
          orderByChild: "date"
        }
      })
      .map(data =>
        data.filter(dato =>
          dato.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }

  filterConference(conferenceID) {
    return this.afDB
      .list("/data/conferences")
      .map(data => data.filter(dato => dato.$key == conferenceID));
  }

  filterSpeaker(speakerID = "") {
    return this.afDB
      .list("/data/speakers")
      .map(data => data.filter(dato => dato.$key == speakerID));
  }
  filterSpeakers(searchTerm) {
    if (searchTerm === "")
      return this.afDB.list("/data/speakers", {
        query: {
          orderByChild: "name"
        }
      });
    return this.afDB
      .list("/data/speakers", {
        query: {
          orderByChild: "name"
        }
      })
      .map(data =>
        data.filter(dato =>
          dato.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }

  addSpeaker(speaker) {
    if (this.authS.isAuthenticated()) {
      console.log(speaker);
      return this.afDB.list("/data/speakers").push({
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
      }).then(a=> {console.log(a); return "Ok"}).catch(a =>{ return "Error"});
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
