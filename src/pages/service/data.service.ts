import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { } from 'rxjs/Operator';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from './auth.service';

@Injectable()
export class DataService{
      data: FirebaseObjectObservable<any>;
      conferences: any;
      speakers: any;
    constructor(private afDB: AngularFireDatabase, private authS: AuthService){}

    getData(){
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
    });
    }
}