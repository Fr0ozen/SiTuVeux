import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TournamentService} from '../../_services/tournament.service';
import {first} from 'rxjs/operators';
import {LoginService} from '../../_services/login.service';
import {User} from '../../_models/User';
declare var $:any;

@Component({
    templateUrl: './tournament.component.html',
    styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent {
    user: User;

    constructor(private tournamentService: TournamentService, private loginService: LoginService) {
        this.user = loginService.currentUserValue;

        tournamentService.getAllTournament().subscribe(allTournament => {
            for (let i = 0; i < allTournament.tournaments.length; i++) {
                tournamentService.getBracketByTournament(allTournament.tournaments[i]).pipe(first()).subscribe(data => {
                    $('#bracketTest').bracket({
                        init: data.bracket,
                        decorator: {
                            edit: this.edit_fn,
                            render: this.render_fn
                        },
                        teamWidth: 100
                    });
                });
            }
        });
    }

    edit_fn(container, data, doneCb) {}

    render_fn(container, data, score, state) {
        switch(state) {
            case "empty-bye":
                container.append('Pas d\'équipe');
                return;
            case "empty-tbd":
                container.append("À venir")
                return;
            case "entry-no-score":
            case "entry-default-win":
            case "entry-complete":
                container.append(data)
                return;
        }
    }
}
