import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';

import { AuthService } from '../pages/service/auth.service';
import { DataService } from '../pages/service/data.service';

import { AboutPage } from '../pages/about/about';
import { SpeakerPage } from '../pages/speaker/speaker';
import { SpeakerDeatailPage } from '../pages/speaker-deatail/speaker-deatail';
import { ConferencePage } from '../pages/conference/conference';
import { ConferenceDetailPage } from './../pages/conference-detail/conference-detail';
import { HomePage } from '../pages/home/home';
import { ManageConferencePage } from '../pages/manage-conference/manage-conference';
import { ManageSpeakerPage } from '../pages/manage-speaker/manage-speaker';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//firebase 
// import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
    AboutPage,
    SpeakerPage,
    SpeakerDeatailPage,
    ConferencePage,
    ConferenceDetailPage,
    ManageSpeakerPage,
    ManageConferencePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
//firebase Module import
    // HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,    
    AboutPage,
    SpeakerPage,
    SpeakerDeatailPage,
    ConferencePage,
    ConferenceDetailPage,
    ManageSpeakerPage,
    ManageConferencePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
