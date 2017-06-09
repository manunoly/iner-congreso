import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SpeakerPage } from '../pages/speaker/speaker';
import { ConferencePage } from '../pages/conference/conference';
import { HomePage } from '../pages/home/home';
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
    ConferencePage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
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
    ConferencePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
