import { Component } from "@angular/core";
import { IonicPage,NavController, NavParams } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";

import { HomePage } from "./../home/home";
import { DataProvider } from '../../providers/data';
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: "page-manage-speaker",
  templateUrl: "manage-speaker.html"
})
export class ManageSpeakerPage {
  submitAttempt: boolean;
  speakerForm: any;
  speakers: any;
  showAddSpeaker = false;
  smallDevice: boolean;
  showupdateSpeaker = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider,
    private authS: AuthProvider,
    private formBuilder: FormBuilder
  ) {
    this.setSpeakerForm(undefined);
  }

  ionViewDidLoad() {
    if (!this.isAuthenticated()) this.navCtrl.push(HomePage);
    this.speakers = this.dataS.filterSpeakers("");
    this.smallDevice = this.dataS.isSmallDevice();
  }

  removeSpeaker(speakerID) {
    this.showupdateSpeaker = false;
    this.dataS.deleteSpeaker(speakerID);
  }

  loadSpeakerToEdit(speaker) {
    this.showupdateSpeaker = true;
    this.speakerForm.reset();
    this.showAddSpeakerForm(true);
    this.setSpeakerForm(speaker);
  }
  /**
 * FIXME: Adicionar perfil de linkedin o pagina web de la persona y redes académicas (google scholar y demás).
 *
 */
  updateSpeaker() {
    if (this.speakerForm.valid) {
      this.dataS.updateSpeaker(this.speakerForm.value);
      this.speakerForm.reset();
      this.setSpeakerForm(undefined);
      this.showAddSpeaker = false;
      this.showupdateSpeaker = false;
    } else this.submitAttempt = true;
  }

  isAuthenticated() {
    return this.authS.isAuthenticated();
  }

  addSpeaker() {
    if (this.speakerForm.valid) {
      this.dataS.addSpeaker(this.speakerForm.value);
      this.speakerForm.reset();
      this.setSpeakerForm(undefined);
    } else this.submitAttempt = true;
  }

  showAddSpeakerForm(showAddSpeaker = false) {
    this.showAddSpeaker = showAddSpeaker;
  }

  setSpeakerForm(speaker) {
    if (speaker === undefined) {
      this.speakerForm = this.formBuilder.group({
        name: [
          // "",
          "Manuel Almaguer",
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        profilePic: [
          "./../../assets/icon/favicon.ico",
          Validators.compose([
            ,
            Validators.maxLength(1000),
            Validators.required
          ])
        ],
        degree: [
          // "",
          "Ing. Sistemas",
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        googleScholar: [
          // "",
          "https://scholar.google.es/citations?view_op=metrics_intro&hl=es",
          Validators.compose([Validators.maxLength(1000)])
        ],
        linkedin: [
          // "",
          "https://www.linkedin.com/in/manunoly/",
          Validators.compose([Validators.maxLength(1000)])
        ],
        twitter: [
          // "",
          "https://twitter.com/manunoly",
          Validators.compose([Validators.maxLength(1000)])
        ],
        email: [
          "iner@iner.ec",
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        shortAbout: [
          // "",
          "Ing. Sistemas",
          Validators.compose([Validators.maxLength(1000), Validators.required])
        ],
        about: [
          // "",
          "Ing. Sistemas",
          Validators.compose([Validators.maxLength(10000), Validators.required])
        ]
      });
    } else {
      this.speakerForm = this.formBuilder.group({
        id: [speaker.$key],
        name: [
          speaker.name,
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        profilePic: [
          speaker.profilePic,
          Validators.compose([
            ,
            Validators.maxLength(1000),
            Validators.required
          ])
        ],
        degree: [
          speaker.degree,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        googleScholar: [
          speaker.googleScholar,
          Validators.compose([Validators.maxLength(1000)])
        ],
        linkedin: [
          speaker.linkedin,
          Validators.compose([Validators.maxLength(1000)])
        ],
        twitter: [
          speaker.twitter,
          Validators.compose([Validators.maxLength(1000)])
        ],
        email: [
          speaker.email,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        shortAbout: [
          speaker.shortAbout,
          Validators.compose([Validators.maxLength(1000), Validators.required])
        ],
        about: [
          speaker.about,
          Validators.compose([Validators.maxLength(10000), Validators.required])
        ]
      });
    }
  }
}
