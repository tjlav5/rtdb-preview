import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import * as firebase from 'firebase/app';

interface RtdbConfig {
  databaseUrl: string;
  apiKey: string;
}

@Component({
  selector: 'rtdb',
  template: `
  <div class="host" rtdbScrollHost>
    <rtdb-node [ref]="ref"></rtdb-node>
  </div>
  `,
  styles: [
    '.host {height: 100%; overflow: scroll;}'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RtdbComponent {
  @Input() ref: firebase.database.Reference;

  ngOnChanges() {
    console.log(this.ref)
  }
}
