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
      console.log(this.conferences);
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

  filterConferences(searchTerm) {
    if (searchTerm === "")
      return this.afDB.list("/data/conferences", {
        query: {
          orderByChild: "day"
        }
      });
    return this.afDB
      .list("/data/conferences", {
        query: {
          orderByChild: "day"
        }
      })
      .map(data =>
        data.filter(dato =>
          dato.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    // return this.afDB.list("/data").map(data => data[0]).filter(dato=> {return true});
    // return this.afDB.list("/data/conferences").map(data=>{data.filter(data.title.toLowerCase().indexOf(searchTerm.toLowerCase()))});

    // return this.getData.subscribe((data) => {
    //     let tmpData = [];
    //     for (let i in this.conferences) {
    //       tmpData.push(this.conferences[i]);
    //     }
    //     // this.conferences = tmpData;
    //   console.log(tmpData);
    //   console.log(this.conferences);
    //     return tmpData;
    // });

    // return this.conferences.filter((data)=>{
    //   return data.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    // });
    //   this.conferences.filter((item) => {
    //           return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    // }
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

  addSpeaker() {
    if (this.authS.isAuthenticated()) {
      this.afDB.list("/data/speakers").push({
        name: "Massimo Palem",
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
