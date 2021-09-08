import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { UserCardComponent } from './user-card/user-card.component';
import { UserApiService } from './user-api.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    UserApiService,
    HttpClient
  ],
  entryComponents: [
    UserFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
