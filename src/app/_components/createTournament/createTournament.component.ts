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
import {Match} from '../../_models/Match';
import {UserService} from '../../_services/user.service';

import * as moment from 'moment';

@Component({
    templateUrl: './createTournament.component.html',
    styleUrls: ['./createTournament.component.scss']
})

export class CreateTournamentComponent implements OnInit {
    createTournamentForm: FormGroup;
    arenaList: any[];
    teamList: any[];
    userList: any[];
    user: User;
    isArenaDataLoaded: boolean = false;
    isTeamDataLoaded: boolean = false;
    isUserDataLoaded: boolean = false;
    submitted = false;
    error = '';
    min: Date;

    constructor(private arenaService: ArenaService, private teamService: TeamService, private tournamentService: TournamentService, private loginService: LoginService, private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {
        this.user = loginService.currentUserValue;

        moment.locale('fr');
        this.min = moment(new Date()).add(1,'days').toDate();

        arenaService.getAllArena(this.user).pipe(first()).subscribe(data => {
            this.arenaList = data.arenas;
            this.isArenaDataLoaded = true;
        });

        teamService.getAllTeam(this.user).pipe(first()).subscribe(data => {
            this.teamList = data.teams;
            this.isTeamDataLoaded = true;
        });

        userService.getAllUser(this.user).pipe(first()).subscribe(data => {
            this.userList = data.users;
            this.isUserDataLoaded = true;
        });
    }

    ngOnInit() {
        this.createTournamentForm = this.formBuilder.group({
            name: ['', Validators.required],
            cashprize: [''],
            sponsor: [''],
            dt1: ['', Validators.required],
            dt2: ['', Validators.required],
            dt3: ['', Validators.required],
            dt4: ['', Validators.required],
            dt5: ['', Validators.required],
            dt6: ['', Validators.required],
            dt7: ['', Validators.required],
            dt8: ['', Validators.required],
            map1: ['', Validators.required],
            map2: ['', Validators.required],
            map3: ['', Validators.required],
            map4: ['', Validators.required],
            map5: ['', Validators.required],
            map6: ['', Validators.required],
            map7: ['', Validators.required],
            map8: ['', Validators.required]
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

                const tournament = new Tournament(selectedArena, this.f.name.value, this.f.cashprize.value, this.f.sponsor.value);

                const match1 = {
                    'team1': matchTeamList[0],
                    'team2': matchTeamList[1],
                    'match': new Match(this.f.dt1.value, this.f.map1.value, false, false, 8.1, tournament, this.getUserByName(this.f.referee1.value))
                };

                const match2 = {
                    'team1': matchTeamList[2],
                    'team2': matchTeamList[3],
                    'match': new Match(this.f.dt2.value, this.f.map2.value, false, false, 8.2, tournament, this.getUserByName(this.f.referee2.value))
                };

                const match3 = {
                    'team1': matchTeamList[4],
                    'team2': matchTeamList[5],
                    'match': new Match(this.f.dt3.value, this.f.map3.value, false, false, 8.3, tournament, this.getUserByName(this.f.referee3.value))
                };

                const match4 = {
                    'team1': matchTeamList[6],
                    'team2': matchTeamList[7],
                    'match': new Match(this.f.dt4.value, this.f.map4.value, false, false, 8.4, tournament, this.getUserByName(this.f.referee4.value))
                };

                const match5 = {
                    'team1': matchTeamList[8],
                    'team2': matchTeamList[9],
                    'match': new Match(this.f.dt5.value, this.f.map5.value, false, false, 8.5, tournament, this.getUserByName(this.f.referee5.value))
                };

                const match6 = {
                    'team1': matchTeamList[10],
                    'team2': matchTeamList[11],
                    'match': new Match(this.f.dt6.value, this.f.map6.value, false, false, 8.6, tournament, this.getUserByName(this.f.referee6.value))
                };

                const match7 = {
                    'team1': matchTeamList[12],
                    'team2': matchTeamList[13],
                    'match': new Match(this.f.dt7.value, this.f.map7.value, false, false, 8.7, tournament, this.getUserByName(this.f.referee7.value))
                };

                const match8 = {
                    'team1': matchTeamList[14],
                    'team2': matchTeamList[15],
                    'match': new Match(this.f.dt8.value, this.f.map8.value, false, false, 8.8, tournament, this.getUserByName(this.f.referee8.value))
                };

                let matchList = new Array<any>();
                matchList.push(match1);
                matchList.push(match2);
                matchList.push(match3);
                matchList.push(match4);
                matchList.push(match5);
                matchList.push(match6);
                matchList.push(match7);
                matchList.push(match8);

                this.tournamentService.createTournament(this.user, tournament, matchList).pipe(first()).subscribe(data => {
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

        this.teamList.forEach(function(team) {
            if (teamName === team.name) {
                finalTeam = team;
            }
        });

        return finalTeam;
    }

    getUserByName(username: string): User {
        let finalUser = null;

        this.userList.forEach(function(userElement) {
            if (username === userElement.username) {
                finalUser = userElement;
            }
        });

        return finalUser;
    }
}
