import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    templateUrl: './dateRenderer.component.html',
    styleUrls: ['./dateRenderer.component.scss']
})

export class DateRendererComponent {
    private params: any;

    agInit(params: any): void {
        moment.locale('fr');
        params.value = moment(params.value).format('L') + ' à ' + moment(params.value).format('LT');
        this.params = params;
    }
}
