import { Component } from '@angular/core';
import { Tournament } from '../_models/Tournament';
import { Arena } from '../_models/Arena';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})

export class TournamentComponent {
  title = 'Tournois';
  arena: Arena = {
    id: 1,
    name: 'Pérols',
    town: 'Pérols'
  };
  tournaments = Tournois;
}

export const Tournois: Tournament[] = [
  {id:1, arena: {id: 1, name:'Arena', town:'Pérols'}, name:'Sud de France CS GO', cashprize:50000, sponsor: 'Agglo Montpellier'}
 ,{id:2, arena: {id: 3, town:'Montpellier', name:'Zenith Sud de France'}, name:'Major', cashprize:700000, sponsor: 'Twitch'}
 ,{id:3, arena: {id: 3, town:'Montpellier', name:'Zenith Sud de France'}, name:'Qualifiers', cashprize:0, sponsor: 'Vodafone'}
 ,{id:4, arena: {id: 4, town:'Séoul', name:'LoL Park'}, name:'Qualifiers', cashprize:0, sponsor: 'TRTO'}
 ,{id:5, arena: {id: 2, town:'Montpellier', name:'Zenith Sud de France'}, name:'Qualifiers', cashprize:0, sponsor: 'MSI'}
];
