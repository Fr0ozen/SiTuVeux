import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { TournamentComponent } from './tournaments/tournaments.component';
import { MatchComponent } from './match/match.component';
import { HeaderComponent } from './header/header.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TournamentComponent,
    MatchComponent,
    TeamComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ HeaderComponent ]
})
export class AppModule { }
