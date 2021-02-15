import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularCodingResourcesModule } from '@tschuegge/angular-coding-resources';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LampeEinfachComponent } from './lampe-einfach/lampe-einfach.component';
import { LampeKomplettComponent } from './lampe-komplett/lampe-komplett.component';
import { AmpelEinfachComponent } from './ampel-einfach/ampel-einfach.component';
import { AmpelKomplettComponent } from './ampel-komplett/ampel-komplett.component';
import { LampeFuerAmpelEinfachComponent } from './lampe-fuer-ampel-einfach/lampe-fuer-ampel-einfach.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LampeEinfachComponent,
    LampeKomplettComponent,
    LampeFuerAmpelEinfachComponent,
    AmpelEinfachComponent,
    AmpelKomplettComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularCodingResourcesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
