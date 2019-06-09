import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './_components/header/header.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';

import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { TournamentComponent } from './_components/tournaments/tournaments.component';
import { MatchComponent } from './_components/match/match.component';
import { CreatePlayerComponent } from './_components/createPlayer/createPlayer.component';

import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { InputDropdownComponent } from './_components/inputDropdown/inputDropdown.component';
import { CreateTeamComponent } from './_components/createTeam/createTeam.component';
import { SpinnerComponent } from './_components/spinner/spinner.component';
import { SpinnerInterceptor } from './_interceptors/spinner.interceptor';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
<<<<<<< HEAD
import { EncounterComponent } from './_components/encounter/encounter.component';
=======
import { CreateArenaComponent } from './_components/createArena/createArena.component';
>>>>>>> ae07bf8a53530068c4628c063e1d572432abf496

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    TournamentComponent,
    MatchComponent,
    CreatePlayerComponent,
    InputDropdownComponent,
    CreateTeamComponent,
    SpinnerComponent,
<<<<<<< HEAD
    EncounterComponent
=======
    CreateArenaComponent
>>>>>>> ae07bf8a53530068c4628c063e1d572432abf496
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr' }
  ],
  bootstrap: [ HeaderComponent ]
})
export class AppModule {}
