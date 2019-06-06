import { Player } from './Player';

export class Team {
    name: string;
    origin: string;
    playerList: Player[];

    constructor(name: string, origin: string, playerList: Player[]) {
      this.name = name;
      this.origin = origin;
      this.playerList = playerList;
    }
}
