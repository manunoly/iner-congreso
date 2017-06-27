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
    if (this.isAuthenticated()) {
      let user = new Promise(dataPromise => {
        this.user.subscribe(
          firebaseUser => {
            dataPromise(firebaseUser);
          },
          err => {
            dataPromise(err);
          }
        );
      });
      return user;
    }
    return null;
  }

  isAdmin() {
    let firebaseUser = this.firebaseUserToPromise();
    if (firebaseUser)
      return firebaseUser.then(user => {
        let isAdmin = false;
        this.afDB
          .object("/admin/", { preserveSnapshot: true })
          .subscribe(adminData => {
            console.log("dentro suscribe para buscar el admin");
            console.log(adminData.key());
            console.log(user["email"]);
            if (adminData.val().indexOf(user["email"])) {
              console.log("admin true en el if");
              isAdmin = true;
            }
            return isAdmin;
          });
      });

    /*let isAdmin = false;
    console.log("admin val inicio");
    if (this.isAuthenticated()) {
      this.afDB
        .object("/admin/", { preserveSnapshot: true })
        .subscribe(adminUser => {
          console.log("dentro suscribe para buscar el admin");
          console.log(this.user["email"]);

          if (this.user["email"] in adminUser.val()) {
            console.log("admin true en el if");
            isAdmin = true;
          }
          return isAdmin;
          // console.log(adminUser.key);
          // console.log(adminUser.val());
        });
    } else {
      console.log("admin val fin not autenticated");
      return isAdmin;
    }*/
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
