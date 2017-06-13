import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  name: string;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.user.subscribe((data: Object)=>{
        if (data != null) {
          this.name = data['email'].split('@')[0];
        // this.name = user['displayName'];
        }else
            this.name = "Visitante"
        })
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(
      error => console.log(error)
      );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.user;
  }

  getUserName(){
      return this.name;
  }

  isAuthenticated() {
    if (this.afAuth.auth.currentUser != null)
      return true;
  }
}
