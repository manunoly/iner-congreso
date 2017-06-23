import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormControl, FormBuilder, Validators } from "@angular/forms";

import { HomePage } from "./../home/home";
import { DataService } from "./../service/data.service";
import { AuthService } from "./../service/auth.service";

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
    private dataS: DataService,
    private authS: AuthService,
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
    let result = this.dataS.deleteSpeaker(speakerID);
    /**
     * TODO: show confirmation message
     */
  }

  loadSpeakerToEdit(speaker) {
    this.showupdateSpeaker = true;
    this.speakerForm.reset();
    this.showAddSpeakerForm(true);
    this.setSpeakerForm(speaker);
  }

  updateSpeaker() {
    if (this.speakerForm.valid) {
      let result = this.dataS.updateSpeaker(this.speakerForm.value);
      // this.speakerForm.reset();
      this.setSpeakerForm(undefined);
      this.showAddSpeaker = false;
      this.showupdateSpeaker = false;
      //FIXME: show notification result
    } else this.submitAttempt = true;
  }

  isAuthenticated() {
    return this.authS.isAuthenticated();
  }

  addSpeaker() {
    if (this.speakerForm.valid) {
      let a = this.dataS.addSpeaker(this.speakerForm.value);
      
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
