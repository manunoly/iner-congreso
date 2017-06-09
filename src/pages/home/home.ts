import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import * as firebase from 'firebase/app';


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  items: FirebaseListObservable<any>;
  displayName: string;

  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    // afDB.list('/').push({'aaa1': 1})
    this.items = this.afDB.list('/');
    console.log('OK');
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;        
        return;
      }
      this.displayName = user.displayName;      
    });
  }
  signInWithGoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => console.log(res))
  }
    signOut() {
    this.afAuth.auth.signOut();
  }

}
