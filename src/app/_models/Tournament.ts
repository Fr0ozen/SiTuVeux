import {Arena} from './Arena';

export class Tournament {
    id: number;
    arena: Arena;
    name: string;
    cashprize: number;
    sponsor: string;

    constructor(arena: Arena, name: string, cashprize: number, sponsor: string) {
        this.arena = arena;
        this.name = name;
        this.cashprize = cashprize;
        this.sponsor = sponsor;
    }
}
