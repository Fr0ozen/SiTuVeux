import { Player } from './Player';

export class Team {
<<<<<<< HEAD
=======
    id: number;
>>>>>>> ae07bf8a53530068c4628c063e1d572432abf496
    name: string;
    origin: string;
    playerList: Player[];

    constructor(name: string, origin: string, playerList: Player[]) {
      this.name = name;
      this.origin = origin;
      this.playerList = playerList;
    }
}
