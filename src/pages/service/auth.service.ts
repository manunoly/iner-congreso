import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { ToastController } from "ionic-angular";

// import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  isAdminSingle: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {
    this.user = afAuth.authState;
  }

  loginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => console.log(res))
      .catch(res => this.showNotification(res));
  }

  loginFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res))
      .catch(res => this.showNotification(res));
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

  isAdmin() {
    return this.user.flatMap(user => {
      if (this.isAuthenticated()) {
        return this.afDB.object("/admin/" + user["email"].split("@")[0], {
          preserveSnapshot: true
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

  createAdmin() {
    console.log("Admin validation");
    this.afDB.list("/admin", { preserveSnapshot: true }).subscribe(users => {
      console.log(users);
    });
    //     subscribe(users => {
    //       ["manunoly@gmail.com", "raul@gmail.com"]);
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
