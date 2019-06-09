import { Component } from '@angular/core';
import {HomeService} from '../../_services/home.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  constructor(private homeService: HomeService) {}

  test() {
    this.homeService.test().subscribe(data => {
<<<<<<< HEAD
=======
      //console.log(data);
>>>>>>> ae07bf8a53530068c4628c063e1d572432abf496
    });
  }
}
