import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
    templateUrl: './cashprizeRenderer.component.html',
    styleUrls: ['./cashprizeRenderer.component.scss']
})

export class CashprizeRendererComponent {
    private params: any;

    agInit(params: any): void {
        if (params.value === null) {
            params.value = 'Aucune récompense';
        }
        this.params = params;
    }
}
