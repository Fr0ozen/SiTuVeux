export class Player {
  id: number;
  fname: string;
  lname: string;
  pseudo: string;
  level: number;
  origin: string;
  sex: number;
  joiningDate: Date;
  isCapitain: boolean;

  constructor(fname: string, lname: string, pseudo: string, level: number, origin: string, sex: number,  joiningDate?: Date, isCapitain?: boolean) {
    this.fname = fname;
    this.lname = lname;
    this.pseudo = pseudo;
    this.level = level;
    this.origin = origin;
    this.sex = sex;
    this.joiningDate = joiningDate;
    this.isCapitain = isCapitain;
  }
}
