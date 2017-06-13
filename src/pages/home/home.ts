import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { AuthService } from './../service/auth.service';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  displayName = "Visitante";

  constructor(public navCtrl: NavController, private authS: AuthService) {
    // this.displayName = authS.getUserName();
  }
}