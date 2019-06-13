import { Component, Input, OnInit } from '@angular/core';
import { PusherService } from '../../_services/pusher.service';
import { Round } from 'src/app/_models/Round';
import { RoundService } from '../../_services/round.service';
import { first } from 'rxjs/internal/operators/first';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../_services/login.service';
import { User } from '../../_models/User';

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss']
})

export class MatchComponent implements OnInit {
    @Input()
    idMatch: number;

    team1Id: number;
    team2Id: number;
    team1Score: number = 0;
    team2Score: number = 0;
    error = '';
    user: User;
    isOrg: boolean = false;
    isAllRoundLoaded: boolean = false;

    constructor(private pusherService: PusherService, private getAllRoundService: RoundService, private toastr: ToastrService, private loginService: LoginService) {
    }

    ngOnInit() {
        this.user = this.loginService.currentUserValue;

        this.getAllRoundService.getAllRoundsMatch(this.user, this.idMatch).pipe(first()).subscribe(data => {
            console.log(data.teamScore[0]);

            this.team1Id = data.teamScore[0][0].idteam;
            this.team1Score = data.teamScore[0][0].scoreTeam;

            this.team2Id = data.teamScore[0][1].idteam;
            this.team2Score = data.teamScore[0][1].scoreTeam;

            this.toastr.success(data.message, 'Succès', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
            });

            this.error = '';
            this.isAllRoundLoaded = true;
        }, error => {
            this.error = error;
        });

        this.pusherService.channel.bind('new-like', data => {
            if (data.idwinningteam === this.team1Id) {
                this.team1Score = data.teamScore;
            } else if (data.idwinningteam === this.team2Id) {
                this.team2Score = data.teamScore;
            }
        });
        this.isOrga();
    }

    gotRound(team: number) {
        const round = new Round(this.idMatch, null, +this.team1Score + this.team2Score + 1, new Date(Date.now()), new Date(Date.now()), true, true);
        const reverseRound = new Round(this.idMatch, null, +this.team1Score + this.team2Score + 1, new Date(Date.now()), new Date(Date.now()), false, false);

        if (team === 0) {
            round.idteam = this.team1Id;
            reverseRound.idteam = this.team2Id;

            const rounds = [round, reverseRound];
            this.pusherService.like(this.user, 0, this.team1Score + 1, rounds, this.team1Id);
        } else {
            round.idteam = this.team2Id;
            reverseRound.idteam = this.team1Id;

            const rounds = [round, reverseRound];
            this.pusherService.like(this.user, 1, this.team2Score + 1, rounds, this.team2Id);
        }
    }

    isOrga() {
        if (this.user.isorganizer === true && this.user.token !== null) {
            this.isOrg = true;
        }
    }
}
