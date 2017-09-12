import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, ModalController, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { DataProvider } from "./../providers/data";
import { AuthProvider } from "./../providers/auth";
import { LoginPage } from './../pages/login/login';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
  fav: boolean;
}
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  isAdmin: any;
  displayName = "Visitante";
  picture = "./../../assets/icon/favicon.ico";
  userProfile: any;
  rootPage: any = "NavegarPage";
  small: boolean = true;
  // rootPage: any = 'StartPage';

  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {
      title: "Inicio",
      pageName: "NavegarPage",
      tabComponent: "HomePage",
      index: 0,
      icon: "home",
      fav: false
    },
    {
      title: "Conferencias",
      pageName: "NavegarPage",
      tabComponent: "ConferencePage",
      index: 1,
      icon: "calendar",
      fav: false
    },
    { title: "Temas", pageName: "TopicPage", icon: "school", fav: false },
    {
      title: "Ponentes",
      pageName: "NavegarPage",
      tabComponent: "speakerPage",
      index: 2,
      icon: "contacts",
      fav: false
    },
    {
      title: "Nosotros",
      pageName: "NavegarPage",
      tabComponent: "AboutPage",
      index: 3,
      icon: "information-circle",
      fav: false
    },
    {
      title: "Mi Calendario",
      pageName: "NavegarPage",
      tabComponent: "ConferencePage",
      index: 1,
      icon: "book",
      fav: true
    }
  ];

  adminPage: any = [
    { title: "Ponentes", pageName: "ManageSpeakerPage", icon: "people" },
    {
      title: "Conferencias",
      pageName: "ManageConferencePage",
      icon: "calendar"
    },
    { title: "Locales", pageName: "ManageLocationPage", icon: "locate" },
    { title: "Temáticas", pageName: "ManageTopicPage", icon: "school" },
    {
      title: "Asistentes",
      pageName: "ConferenceAlertPage",
      icon: "information-circle"
    }
  ];
  loginPage: any = [
    { title: "Iniciar Sesión", pageName: "LoginPage", icon: "person" }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authS: AuthProvider,
    private dataS: DataProvider,
    private events: Events,
    private modalCtrl: ModalController
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkUserStatus();
      this.isSmall();
    });
  }

  loginUser(){
    let userModal = this.modalCtrl.create(LoginPage);
    userModal.present();
  }

  signOut() {
    this.authS.logout();
  }

  isSmall() {
    this.small = this.dataS.isSmallDevice();
  }

  checkUserStatus() {
    this.authS.getUser().subscribe((user: Object) => {
      if (user != null) {
        // this.displayName = user["email"].split("@")[0];
        this.displayName = user["displayName"];
        if (
          user["photoURL"] !=
          "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        )
          this.picture = user["photoURL"];
        this.userProfile = {
          title: "Perfil de Usuario",
          pageName: "UserProfilePage",
          icon: "person"
        };
      } else {
        this.userProfile = {
          title: "Iniciar Sesión",
          pageName: "LoginPage",
          icon: "person"
        };
        this.displayName = "Visitante";
      }
    });
    this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
      if (page.fav) {
        this.events.publish("myCalendar");
      }
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs()[0] && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      if (page.pageName) this.nav.setRoot(page.pageName, params);
      else this.nav.setRoot("NavegarPage");
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().root === page.tabComponent
      ) {
        return "primary";
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return "primary";
    }
    return;
  }
}
