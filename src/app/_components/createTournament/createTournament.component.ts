import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {User} from '../../_models/User';
import {LoginService} from '../../_services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {TournamentService} from '../../_services/tournament.service';
import {Tournament} from '../../_models/Tournament';
import {ArenaService} from '../../_services/arena.service';
import {TeamService} from '../../_services/team.service';
import {Team} from '../../_models/Team';

@Component({
    templateUrl: './createTournament.component.html',
    styleUrls: ['./createTournament.component.scss']
})

export class CreateTournamentComponent implements OnInit {
    createTournamentForm: FormGroup;
    arenaList: any[];
    teamList: any[];
    user: User;
    isArenaDataLoaded: boolean;
    isTeamDataLoaded: boolean;
    submitted = false;
    error = '';

    constructor(private arenaService: ArenaService, private teamService: TeamService, private tournamentService: TournamentService, private loginService: LoginService, private formBuilder: FormBuilder, private toastr: ToastrService) {
        this.user = loginService.currentUserValue;

        arenaService.getAllArena(this.user).pipe(first()).subscribe(data => {
            this.arenaList = data.arenas;
            this.isArenaDataLoaded = true;
        });

        teamService.getAllTeam(this.user).pipe(first()).subscribe(data => {
            this.teamList = data.teams;
            this.isTeamDataLoaded = true;
        });
    }

    ngOnInit() {
        this.createTournamentForm = this.formBuilder.group({
            name: ['', Validators.required],
            cashprize: [''],
            sponsor: ['']
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.createTournamentForm.controls;
    }

    onSubmit() {
        this.error = '';
        this.submitted = true;

        // stop here if form is invalid
        if (!this.createTournamentForm.invalid) {
            let matchTeamList = new Array<Team>();
            matchTeamList.push(this.getTeamByName(this.f.match1_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match1_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match2_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match2_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match3_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match3_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match4_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match4_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match5_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match5_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match6_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match6_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match7_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match7_2.value));
            matchTeamList.push(this.getTeamByName(this.f.match8_1.value));
            matchTeamList.push(this.getTeamByName(this.f.match8_2.value));

            let teamNameList = new Array<String>();

            matchTeamList.forEach(function (team) {
                teamNameList.push(team.name);
            });

            if (new Set(teamNameList).size === 16) {
                const arenaName = this.f.arenaName.value;
                let selectedArena;

                this.arenaList.forEach(function (arena) {
                    if (arena.name === arenaName) {
                        selectedArena = arena;
                    }
                });

                this.tournamentService.createTournament(this.user, new Tournament(selectedArena, this.f.name.value, this.f.cashprize.value, this.f.sponsor.value), matchTeamList).pipe(first()).subscribe(data => {
                    this.toastr.success(data.message, 'Succès', {
                        timeOut: 3000,
                        positionClass: 'toast-bottom-right'
                    });
                    this.error = '';
                }, error => {
                    this.error = error;
                });
            } else {
                this.error = 'Les équipes ne peuvent pas être sélectionné plus d\'une fois';
            }
        }
    }

    getTeamByName(teamName: string): Team {
        let finalTeam = null;

        this.teamList.forEach(function (team) {
            if (teamName === team.name) {
                finalTeam = team;
            }
        });

        return finalTeam;
    }
}
