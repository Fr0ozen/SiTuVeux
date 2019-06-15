import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './_components/login/login.component';
import {AuthGuard} from './_guards/auth.guard';
import {TournamentComponent} from './_components/tournament/tournament.component';
import {CreatePlayerComponent} from './_components/createPlayer/createPlayer.component';
import {CreateTeamComponent} from './_components/createTeam/createTeam.component';
import {CreateArenaComponent} from './_components/createArena/createArena.component';
import {CreateTournamentComponent} from './_components/createTournament/createTournament.component';
import {ManageMatchComponent} from './_components/manageMatch/manageMatch.component';
import {BracketComponent} from './_components/bracket/bracket.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'createPlayer', component: CreatePlayerComponent, canActivate: [AuthGuard]},
    {path: 'createTeam', component: CreateTeamComponent, canActivate: [AuthGuard]},
    {path: 'createArena', component: CreateArenaComponent, canActivate: [AuthGuard]},
    {path: 'manageMatch', component: ManageMatchComponent, canActivate: [AuthGuard]},
    {path: 'createTournament', component: CreateTournamentComponent, canActivate: [AuthGuard]},
    {path: 'tournaments', component: TournamentComponent},
    {path: 'bracket', component: BracketComponent},
    {path: '**', redirectTo: '/tournaments', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
