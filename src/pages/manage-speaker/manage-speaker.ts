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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService,
    private authS: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.setSpeakerForm();
  }

  removeSpeaker(speakerID){
    console.log(speakerID);
  }

  editSpeaker(speakerID){
    console.log(speakerID);
  }
  
  ionViewDidLoad() {
    if (!this.isAuthenticated()) this.navCtrl.push(HomePage);
        this.speakers = this.dataS.filterSpeakers("");

  }

  setSpeakerForm() {
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
        Validators.compose([, Validators.maxLength(1000), Validators.required])
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
  }
  isAuthenticated() {
    return this.authS.isAuthenticated();
  }
  addSpeaker() {
    if (this.speakerForm.valid) {
      let a = this.dataS.addSpeaker(this.speakerForm.value);
      this.speakerForm.reset();
      this.setSpeakerForm();
      console.log(a);
    } else this.submitAttempt = true;
  }
}
