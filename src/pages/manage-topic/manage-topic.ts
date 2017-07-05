import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";

import { HomePage } from "./../home/home";
import { DataService } from "./../service/data.service";
import { AuthService } from "./../service/auth.service";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataS: DataService,
    private authS: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.setTopicForm(undefined);
  }

  ionViewDidLoad() {
    if (!this.isAuthenticated()) this.navCtrl.push(HomePage);
    this.topics = this.dataS.getTopic();
    this.smallDevice = this.dataS.isSmallDevice();
  }

  removeTopic(topicID) {
    this.showupdateTopic = false;
    this.dataS.deleteTopic(topicID);
  }

  loadTopicToEdit(topic) {
    this.showupdateTopic = true;
    this.topicForm.reset();
    this.showAddTopicForm(true);
    this.setTopicForm(topic);
  }

  updateTopic() {
    if (this.topicForm.valid) {
      this.dataS.updateTopic(this.topicForm.value);
      this.topicForm.reset();
      this.setTopicForm(undefined);
      this.showAddTopic = false;
      this.showupdateTopic = false;
    } else this.submitAttempt = true;
  }

  isAuthenticated() {
    return this.authS.isAuthenticated();
  }

  addTopic() {
    if (this.topicForm.valid) {
      this.dataS.addTopic(this.topicForm.value);
      this.topicForm.reset();
      this.setTopicForm(undefined);
    } else this.submitAttempt = true;
  }

  showAddTopicForm(showAddTopic = false) {
    this.showAddTopic = showAddTopic;
  }

  setTopicForm(topic) {
    if (topic === undefined) {
      this.topicForm = this.formBuilder.group({
        topic: [
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
          Validators.compose([
            Validators.maxLength(100),
            Validators.required
          ])
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
