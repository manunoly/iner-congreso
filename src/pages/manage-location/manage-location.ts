import { Component } from "@angular/core";
import { IonicPage,NavController, NavParams } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";

import { HomePage } from "./../home/home";
import { DataProvider } from '../../providers/data';
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: "page-manage-location",
  templateUrl: "manage-location.html"
})

export class ManageLocationPage {
  submitAttempt: boolean;
  locationForm: any;
  locations: any;
  showAddLocation = false;
  smallDevice: boolean;
  showupdateLocation = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider,
    private authS: AuthProvider,
    private formBuilder: FormBuilder
  ) {
    this.setLocationForm(undefined);
  }

  ionViewDidLoad() {
    if (!this.isAuthenticated()) this.navCtrl.push(HomePage);
    this.locations = this.dataS.getLocation();
    this.smallDevice = this.dataS.isSmallDevice();
  }

  removeLocation(locationID) {
    this.showupdateLocation = false;
    this.dataS.deleteLocation(locationID);
  }

  loadLocationToEdit(location) {
    this.showupdateLocation = true;
    this.locationForm.reset();
    this.showAddLocationForm(true);
    this.setLocationForm(location);
  }

  updateLocation() {
    if (this.locationForm.valid) {
      this.dataS.updateLocation(this.locationForm.value);
      this.locationForm.reset();
      this.setLocationForm(undefined);
      this.showAddLocation = false;
      this.showupdateLocation = false;
      //FIXME: show notification result
    } else this.submitAttempt = true;
  }

  isAuthenticated() {
    return this.authS.isAuthenticated();
  }

  addLocation() {
    if (this.locationForm.valid) {
      console.log(this.locationForm.valid);
      this.dataS.addLocation(this.locationForm.value);
      this.locationForm.reset();
      this.setLocationForm(undefined);
    } else this.submitAttempt = true;
  }

  showAddLocationForm(showAddLocation = false) {
    this.showAddLocation = showAddLocation;
  }

  setLocationForm(location) {
    if (location === undefined) {
      this.locationForm = this.formBuilder.group({
        name: [
          "",
          Validators.compose([
            Validators.maxLength(100),
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
        location: [
          "",
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        capacity: [
          "",
          Validators.compose([Validators.maxLength(3), Validators.required])
        ]
      });
    } else {
      this.locationForm = this.formBuilder.group({
        id: [location.$key],
        name: [
          location.name,
          Validators.compose([
            Validators.maxLength(100),
            Validators.required
          ])
        ],
        profilePic: [
          location.profilePic,
          Validators.compose([
            ,
            Validators.maxLength(1000),
            Validators.required
          ])
        ],
        location: [
          location.location,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        capacity: [
          location.capacity,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ]
      });
    }
  }
}
