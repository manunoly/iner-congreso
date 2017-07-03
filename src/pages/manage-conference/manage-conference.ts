import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";

import { HomePage } from "./../home/home";
import { DataService } from "./../service/data.service";
import { AuthService } from "./../service/auth.service";

@Component({
  selector: "page-manage-conference",
  templateUrl: "manage-conference.html"
})
export class ManageConferencePage {
  submitAttempt: boolean;
  conferenceForm: any;
  conferences: any;
  showAddConference = false;
  smallDevice: boolean;
  showupdateConference = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService,
    private authS: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.setConferenceForm(undefined);
  }

  ionViewDidLoad() {
    if (!this.isAuthenticated()) this.navCtrl.push(HomePage);
    this.conferences = this.dataS.filterConferences("");
    this.smallDevice = this.dataS.isSmallDevice();
  }

  removeConference(conferenceID) {
    this.showupdateConference = false;
    this.dataS.deleteConference(conferenceID);
  }

  loadConferenceToEdit(conference) {
    this.showupdateConference = true;
    this.conferenceForm.reset();
    this.showAddConferenceForm(true);
    this.setConferenceForm(conference);
  }

  updateConference() {
    if (this.conferenceForm.valid) {
      this.dataS.updateConference(this.conferenceForm.value);
      this.conferenceForm.reset();
      this.setConferenceForm(undefined);
      this.showAddConference = false;
      this.showupdateConference = false;
      //FIXME: show notification result
    } else this.submitAttempt = true;
  }

  isAuthenticated() {
    return this.authS.isAuthenticated();
  }

  addConference() {
    if (this.conferenceForm.valid) {
      this.dataS.addConference(this.conferenceForm.value);
      this.conferenceForm.reset();
      this.setConferenceForm(undefined);
    } else this.submitAttempt = true;
  }

  showAddConferenceForm(showAddConference = false) {
    this.showAddConference = showAddConference;
  }

  setConferenceForm(conference) {
    if (conference === undefined) {
      this.conferenceForm = this.formBuilder.group({
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
      this.conferenceForm = this.formBuilder.group({
        id: [conference.$key],
        name: [
          conference.name,
          Validators.compose([
            Validators.maxLength(100),
            Validators.pattern("[a-zA-Z ]*"),
            Validators.required
          ])
        ],
        profilePic: [
          conference.profilePic,
          Validators.compose([
            ,
            Validators.maxLength(1000),
            Validators.required
          ])
        ],
        degree: [
          conference.degree,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        email: [
          conference.email,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        shortAbout: [
          conference.shortAbout,
          Validators.compose([Validators.maxLength(1000), Validators.required])
        ],
        about: [
          conference.about,
          Validators.compose([Validators.maxLength(10000), Validators.required])
        ]
      });
    }
  }
}
