import {Component, Input, OnInit} from '@angular/core';
import {PusherService} from '../../_services/pusher.service';
import {RoundService} from '../../_services/round.service';
import {first} from 'rxjs/internal/operators/first';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../../_services/login.service';
import {User} from '../../_models/User';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchService} from '../../_services/match.service';
import {Match} from '../../_models/Match';
import {Round} from '../../_models/Round';
import {Team} from '../../_models/Team';
import {UserService} from '../../_services/user.service';

@Component({
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss']
})

export class MatchComponent implements OnInit {
    matchId: number;
    team1Id: number;
    team2Id: number;
    team1Name: string;
    team2Name: string;
    team1Score: number = 0;
    team2Score: number = 0;
    currentRound: number;
    dataLoaded: boolean = false;
    isReferee: boolean = false;
    user: User;
    match: Match;

    constructor(private pusherService: PusherService, private roundService: RoundService, private toastr: ToastrService,
                private loginService: LoginService, private matchService: MatchService, private route: ActivatedRoute,
                private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.user = this.loginService.currentUserValue;

        const matchService = this.route.paramMap.pipe(
            switchMap(params => {
                this.matchId = +params.get('matchId');
                return this.roundService.getMatchScore(this.user, this.matchId);
            })
        );

        matchService.pipe(first()).subscribe(data => {
            if (data[0].length > 0) {
                this.team1Id = data[0][0].id;
                this.team1Name = data[0][0].name;
                this.team1Score = data[0][0].score;

                this.team2Id = data[0][1].id;
                this.team2Name = data[0][1].name;
                this.team2Score = data[0][1].score;

                if (this.team1Score === null) {
                    this.team1Score = 0;
                }

                if (this.team2Score === null) {
                    this.team2Score = 0;
                }

                this.currentRound = this.team1Score + this.team2Score + 1;
                this.dataLoaded = true;
            } else {
                this.router.navigate(['/tournaments']);
            }
        });

        this.userService.isReferee(this.user, this.matchId).pipe(first()).subscribe(data => {
            this.isReferee = data[0].isReferee;
        });

        this.updateMatch();

        this.pusherService.channel.bind('updating-score', data => {
            if (data.idwinningteam === this.team1Id) {
                this.team1Score = data.teamScore;
            } else if (data.idwinningteam === this.team2Id) {
                this.team2Score = data.teamScore;
            }
            this.currentRound = this.team1Score + this.team2Score + 1;
            this.updateMatch();
        });
    }

    updateMatch() {
        this.matchService.getMatchById(this.matchId).pipe(first()).subscribe(data => {
            this.match = data.match[0];
        });
    }

    gotRound(team: number) {
        const round = new Round(this.match, new Team(null, null, null), this.currentRound, new Date(Date.now()), new Date(Date.now()), true, true);
        const reverseRound = new Round(this.match, new Team(null, null, null), this.currentRound, new Date(Date.now()), new Date(Date.now()), false, false);

        if (team === 0) {
            round.team.id = this.team1Id;
            reverseRound.team.id = this.team2Id;

            const rounds = [round, reverseRound];
            this.pusherService.addRound(this.user, 0, this.team1Score + 1, rounds, this.team1Id, this.matchId).pipe(first()).subscribe(data => {
                this.toastr.success(data.message, 'Succès', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right'
                });
            });
        } else {
            round.team.id = this.team2Id;
            reverseRound.team.id = this.team1Id;

            const rounds = [round, reverseRound];
            this.pusherService.addRound(this.user, 1, this.team2Score + 1, rounds, this.team2Id, this.matchId).pipe(first()).subscribe(data => {
                this.toastr.success(data.message, 'Succès', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right'
                });
            });
        }
    }
}
