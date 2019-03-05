import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LampeComponent } from './lampe/lampe.component';
import { AmpelComponent } from './ampel/ampel.component';

@NgModule({
  declarations: [
    AppComponent,
    LampeComponent,
    AmpelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
