import { Component } from '@angular/core';
import { Player } from '../_models/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent {

}

export const Players: Player[] = [
   {id: 1 , firstName: 'Nicholas ', lastName: 'Cannella ', pseudo: 'nitr0 ', level: 256 , origin: 'US ', sex: 1}
  ,{id: 2 , firstName: 'Jonathan ', lastName: 'Jablonowski ', pseudo: 'EliGE ', level: 300 , origin: 'US ', sex: 1}
  ,{id: 3 , firstName: 'Russel ', lastName: 'Van Dulken ', pseudo: 'Twistzz ', level: 450 , origin: 'CA ', sex: 1}
  ,{id: 4 , firstName: 'Keith ', lastName: 'Markovic ', pseudo: 'NAF ', level: 238 , origin: 'CA ', sex: 1}
  ,{id: 5 , firstName: 'Jacky ', lastName: 'Yip ', pseudo: 'Stewie2K ', level: 300 , origin: 'US ', sex: 1}
  ,{id: 6 , firstName: 'Nicolai ', lastName: 'Reedtz ', pseudo: 'dev1ce ', level: 285 , origin: 'DK ', sex: 1}
  ,{id: 7 , firstName: 'Peter ', lastName: 'Rasumussen ', pseudo: 'dupreeh ', level: 356 , origin: 'DK ', sex: 1}
  ,{id: 8 , firstName: 'Andreas ', lastName: 'Hojsleth ', pseudo: 'Xyp9x ', level: 387 , origin: 'DK ', sex: 1}
  ,{id: 9 , firstName: 'Lukas ', lastName: 'Rosander ', pseudo: 'gla1ve ', level: 356 , origin: 'DK ', sex: 1}
  ,{id: 10 , firstName: 'Emil ', lastName: 'Reif ', pseudo: 'Magisk ', level: 364 , origin: 'DK ', sex: 1}
  ,{id: 11 , firstName: 'Ioann ', lastName: 'Sukhariev ', pseudo: 'Edward ', level: 300 , origin: 'UA ', sex: 1}
  ,{id: 12 , firstName: 'Egor ', lastName: 'Vasilyev ', pseudo: 'flamie ', level: 315 , origin: 'RU ', sex: 1}
  ,{id: 13 , firstName: 'Oleksandr ', lastName: 'Kostyliev ', pseudo: 's1mple ', level: 320 , origin: 'UA ', sex: 1}
  ,{id: 14 , firstName: 'Danylo ', lastName: 'Teslenko ', pseudo: 'Zeus ', level: 317 , origin: 'UA ', sex: 1}
  ,{id: 15 , firstName: 'Denis ', lastName: 'Sharipov ', pseudo: 'electronic ', level: 328 , origin: 'RU ', sex: 1}
]
