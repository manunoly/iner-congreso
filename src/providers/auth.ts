import { Injectable } from "@angular/core";
// import { Observable } from "rxjs/Observable";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/* import "rxjs/add/operator/of";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
 */
import { ToastController } from "ionic-angular";

// import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";

@Injectable()
export class AuthProvider {
  isAdminSingle: any;
  NEW_USER: Boolean = true;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {}

  loginGoogle() {
    try {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          this.setUserData();
        })
        .catch(res => this.showNotification(res, 10000));
    } catch (err) {
      console.log(err);
    }
  }

  loginFacebook() {
    try {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          this.setUserData();
        })
        .catch(res => this.showNotification(res, 10000));
    } catch (err) {
      console.log(err);
    }
  }

  loginTwitter() {
    try {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(res => {
          this.setUserData();
        })
        .catch(res => this.showNotification(res, 10000));
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  setUserData() {
    this.showNotification(
      "Bienvenido " + this.afAuth.auth.currentUser.displayName,
      2500
    );
    /*
    let newUser = this.afDB.list("/user/" + this.afAuth.auth.currentUser.uid);
    newUser.subscribe(userNewData => {
      if (userNewData[0].name) {
        this.NEW_USER = false;
        this.showNotification(
          "Bienvenido " + this.afAuth.auth.currentUser.displayName,
          2500
        );
      } else {
        this.afDB
          .object("/user" + this.afAuth.auth.currentUser.uid)
          .set({ name: this.afAuth.auth.currentUser.displayName })
          .then(_ => {
            this.showNotification(
              "Bienvenido " + this.afAuth.auth.currentUser.displayName,
              3000
            );
          })
          .catch(err => {
            this.showNotification(err);
          });
      }
    }); */
  }

  getUser() {
    return this.afAuth.authState;
  }

  isAuthenticated() {
    if (this.afAuth.auth.currentUser != null)
      return this.afAuth.auth.currentUser.uid;
  }

  firebaseUserToPromise() {
    return new Promise(dataPromise => {
      if (this.isAuthenticated()) {
        this.afAuth.authState.subscribe(
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

  isAdmin() {
    return this.afAuth.authState.flatMap(user => {
      if (user) {
        return this.afDB
          .object("/admin/" + user.uid, {
            preserveSnapshot: true
          }).catch(err => {
            let obj = {
              val: function() {
                return null;
              }
            };
            return Observable.of(obj);
          });
      } else {
        let obj = {
          val: function() {
            return null;
          }
        };
        return Observable.of(obj);
      }
    });
  }

  isAdminPromise() {
    return new Promise(dataPromise => {
      this.isAdmin().subscribe(data => {
        dataPromise(data);
      });
    });
  }

  showNotification(message, time = 5000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: "top",
      // cssClass: "text-center toastStyle",
      dismissOnPageChange: true
    });
    toast.present();
  }
}

