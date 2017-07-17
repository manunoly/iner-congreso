import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { DataService } from "./../service/data.service";
import { AuthService } from "./../service/auth.service";

@Component({
  selector: "page-speaker-detail",
  templateUrl: "speaker-detail.html"
})
export class SpeakerDetailPage {
  speaker: any;
  showMail: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService,
    private authS: AuthService
  ) {}
  /**
 * FIXME: Adicionar perfil de linkedin o pagina web de la persona y redes académicas (google scholar y demás).
 *
 * @memberof SpeakerDetailPage
 */
  ionViewDidLoad() {
    let speakerID = this.navParams.data.speaker;
    this.speaker = this.dataS.filterSpeaker(speakerID);
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }
  isAutenticated() {
    return this.authS.isAuthenticated();
  }

  showSpeakerMail() {
    if (this.isAutenticated()) this.showMail = true;
    else this.dataS.showNotification("Debe identificarse!");
  }

  goToSpeakerSocial(url) {
    if (this.isAutenticated()) {
      let open = window.open(url, "_blank");
      open.focus();
    } else this.dataS.showNotification("Debe identificarse!");
  }
}
