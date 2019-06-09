import { Component, Input, OnInit  } from '@angular/core';
import { Team } from '../../_models/Team';
import { PusherService } from '../pusher/pusher.service';
import { Round } from 'src/app/_models/Round';


@Component({
    selector: 'encounter-component',
    templateUrl: './encounter.component.html',
    styleUrls: ['./encounter.component.scss']
})

export class EncounterComponent implements OnInit{
    @Input() team1Score : number;
    @Input() team2Score : number;
    @Input() idMatch: number;

    constructor(private pusherService: PusherService){
        
    }

    ngOnInit(){
        this.pusherService.channel.bind('new-like', data => {
            if(data.teamNumber == "0"){
                this.team1Score = data.teamScore;
            }
            else{
                this.team2Score = data.teamScore;
            }
        })
    }
    

    gotRound(team: number){
        console.log("number:"+team.toString());
        if(team == 0){
            const round = new Round(this.idMatch, 1, this.team1Score + this.team2Score + 1, new Date(Date.now()), new Date(Date.now()), true, true);
            this.team1Score ++;
            this.pusherService.like(0, this.team1Score);
        }
        else{
            const round = new Round(this.idMatch, 1, this.team1Score + this.team2Score + 1, new Date(Date.now()), new Date(Date.now()), true, true);
            this.team2Score ++;
            this.pusherService.like(1, this.team2Score);
        }
    }
}

export const Teams: Team[] = [
    {name: "Boston Lions", origin: "Boston", playerList: null},
    {name: "Chicago Bulls", origin: "Chicago", playerList: null}
  ];