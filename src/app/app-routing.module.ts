import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { TournamentComponent } from './_components/tournament/tournament.component';
import { MatchComponent } from './_components/match/match.component';
import { CreatePlayerComponent } from './_components/createPlayer/createPlayer.component';
import { CreateTeamComponent } from './_components/createTeam/createTeam.component';
import { CreateArenaComponent } from './_components/createArena/createArena.component';
import { CreateTournamentComponent } from './_components/createTournament/createTournament.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'createPlayer', component: CreatePlayerComponent, canActivate: [AuthGuard] },
  { path: 'createTeam', component: CreateTeamComponent, canActivate: [AuthGuard] },
  { path: 'createArena', component: CreateArenaComponent, canActivate: [AuthGuard]},
  { path: 'manageRounds', component: ManageRoundsComponent, canActivate: [AuthGuard]},
  { path: 'createTournament', component: CreateTournamentComponent, canActivate: [AuthGuard]},
  { path: 'tournaments', component: TournamentComponent },
  { path: 'match', component: MatchComponent },
  { path: '**', redirectTo: '/tournaments', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
