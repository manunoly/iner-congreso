import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SpeakerPage } from '../speaker/speaker';
import { ConferencePage } from './../conference/conference';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  conferenceRoot = ConferencePage;
  speakerRoot = SpeakerPage;  
  aboutRoot = AboutPage;

  constructor() {

  }
}
