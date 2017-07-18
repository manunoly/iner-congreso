import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { ToastController } from "ionic-angular";

// import { Subscriber } from 'rxjs/Subscriber';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase/app";

@Injectable()
export class AuthService {
  isAdminSingle: any;

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
          this.showNotification("Bienvenido " + this.afAuth.auth.currentUser.displayName, 3000);
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
          this.showNotification("Bienvenido " + this.afAuth.auth.currentUser.displayName, 3000);
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
          this.showNotification("Bienvenido " + this.afAuth.auth.currentUser.displayName, 3000);
        })
        .catch(res => this.showNotification(res, 10000));
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
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
        return this.afDB.object("/admin/" + user.uid, {
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
