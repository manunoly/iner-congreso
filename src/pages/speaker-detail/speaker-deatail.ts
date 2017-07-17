import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ConferenceDetailPage } from "./../conference-detail/conference-detail";
import { DataService } from "./../service/data.service";

@Component({
  selector: "page-speaker-detail",
  templateUrl: "speaker-detail.html"
})
export class SpeakerDetailPage {
  speaker: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService
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
}
