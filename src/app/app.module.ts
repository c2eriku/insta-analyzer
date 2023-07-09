import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ProfileCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
