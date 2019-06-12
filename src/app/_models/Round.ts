export class Round {
    idmatch: number;
    idteam: number;
    roundnumber: number;
    startingtime: Date;
    endingtime: Date;
    isct: boolean;
    iswinner: boolean;

    constructor(idmatch: number, idteam: number, roundnumber: number, startingtime: Date, endingtime: Date, isct: boolean, iswinner: boolean) {
        this.idmatch = idmatch;
        this.idteam = idteam;
        this.roundnumber = roundnumber;
        this.startingtime = startingtime;
        this.endingtime = endingtime;
        this.isct = isct;
        this.iswinner = iswinner;
    }
}

