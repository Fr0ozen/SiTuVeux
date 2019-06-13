import {Team} from './Team';
import {Match} from './Match';

export class Round {
    match: Match;
    team: Team;
    roundnumber: number;
    startingtime: Date;
    endingtime: Date;
    isct: boolean;
    iswinner: boolean;

    constructor(match: Match, team: Team, roundnumber: number, startingtime: Date, endingtime: Date, isct: boolean, iswinner: boolean) {
        this.match = match;
        this.team = team;
        this.roundnumber = roundnumber;
        this.startingtime = startingtime;
        this.endingtime = endingtime;
        this.isct = isct;
        this.iswinner = iswinner;
    }
}

