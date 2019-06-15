import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../../_services/tournament.service';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {ActivatedRoute} from '@angular/router';

declare var $: any;

@Component({
    templateUrl: 'bracket.component.html',
    styleUrls: ['bracket.component.scss']
})
export class BracketComponent implements OnInit {

    constructor(private tournamentService: TournamentService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        const bracketService = this.route.paramMap.pipe(
            switchMap(params => {
                return this.tournamentService.getBracketByTournament(+params.get('tournamentId'));
            })
        );

        bracketService.subscribe(data => {
            $('#bracket').bracket({
                init: data.bracket,
                decorator: {
                    edit: this.edit_fn,
                    render: this.render_fn
                },
                teamWidth: 100
            });
        });
    }

    edit_fn(container, data, doneCb) {
    }

    render_fn(container, data, score, state) {
        switch (state) {
            case 'empty-bye':
                container.append('Pas d\'équipe');
                return;
            case 'empty-tbd':
                container.append('À venir');
                return;
            case 'entry-no-score':
            case 'entry-default-win':
            case 'entry-complete':
                container.append(data);
                return;
        }
    }
}
