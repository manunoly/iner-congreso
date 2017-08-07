import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { DataProvider } from '../../providers/data';
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: "page-speaker-detail",
  templateUrl: "speaker-detail.html"
})
export class SpeakerDetailPage {
  speaker: any;
  showMail: boolean = false;
  speakerConf = [];
  speakerID: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider,
    private authS: AuthProvider
  ) { }
  /**
 * FIXME: Adicionar perfil de linkedin o pagina web de la persona y redes académicas (google scholar y demás).
 *
 * @memberof SpeakerDetailPage
 */
  ionViewDidLoad() {
    this.speakerID = this.navParams.data.speaker;
    this.getConference();
    this.speaker = this.dataS.filterSpeaker(this.speakerID);
  }

  goToConferenceDetail(conferenceID) {
    this.navCtrl.push(ConferenceDetailPage, {
      conferenceID: conferenceID
    });
  }

  getConference() {
    let objConf = this.dataS.filterConferences(
      "",
      [],
      [],
      false,
      this.speakerID
    ).subscribe(conf => {
      let speakerConf = [];
      if (conf)
        conf.forEach(element => {
          speakerConf.push(element);
        });
      this.speakerConf = speakerConf;
      objConf.unsubscribe();
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
