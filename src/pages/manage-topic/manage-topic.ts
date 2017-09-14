import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";

import { DataProvider } from "./../../providers/data";
import { AuthProvider } from "./../../providers/auth";

@IonicPage()
@Component({
  selector: "page-manage-topic",
  templateUrl: "manage-topic.html"
})
export class ManageTopicPage {
  submitAttempt: boolean;
  topicForm: any;
  topics: any;
  showAddTopic = false;
  smallDevice: boolean;
  showupdateTopic = false;
  isUserAuthenticated = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataProvider,
    private authS: AuthProvider,
    private formBuilder: FormBuilder
  ) {
    this.setTopicForm(undefined);
  }

  ionViewDidLoad() {
    let adminCheck = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.isUserAuthenticated = true;
      } else {
        this.isUserAuthenticated = false;
        this.navCtrl.push("start");
        adminCheck.unsubscribe();
      }
    });
    this.topics = this.dataS.getTopic();
    this.smallDevice = this.dataS.isSmallDevice();
  }

  removeTopic(topicID) {
    if (this.isUserAuthenticated) {
      this.showupdateTopic = false;
      this.dataS.deleteTopic(topicID);
    }
  }

  loadTopicToEdit(topic) {
    if (this.isUserAuthenticated) {
      this.showupdateTopic = true;
      this.topicForm.reset();
      this.showAddTopicForm(true);
      this.setTopicForm(topic);
    }
  }

  updateTopic() {
    if (this.topicForm.valid && this.isUserAuthenticated) {
      this.dataS.updateTopic(this.topicForm.value);
      this.topicForm.reset();
      this.setTopicForm(undefined);
      this.showAddTopic = false;
      this.showupdateTopic = false;
    } else this.submitAttempt = true;
  }

  addTopic() {
    if (this.topicForm.valid && this.isUserAuthenticated) {
      this.dataS.addTopic(this.topicForm.value);
      this.topicForm.reset();
      this.setTopicForm(undefined);
    } else this.submitAttempt = true;
  }

  showAddTopicForm(showAddTopic = false) {
    this.showAddTopic = showAddTopic;
  }
  setTopicForm(topic) {
    /**
     * Error: formGroup expects a FormGroup instance. Please pass one in.

       Example:


    <div [formGroup]="myGroup">
      <input formControlName="firstName">
    </div>

    In your class:

    this.myGroup = new FormGroup({
       firstName: new FormControl()
    });
     */
    if (topic === undefined) {
      this.topicForm = this.formBuilder.group({
        topic: [
          "",
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        profilePic: [
          "assets/icon/favicon.ico",
          Validators.compose([
            ,
            Validators.maxLength(1000),
            Validators.required
          ])
        ],
        description: [
          "",
          Validators.compose([Validators.maxLength(1000), Validators.required])
        ]
      });
    } else {
      this.topicForm = this.formBuilder.group({
        id: [topic.$key],
        topic: [
          topic.topic,
          Validators.compose([Validators.maxLength(100), Validators.required])
        ],
        profilePic: [
          topic.profilePic,
          Validators.compose([
            ,
            Validators.maxLength(1000),
            Validators.required
          ])
        ],
        description: [
          topic.description,
          Validators.compose([Validators.maxLength(1000), Validators.required])
        ]
      });
    }
  }
}
