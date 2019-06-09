import { Component, Input, OnInit  } from '@angular/core';
import { Team } from '../../_models/Team';
import { PusherService } from '../pusher/pusher.service';


@Component({
    selector: 'encounter-component',
    templateUrl: './encounter.component.html',
    styleUrls: ['./encounter.component.scss']
})

export class EncounterComponent implements OnInit{

    
    title = 'Rencontre';
    team1 = Teams[0];
    team2 = Teams[1];
    @Input() team1Score : number;
    @Input() team2Score : number;

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
            this.team1Score ++;
            this.pusherService.like(0, this.team1Score);
        }
        else{
            this.team2Score ++;
            this.pusherService.like(1, this.team2Score);
        }
    }
}

export const Teams: Team[] = [
    {name: "Boston Lions", origin: "Boston", playerList: null},
    {name: "Chicago Bulls", origin: "Chicago", playerList: null}
  ];