import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'manageMatch.component.html',
    styleUrls: ['manageMatch.component.scss']
})

export class ManageMatchComponent implements OnInit {
    idmatch: number;

    ngOnInit() {
        // this.hero$ = this.route.paramMap.pipe(
        //   switchMap((params: ParamMap) =>
        //     this.service.getHero(params.get('id')))
        // );
      }
}
