import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";

import { DataProvider } from "./../../providers/data";
import { AuthProvider } from "./../../providers/auth";

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
  isUserAuthenticated = false;

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
    this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.isUserAuthenticated = true;
      } else {
        this.isUserAuthenticated = false;
        this.navCtrl.push('start');
      }
    });
    this.locations = this.dataS.getLocation();
    this.smallDevice = this.dataS.isSmallDevice();
  }

  removeLocation(locationID) {
    if (this.isUserAuthenticated) {
      this.showupdateLocation = false;
      this.dataS.deleteLocation(locationID);
    }
  }

  loadLocationToEdit(location) {
    if (this.isUserAuthenticated) {
      this.showupdateLocation = true;
      this.locationForm.reset();
      this.showAddLocationForm(true);
      this.setLocationForm(location);
    }
  }

  updateLocation() {
    if (this.locationForm.valid && this.isUserAuthenticated) {
      this.dataS.updateLocation(this.locationForm.value);
      this.locationForm.reset();
      this.setLocationForm(undefined);
      this.showAddLocation = false;
      this.showupdateLocation = false;
      //FIXME: show notification result
    } else this.submitAttempt = true;
  }

  addLocation() {
    if (this.locationForm.valid && this.isUserAuthenticated) {
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
          Validators.compose([Validators.maxLength(100), Validators.required])
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
          Validators.compose([Validators.maxLength(100), Validators.required])
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
