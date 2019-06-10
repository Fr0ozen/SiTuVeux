import {Component, OnInit} from '@angular/core';
import { CreateTeamService } from '../../_services/createTeam.service';
import { first } from 'rxjs/operators';
import { User } from '../../_models/User';
import { LoginService } from '../../_services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import {Team} from '../../_models/Team';
import {Player} from '../../_models/Player';

@Component({
  templateUrl: './createTeam.component.html',
  styleUrls: ['./createTeam.component.scss']
})

export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  dataList: any[];
  user: User;
  isDataLoaded: boolean;
  submitted = false;
  error = '';

  constructor(private createTeamService: CreateTeamService, private loginService: LoginService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.user = loginService.currentUserValue;

    createTeamService.getAllPlayer(this.user).pipe(first()).subscribe(data => {
        this.dataList = data.players;
        this.isDataLoaded = true;
    });
  }

  ngOnInit() {
    this.createTeamForm = this.formBuilder.group({
      name: ['', Validators.required],
      origin: ['', Validators.required],
      dt1: ['', Validators.required],
      dt2: ['', Validators.required],
      dt3: ['', Validators.required],
      dt4: ['', Validators.required],
      dt5: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createTeamForm.controls; }

  onSubmit() {
    this.error = '';
    this.submitted = true;

    // stop here if form is invalid
    if (!this.createTeamForm.invalid) {
      let playerList = new Array<Player>();
      playerList.push(this.createPlayerFromData(this.f.capitainePseudonyme.value, this.f.dt1.value, true));
      playerList.push(this.createPlayerFromData(this.f.joueur1Pseudonyme.value, this.f.dt2.value, false));
      playerList.push(this.createPlayerFromData(this.f.joueur2Pseudonyme.value, this.f.dt3.value, false));
      playerList.push(this.createPlayerFromData(this.f.joueur3Pseudonyme.value, this.f.dt4.value, false));
      playerList.push(this.createPlayerFromData(this.f.joueur4Pseudonyme.value, this.f.dt5.value, false));

      let playerPseudoList = new Array<String>();

      playerList.forEach(function(player) {
        playerPseudoList.push(player.pseudo);
      });

      if (new Set(playerPseudoList).size === 5) {
        this.createTeamService.createTeam(this.user, new Team(this.f.name.value, this.f.origin.value, Array.from(playerList.values()))).pipe(first()).subscribe(data => {
          this.toastr.success(data.message, 'Succès', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.error = "";
        }, error => {
          this.error = error;
        });
      } else {
        this.error = "Les joueurs ne peuvent pas être sélectionné plus de deux fois";
      }
    }
  }

  createPlayerFromData(playerName: string, joiningDate: Date, isCapitain: boolean): Player {
    let finalPlayer = null;
    this.dataList.forEach(function(player) {
      if (playerName === player.pseudo) {
        finalPlayer = new Player(player.fname, player.lname, player.pseudo, player.level, player.origin, player.sex, joiningDate, isCapitain);
      }
    });

    return finalPlayer;
  }
}
