import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth";

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  displayName = "Visitante";
  user: any;
  picture: string = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
  userProfile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authS: AuthProvider
  ) {}

  ionViewDidLoad() {
    this.user = this.authS.getUser();
  }
  goToHomePage(){
    this.navCtrl.push("navegarPage");
  }
}
