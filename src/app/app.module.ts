import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ConferenceDetailPage } from "./../pages/conference-detail/conference-detail";
import { SpeakerDetailPage } from "./../pages/speaker-detail/speaker-detail";
import { RatePage } from "./../pages/rate/rate";
import { FilterTopicPage } from "./../pages/filter-topic/filter-topic";
import { LoginPage } from "./../pages/login/login";
import { AuthProvider } from "./../providers/auth";
import { DataProvider } from "./../providers/data";

//firebase
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
// import { FirebaseProvider } from 'providers/firebase/firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCoXxPbY1k929LjgLeVIir3tk4TkXV3eeI",
  authDomain: "congreso-iner.firebaseapp.com",
  databaseURL: "https://congreso-iner.firebaseio.com",
  projectId: "congreso-iner",
  storageBucket: "congreso-iner.appspot.com",
  messagingSenderId: "615072989154"
};

@NgModule({
  declarations: [
    MyApp,
    ConferenceDetailPage,
    RatePage,
    LoginPage,
    FilterTopicPage,
    SpeakerDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConferenceDetailPage,
    RatePage,
    LoginPage,
    FilterTopicPage,
    SpeakerDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider,
    AuthProvider
  ]
})
export class AppModule {}
