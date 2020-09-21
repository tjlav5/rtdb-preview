import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RtdbModule } from 'rtdb';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RtdbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
