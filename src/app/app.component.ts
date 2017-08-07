import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

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
  rootPage: any = 'StartPage';

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
    },    {
      title: "Nosotros",
      pageName: "NavegarPage",
      tabComponent: "AboutPage",
      index: 3,
      icon: "information-circle"
    },
    { title: "Iniciar Sesión", pageName: "LoginPage", icon: "user" }
  ];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
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
    });
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
}
