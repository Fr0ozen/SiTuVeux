import {Tournament} from './Tournament';
import {User} from './User';

export class Match {
    id: number;
    startinghour: Date;
    map: string;
    isstarted: boolean;
    isover: boolean;
    ranktournament: number;
    tournament: Tournament;
    referee: User;

    constructor(startinghour: Date, map: string, isstarted: boolean, isover: boolean, ranktournament: number, tournament: Tournament, referee: User) {
        this.startinghour = startinghour;
        this.map = map;
        this.isstarted = isstarted;
        this.isover = isover;
        this.ranktournament = ranktournament;
        this.tournament = tournament;
        this.referee = referee;
    }
}
