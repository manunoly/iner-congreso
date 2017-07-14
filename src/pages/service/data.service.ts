import { Injectable } from "@angular/core";
import { Platform, AlertController } from "ionic-angular";
import { ToastController } from "ionic-angular";

import "rxjs/Rx";

import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AuthService } from "./auth.service";

@Injectable()
export class DataService {
  conferences: FirebaseListObservable<any>;
  speakers: FirebaseListObservable<any>;
  location: FirebaseListObservable<any>;
  topic: FirebaseListObservable<any>;
  favConfObj: FirebaseListObservable<any>;
  favConf = [];
  smallDevice: boolean;
  user: any;
  userUid: string = "";

  constructor(
    private afDB: AngularFireDatabase,
    private authS: AuthService,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  loadData() {
    this.afDB.list("/data").subscribe();
    this.speakers = this.afDB.list("/data/speakers", {
      query: {
        orderByChild: "name"
      }
    });
    this.conferences = this.afDB.list("/data/conferences", {
      query: {
        orderByChild: "date"
      }
    });
    this.location = this.afDB.list("/data/location", {
      query: {
        orderByChild: "name"
      }
    });
    this.topic = this.afDB.list("/data/topic", {
      query: {
        orderByChild: "topic"
      }
    });
    this.authS.getUser().subscribe(user => {
      if (this.authS.isAuthenticated()) {
        this.user.subscribe(user => {
          if (this.authS.isAuthenticated()) {
            this.userUid = user.uid;
          }
        });
      }
    });
    this.showNotification(
      "Usuario y Contraseña no son almacenadas por esta aplicación.",
      5000
    );
  }

  getFavoriteConference() {
    if (this.authS.isAuthenticated) {
      this.favConfObj = this.afDB.list("/user/" + this.userUid + "/favorite");
      return this.favConfObj;
    }
  }

  addFavorite(conferenceID) {
    if (this.authS.isAuthenticated()) {
      this.afDB
        .list(`/user/${this.userUid}/favorite/${conferenceID}`)
        .push(conferenceID)
        .then(_ => {
          this.showNotification("Conferencia addionada a favoritas");
        })
        .catch(_ => {
          this.showNotification(
            "Ha ocurrido un error adicionando la Conferencia"
          );
        });
    } else this.showNotification("Debe identificarse primero");
  }

  removeFavorite(conferenceID) {
    if (this.authS.isAuthenticated()) {
      this.favConfObj
        .remove(conferenceID)
        .then(_ => {
          this.showNotification("Conferencia Eliminada");
        })
        .catch(_ => {
          this.showNotification(
            "Ha ocurrido un error eliminando la Conferencia"
          );
        });
    } else this.showNotification("Debe identificarse primero");
  }

  isSmallDevice() {
    if (this.smallDevice === undefined) {
      if (this.platform.width() > 575) this.smallDevice = false;
      else this.smallDevice = true;
    }
    return this.smallDevice;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  checkTopic(dato = [], topic = []) {
    dato.forEach(elem => {
      if (elem.topicID == topic[topic.indexOf(elem.topicID)]) {
        console.log("si esta el id");
        return elem;
      }
    });
    return undefined;
  }

  filterConferences(searchTerm = "", day = [], topic = []) {
    console.log(searchTerm);
    console.log(day);
    console.log(topic);
    let dayLength = day.length;
    let topicLength = topic.length;
    if (searchTerm === "" && dayLength == 0 && topicLength == 0)
      return this.conferences;

    if (searchTerm != "" && dayLength == 0 && topicLength == 0) {
      console.log("filtrar solo por texto conf");
      return this.conferences.map(data =>
        data.filter(dato =>
          dato.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (searchTerm === "" && dayLength > 0 && topicLength == 0) {
      console.log("filtrar solo por dia");
      return this.conferences.map(data =>
        data.filter(dato => dato.day == day[day.indexOf(dato.day)])
      );
    } else if (searchTerm === "" && dayLength == 0 && topicLength > 0) {
      console.log("filtrar solo por tema");
      return this.conferences.map(data =>
        data.filter(dato =>
          dato.topic.some(
            elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
          )
        )
      );
    } else if (searchTerm != "" && dayLength > 0 && topicLength == 0) {
      console.log("filtrar solo por dia y texto");
      return this.conferences.map(data =>
        data.filter(
          dato =>
            dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            dato.day === day[day.indexOf(dato.day)]
        )
      );
    } else if (searchTerm != "" && dayLength == 0 && topicLength > 0) {
      console.log("filtrar solo por texto y tematica");
      return this.conferences.map(data =>
        data.filter(
          dato =>
            dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            dato.topic.some(
              elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
            )
        )
      );
    } else if (searchTerm === "" && dayLength > 0 && topicLength > 0) {
      console.log("filtrar solo por dia y tema");
      return this.conferences.map(data =>
        data.filter(
          dato =>
            dato.topic.some(
              elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
            ) && dato.day == day[day.indexOf(dato.day)]
        )
      );
    } else if (searchTerm != "" && dayLength > 0 && topicLength > 0) {
      console.log("filtrar por texto, dia y tema");
      return this.conferences.map(data =>
        data.filter(
          dato =>
            dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            dato.day == day[day.indexOf(dato.day)] &&
            dato.topic.some(
              elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
            )
        )
      );
    }
  }

  filterConference(conferenceID) {
    return this.conferences.map(data =>
      data.filter(dato => dato.$key == conferenceID)
    );
  }

  addConference(conference) {
    let date = conference.date.split("-");
    if (this.authS.isAuthenticated()) {
      this.conferences.push({
        title: conference.title,
        profilePic: conference.profilePic,
        shortDescription: conference.shortDescription,
        description: conference.description,
        day: date[2],
        date: conference.date + " " + conference.timeStart,
        timeStart: conference.timeStart,
        timeEnd: conference.timeEnd,
        speakers: conference.speakers,
        location: conference.location,
        topic: conference.topic
      });
    }
  }

  updateConference(conference) {
    if (this.authS.isAuthenticated()) {
      this.conferences.update("123", {
        title: "Las Energias Limpias",
        location: "Room 2203",
        shortDescription: "Mobile devices and browsers",
        description:
          "Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies like HTML5, Javascript, and CSS. In this talk, we’ll provide background on why and how we created Ionic, the design decisions made as we integrated Ionic with Angular, and the performance considerations for mobile platforms that our team had to overcome. We’ll also review new and upcoming Ionic features, and talk about the hidden powers and benefits of combining mobile app development and Angular.",
        speakers: [
          { name: "Molly Mouse", speakerID: "123" },
          { name: "Burt Bear", speakerID: "1234" }
        ],
        day: "21",
        timeStart: "1:30 pm",
        timeEnd: "2:00 pm",
        topic: ["Services", "Data Manipulation"]
      });
    }
  }

  deleteConference(conferenceID) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let alert = this.alertCtrl.create({
          title: "Confirmación",
          message: "¿Seguro desea eliminar?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Eliminar",
              handler: () => {
                this.conferences
                  .remove(conferenceID)
                  .then(_ => {
                    this.showNotification(
                      "Conferencia Eliminada correctamente"
                    );
                  })
                  .catch(_ => {
                    this.showNotification("No se pudo eliminar la Conferencia");
                  });
              }
            }
          ]
        });
        alert.present();
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  filterSpeaker(speakerID = "") {
    return this.speakers.map(data =>
      data.filter(dato => dato.$key == speakerID)
    );
  }

  filterSpeakers(searchTerm) {
    if (searchTerm === "") return this.speakers;
    return this.speakers.map(data =>
      data.filter(dato =>
        dato.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  addSpeaker(speaker) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.speakers
          .push({
            name: speaker.name,
            degree: speaker.degree,
            profilePic: speaker.profilePic,
            shortAbout: speaker.shortAbout,
            about: speaker.about,
            /* conferences: [
          { title: "Molly Mouse", conferenceID: "123" },
          { title: "Burt Bear", conferenceID: "1234" }
        ],*/
            email: speaker.email
          })
          .then(a => {
            this.showNotification("Ponente adicionado correctamente");
          })
          .catch(a => {
            this.showNotification(
              "Ha ocurrido un error adicionando el Ponente"
            );
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  updateSpeaker(speaker) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let speakerU = this.filterSpeaker(speaker.id).subscribe(oldSpeaker => {
          let conf = "";
          if (
            typeof oldSpeaker != "undefined" &&
            oldSpeaker.length == 1 &&
            "conferences" in oldSpeaker[0]
          ) {
            conf = oldSpeaker[0].conferences;
          }
          return this.speakers
            .update(speaker.id, {
              name: speaker.name,
              profilePic: speaker.profilePic,
              shortAbout: speaker.shortAbout,
              about: speaker.about,
              conferences: conf,
              email: speaker.email
            })
            .then(_ => {
              speakerU.unsubscribe();
              this.showNotification("Ponente actualizado correctamente");
            })
            .catch(_ => {
              speakerU.unsubscribe();
            });
        });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  deleteSpeaker(speakerID) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let alert = this.alertCtrl.create({
          title: "Confirmación",
          message: "¿Seguro desea eliminar?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Eliminar",
              handler: () => {
                this.speakers
                  .remove(speakerID)
                  .then(_ => {
                    this.showNotification("Ponente Eliminado correctamente");
                  })
                  .catch(_ => {
                    this.showNotification("No se pudo eliminar el Ponente");
                  });
              }
            }
          ]
        });
        alert.present();
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  filterLocation(locationID = "") {
    return this.location.map(data =>
      data.filter(dato => dato.$key == locationID)
    );
  }

  getLocation() {
    return this.location;
  }

  addLocation(location) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.location
          .push({
            name: location.name,
            profilePic: location.profilePic,
            location: location.location
          })
          .then(a => {
            this.showNotification("Lugar adicionado correctamente");
          })
          .catch(a => {
            this.showNotification("Ha ocurrido un error adicionando el Lugar");
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  updateLocation(location) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.location
          .update(location.id, {
            name: location.name,
            profilePic: location.profilePic,
            location: location.location
          })
          .then(_ => {
            this.showNotification("Lugar actualizado correctamente");
          })
          .catch(_ => {
            this.showNotification("No se pudo eliminar el Lugar");
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  deleteLocation(locationID) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let alert = this.alertCtrl.create({
          title: "Confirmación",
          message: "¿Seguro desea eliminar?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Eliminar",
              handler: () => {
                this.location
                  .remove(locationID)
                  .then(_ => {
                    this.showNotification("Ponente Eliminado correctamente");
                  })
                  .catch(_ => {
                    this.showNotification("No se pudo eliminar el Ponente");
                  });
              }
            }
          ]
        });
        alert.present();
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  filterTopic(locationID = "") {
    return this.location.map(data =>
      data.filter(dato => dato.$key == locationID)
    );
  }

  getTopic() {
    return this.topic;
  }

  addTopic(topic) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.topic
          .push({
            topic: topic.topic,
            profilePic: topic.profilePic,
            description: topic.description
          })
          .then(a => {
            this.showNotification("Tema adicionado correctamente");
          })
          .catch(a => {
            this.showNotification("Ha ocurrido un error adicionando el Tema");
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  updateTopic(topic) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        this.topic
          .update(topic.id, {
            topic: topic.topic,
            profilePic: topic.profilePic,
            description: topic.description
          })
          .then(_ => {
            this.showNotification("Tema actualizado correctamente");
          })
          .catch(_ => {
            this.showNotification("No se pudo eliminar el Tema");
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  deleteTopic(topicID) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let alert = this.alertCtrl.create({
          title: "Confirmación",
          message: "¿Seguro desea eliminar?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                console.log("Cancel clicked");
              }
            },
            {
              text: "Eliminar",
              handler: () => {
                this.topic
                  .remove(topicID)
                  .then(_ => {
                    this.showNotification("Tema Eliminado correctamente");
                  })
                  .catch(_ => {
                    this.showNotification("No se pudo eliminar el Tema");
                  });
              }
            }
          ]
        });
        alert.present();
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  showNotification(message, time = 3000) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: time,
      position: "top",
      // cssClass: "text-center toastStyle",
      dismissOnPageChange: true
    });
    toast.present();
  }
}
