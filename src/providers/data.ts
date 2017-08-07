import { Injectable } from "@angular/core";
import { Platform, AlertController } from "ionic-angular";
import { ToastController } from "ionic-angular";

import { Observable } from 'rxjs/Rx';

import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database";
import { AuthProvider } from './auth';

@Injectable()
export class DataProvider {
  conferences: FirebaseListObservable<any>;
  speakers: FirebaseListObservable<any>;
  location: FirebaseListObservable<any>;
  topic: FirebaseListObservable<any>;
  favConfObj: any = null;
  favConf = [];
  smallDevice: boolean;
  userUid: string = "";

  constructor(
    private afDB: AngularFireDatabase,
    private authS: AuthProvider,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  loadData() {
    try {
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
      this.showNotification(
        "Usuario y Contraseña no son almacenadas por esta aplicación.",
        5000
      );
      this.getFavoriteConferenceObj();
    } catch (error) {
      console.log(error);
      this.showNotification("Ha ocurrido un error, contacte administrador");
    }
  }

  /*  getFavoriteConference() {
    return new Promise(dataP =>
      this.favConfObj.subscribe(favConf => {
        if (favConf)
          favConf.forEach(element => {
            this.favConf.push(element.$key);
          });
        return dataP(this.favConf);
      })
    );
  }*/

  private getFavoriteConferenceObj() {
    this.authS.getUser().subscribe(user => {
      if (user) {
        this.userUid = user.uid;
        this.favConfObj = this.afDB
          .list("/user/" + this.userUid + "/favorite")
          .catch(err => {
            this.userUid = "";
            this.favConf = [];
            return [];
          });
        this.favConfObj.subscribe(favConf => {
          this.favConf = [];
          if (favConf)
            favConf.forEach(element => {
              this.favConf.push(element.$key);
            });
        });
      } else {
        this.userUid = "";
        this.favConf = [];
      }
    });
  }

  isFavoriteConference(conferenceID) {
    if (this.favConf.indexOf(conferenceID) != -1) return true;
  }

  addFavorite(conferenceID) {
    if (this.userUid) {
      if (this.favConf.indexOf(conferenceID) == -1) {
        let dataConf = {};
        dataConf["conferenceID"] = conferenceID;
        let dir = "/user/" + this.userUid + "/favorite/" + conferenceID;
        this.afDB
          .object(dir)
          .set(dataConf)
          .then(_ => {
            let confAssistants = this.filterConference(
              conferenceID
            ).subscribe(conf => {
              this.conferences
                .update(conf[0].$key, {
                  assistants: conf[0].assistants + 1
                })
                .catch(err => {
                  console.log(err);
                });
              confAssistants.unsubscribe();
            });
            this.showNotification("Conferencia adicionada a favoritas");
          })
          .catch(_ => {
            this.showNotification(
              "Ha ocurrido un error adicionando la Conferencia"
            );
          });
      } else
        this.showNotification("La Conferencia ya se encuentra en favoritas");
    } else this.showNotification("Debe identificarse primero");
  }

  removeFavorite(conferenceID) {
    if (this.userUid) {
      if (this.favConf.indexOf(conferenceID) != -1) {
        this.favConfObj
          .remove(conferenceID)
          .then(_ => {
            let confAssistantsRest = this.filterConference(
              conferenceID
            ).subscribe(conf => {
              this.conferences
                .update(conf[0].$key, {
                  assistants: conf[0].assistants - 1
                })
                .catch(err => {
                  console.log(err);
                });
              confAssistantsRest.unsubscribe();
            });
            this.showNotification("Conferencia Eliminada de Favoritas");
          })
          .catch(_ => {
            this.showNotification(
              "Ha ocurrido un error eliminando la Conferencia"
            );
          });
      } else
        this.showNotification("La Conferencia no se encuentra en favoritas");
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
        return elem;
      }
    });
    return undefined;
  }

  rateConference(conferenceID, rate) {
    if (this.authS.isAuthenticated()) {
      let conference = this.filterConference(conferenceID).subscribe(conf => {
        let dir = "/data/conferences/" + conferenceID + "/rate";
        let data = {};
        data[this.userUid] = rate;
        let sum: number = 0;
        if (conf[0].rate) {
          let objData = conf[0].rate;
          objData["average"] = rate;
          delete objData[this.userUid];
          let values = Object.keys(objData).map(function(key) {
            return objData[key];
          });
          values.forEach(element => {
            sum = sum + element;
          });
          data["average"] = Math.round(sum / values.length);
        } else data["average"] = rate;
        this.afDB
          .object(dir)
          .update(data)
          .then(_ => {
            this.showNotification("La Conferencia ha sido Valorada");
            conference.unsubscribe();
          })
          .catch(_ => {
            this.showNotification(
              "Ha ocurrido un error valorando la Conferencia"
            );
            conference.unsubscribe();
          });
      });
    } else this.showNotification("Debe identificarse primero");
  }

  filterConferences(
    searchTerm = "",
    day = [],
    topic = [],
    favorite = false,
    speakerID = ""
  ) {
    if (!speakerID) {
      let dayLength = day.length;
      let topicLength = topic.length;
      if (searchTerm === "" && dayLength == 0 && topicLength == 0 && !favorite)
        return this.conferences;
      else if (
        searchTerm === "" &&
        dayLength == 0 &&
        topicLength == 0 &&
        favorite
      )
        return this.conferences.map(data =>
          data.filter(dato => this.favConf.indexOf(dato.$key) != -1)
        );
      else if (
        searchTerm != "" &&
        dayLength == 0 &&
        topicLength == 0 &&
        !favorite
      ) {
        console.log("filtrar solo por texto conf");
        return this.conferences.map(data =>
          data.filter(dato =>
            dato.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else if (
        searchTerm != "" &&
        dayLength == 0 &&
        topicLength == 0 &&
        favorite
      ) {
        console.log("filtrar por texto conf y fav");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              this.favConf.indexOf(dato.$key) != -1
          )
        );
      } else if (
        searchTerm === "" &&
        dayLength > 0 &&
        topicLength == 0 &&
        !favorite
      ) {
        console.log("filtrar solo por dia");
        return this.conferences.map(data =>
          data.filter(dato => dato.day == day[day.indexOf(dato.day)])
        );
      } else if (
        searchTerm === "" &&
        dayLength > 0 &&
        topicLength == 0 &&
        !favorite
      ) {
        console.log("filtrar solo por dia y fav");
        return this.conferences.map(data =>
          data.filter(dato => dato.day == day[day.indexOf(dato.day)])
        );
      } else if (
        searchTerm === "" &&
        dayLength == 0 &&
        topicLength > 0 &&
        favorite
      ) {
        console.log("filtrar solo por tema y favo");
        return this.conferences.map(data =>
          data.filter(dato =>
            dato.topic.some(
              elem =>
                elem.topicID === topic[topic.indexOf(elem.topicID)] &&
                this.favConf.indexOf(dato.$key) != -1
            )
          )
        );
      } else if (
        searchTerm === "" &&
        dayLength == 0 &&
        topicLength > 0 &&
        favorite
      ) {
        console.log("filtrar solo por tema y fav");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.topic.some(
                elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
              ) && this.favConf.indexOf(dato.$key) != -1
          )
        );
      } else if (
        searchTerm != "" &&
        dayLength > 0 &&
        topicLength == 0 &&
        !favorite
      ) {
        console.log("filtrar solo por dia y texto");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              dato.day === day[day.indexOf(dato.day)]
          )
        );
      } else if (
        searchTerm != "" &&
        dayLength > 0 &&
        topicLength == 0 &&
        favorite
      ) {
        console.log("filtrar solo por dia y texto y fav");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              dato.day === day[day.indexOf(dato.day)] &&
              this.favConf.indexOf(dato.$key) != -1
          )
        );
      } else if (
        searchTerm != "" &&
        dayLength == 0 &&
        topicLength > 0 &&
        !favorite
      ) {
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
      } else if (
        searchTerm != "" &&
        dayLength == 0 &&
        topicLength > 0 &&
        favorite
      ) {
        console.log("filtrar solo por texto y tematica y fav");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              dato.topic.some(
                elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
              ) &&
              this.favConf.indexOf(dato.$key) != -1
          )
        );
      } else if (
        searchTerm === "" &&
        dayLength > 0 &&
        topicLength > 0 &&
        !favorite
      ) {
        console.log("filtrar solo por dia y tema");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.topic.some(
                elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
              ) && dato.day == day[day.indexOf(dato.day)]
          )
        );
      } else if (
        searchTerm === "" &&
        dayLength > 0 &&
        topicLength > 0 &&
        favorite
      ) {
        console.log("filtrar solo por dia y tema y fav");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.topic.some(
                elem => elem.topicID == topic[topic.indexOf(elem.topicID)]
              ) &&
              dato.day == day[day.indexOf(dato.day)] &&
              this.favConf.indexOf(dato.$key) != -1
          )
        );
      } else if (
        searchTerm != "" &&
        dayLength > 0 &&
        topicLength > 0 &&
        !favorite
      ) {
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
      } else if (
        searchTerm != "" &&
        dayLength > 0 &&
        topicLength > 0 &&
        favorite
      ) {
        console.log("filtrar por texto, dia y tema y fav");
        return this.conferences.map(data =>
          data.filter(
            dato =>
              dato.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
              dato.day == day[day.indexOf(dato.day)] &&
              dato.topic.some(
                elem => elem.topicID === topic[topic.indexOf(elem.topicID)]
              ) &&
              this.favConf.indexOf(dato.$key) != -1
          )
        );
      }
    } else {
      console.log("Conf para speaker");
      return this.conferences.map(data =>
        data.filter(dato =>
          dato.speakers.some(elem => elem.speakerID === speakerID)
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
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let date = conference.date.split("-");
        this.conferences
          .push({
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
            topic: conference.topic,
            assistants: 0
          })
          .then(a => {
            this.showNotification("Conferencia adicionada correctamente");
          })
          .catch(a => {
            this.showNotification(
              "Ha ocurrido un error adicionando la Conferencia"
            );
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
  }

  updateConference(conference) {
    let observer = this.authS.isAdmin().subscribe(permission => {
      if (permission.val() !== null) {
        let date = conference.date.split("-");
        this.conferences
          .update(conference.id, {
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
          })
          .then(a => {
            this.showNotification("Conferencia actualizada correctamente");
          })
          .catch(a => {
            this.showNotification(
              "Ha ocurrido un error actualizando la Conferencia"
            );
          });
      } else this.showNotification("No tiene permisos.");
      observer.unsubscribe();
    });
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
            googleScholar: speaker.googleScholar,
            linkedin: speaker.linkedin,
            twitter: speaker.twitter,
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
        this.speakers
          .update(speaker.id, {
            name: speaker.name,
            profilePic: speaker.profilePic,
            shortAbout: speaker.shortAbout,
            about: speaker.about,
            email: speaker.email
          })
          .then(_ => {
            this.showNotification("Ponente actualizado correctamente");
          })
          .catch(_ => {
            this.showNotification("El Ponente no pudo ser actualizado");
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
            location: location.location,
            capacity: location.capacity
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
            location: location.location,
            capacity: location.capacity
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
