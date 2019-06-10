import { Component, Input, OnInit  } from '@angular/core';
import { PusherService } from '../pusher/pusher.service';
import { Round } from 'src/app/_models/Round';
import { GetAllRoundService } from '../../_services/getAllRoundService';
import { first } from 'rxjs/internal/operators/first';
import { ToastrService } from 'ngx-toastr';
import {LoginService} from '../../_services/login.service';
import {User} from '../../_models/User';


@Component({
    selector: 'encounter-component',
    templateUrl: './encounter.component.html',
    styleUrls: ['./encounter.component.scss']
})

export class EncounterComponent implements OnInit{
    team1Score : number;
    team2Score : number;
    @Input() idMatch: number;
    @Input() team1Id: number;
    @Input() team2Id: number;
    error = '';
    user: User;
    isOrg : boolean = false;

    constructor(private pusherService: PusherService, private getAllRoundService: GetAllRoundService, private toastr: ToastrService, private loginService: LoginService){}

    ngOnInit(){
        this.user = this.loginService.currentUserValue;

        this.getAllRoundService.getAllRoundsMatch(this.idMatch).pipe(first()).subscribe(data => {
            this.team1Score = 0;
            this.team2Score = 0;
            for(var i = 0; i < data.teamScore[0].length; i++){
                if(data.teamScore[0][i].idteam == this.team1Id && data.teamScore[0][i].iswinner == true){
                    this.team1Score++;
                }
                else if(data.teamScore[0][i].idteam == this.team2Id && data.teamScore[0][i].iswinner == true){
                    this.team2Score++;
                }
            }

            this.toastr.success(data.message, 'Succès', {
                timeOut: 3000,
                positionClass: 'toast-bottom-right'
            });
                this.error = "";
            }, error => {
                this.error = error;
            });
            
        this.pusherService.channel.bind('new-like', data => {
            console.log(data);
            // if(data.teamNumber == "0"){
            if(data.idwinningteam == this.team1Id){
                this.team1Score = data.teamScore;
            }
            // else{
            else if (data.idwinningteam == this.team2Id){
                this.team2Score = data.teamScore;
            }
        })
        this.isOrga();
    }
    
    gotRound(team: number){
        const round = new Round(this.idMatch, null, +this.team1Score + +this.team2Score + 1, new Date(Date.now()), new Date(Date.now()), true, true);
        const reverseRound = new Round(this.idMatch, null, +this.team1Score + +this.team2Score + 1, new Date(Date.now()), new Date(Date.now()), false, false);

        if(team == 0){
            round.idteam = this.team1Id;
            reverseRound.idteam = this.team2Id;
            
            const rounds = [round, reverseRound];
            this.team1Score ++;
            this.pusherService.like(0, this.team1Score, rounds, this.team1Id);
        }
        else{
            round.idteam = this.team2Id;
            reverseRound.idteam = this.team1Id;

            const rounds = [round, reverseRound];
            this.team2Score ++;
            this.pusherService.like(1, this.team2Score, rounds, this.team2Id);
        }
    }

    isOrga(){
        if(this.user.isorganizer == true && this.user.token != null){
            this.isOrg = true;
        }
    }
}