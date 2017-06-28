import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";

// import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
  }

  loginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(error => console.log(error));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    if (this.afAuth.auth.currentUser != null) return true;
  }

  firebaseUserToPromise() {
    return new Promise(dataPromise => {
      if (this.isAuthenticated()) {
        this.user.subscribe(
          firebaseUser => {
            dataPromise(firebaseUser);
          },
          err => {
            dataPromise(err);
          }
        );
      } else dataPromise(false);
    });
  }

  checkDataExist(data) {
    return new Promise(dataPromise => {
      this.afDB
        .object(data, {
          preserveSnapshot: true
        })
        .subscribe(adminData => {
          if (adminData.val() !== null) {
            dataPromise(true);
          } else dataPromise(false);
        });
    });
  }

  isAdmin2() {
    if (this.isAuthenticated())
      return this.user.flatMap(user => {
        return this.afDB.object(user["email"].split("@")[0], {
          preserveSnapshot: true
        });
      }).subscribe(res=>{
        console.log(res);
        return res;
      });

    // subscribe(user => {
    //   this.checkDataExist(
    //     user["email"].split("@")[0]
    //   ).then(dataExist => {
    //     return dataExist;
    //   });
    // });
  }

  isAdmin() {
    let firebaseUser = this.firebaseUserToPromise();
    let userD = "";
    return Observable.fromPromise(
      firebaseUser
        .then(user => {
          console.log("firebaseUser");
          console.log(user);
          if (user) userD = user["email"].split("@")[0];
          else return false;
        })
        .then(_ => {
          if (userD)
            return this.checkDataExist("/admin/" + userD).then(isAdmin => {
              console.log("verifico si la data existe");
              console.log(isAdmin);
              return isAdmin;
            });
          else return false;
        })
    );
  }

  createAdmin() {
    console.log("Admin validation");
    this.afDB.list("/admin", { preserveSnapshot: true }).subscribe(users => {
      console.log(users);
    });
    //     subscribe(users => {
    //       ["manunoly@gmail.com", "raul@gmail.com"]);
  }
}
