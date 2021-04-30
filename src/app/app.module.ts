import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StationsComponent} from './components/stations/stations.component';
import { PopupComponent } from './components/popup/popup.component';
import { StationPipe } from './pipes/station.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StationsComponent,
    StationPipe,
    PopupComponent,
    StationPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
