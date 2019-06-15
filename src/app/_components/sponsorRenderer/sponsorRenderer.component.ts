import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    templateUrl: './sponsorRenderer.component.html',
    styleUrls: ['./sponsorRenderer.component.scss']
})

export class SponsorRendererComponent {
    private params: any;

    agInit(params: any): void {
        if (params.value === null) {
            params.value = 'Aucun sponsor';
        }
        this.params = params;
    }
}
