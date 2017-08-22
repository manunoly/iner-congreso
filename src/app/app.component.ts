import { Component, ViewChild } from "@angular/core";
import { NgClass } from '@angular/common';
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "./../providers/auth";
import { DataProvider } from '../providers/data';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  user: any;
  isAdmin: any;
  displayName = "Visitante";
  picture = "../../assets/icon/favicon.ico";
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
      icon: "home"
    },
    {
      title: "Conferencias",
      pageName: "NavegarPage",
      tabComponent: "ConferencePage",
      index: 1,
      icon: "calendar"
    },
    { title: "Temas", pageName: "TopicPage", icon: "school" },
    {
      title: "Ponentes",
      pageName: "NavegarPage",
      tabComponent: "speakerPage",
      index: 2,
      icon: "contacts"
    },
    {
      title: "Nosotros",
      pageName: "NavegarPage",
      tabComponent: "AboutPage",
      index: 3,
      icon: "information-circle"
    }
  ];

  adminPage: any = [
    { title: "Ponentes", pageName: "ManageSpeakerPage", icon: "people" },
    {
      title: "Conferencias",
      pageName: "ManageConferencePage",
      icon: "calendar"
    },
    { title: "Lugares", pageName: "ManageLocationPage", icon: "locate" },
    { title: "Temáticas", pageName: "ManageTopicPage", icon: "school" }
  ];
  loginPage: any = [
    { title: "Iniciar Sesión", pageName: "LoginPage", icon: "person" }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authS: AuthProvider,
    private dataS: DataProvider
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

  signOut() {
    this.authS.logout();
  }

  isSmall(){
    this.small = this.dataS.isSmallDevice();
    console.log(this.small);
  }

  checkUserStatus() {
    this.user = this.authS.getUser();
    this.user.subscribe((user: Object) => {
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
