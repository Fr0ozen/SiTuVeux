import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentComponent } from './tournaments/tournaments.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '', redirectTo: '/tournaments', pathMatch: 'full' },
  { path: 'tournaments', component: TournamentComponent },
  { path: 'match', component: MatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
