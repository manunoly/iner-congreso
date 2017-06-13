import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
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

  isAuthenticated() {
    if (this.afAuth.auth.currentUser != null)
      return true;
  }
}
