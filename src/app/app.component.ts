import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rtdb-preview';

  readonly rootRef: firebase.database.Reference;

  constructor() {
    const app = firebase.initializeApp(environment.firebase, `rtdb-preview:${Math.random()}`);
    const rtdb = app.database();
    this.rootRef = rtdb.ref();
  }

  readonly rtdbConfig = environment.firebase;
}
