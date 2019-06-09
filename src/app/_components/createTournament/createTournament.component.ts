import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../_models/User';
import { LoginService } from '../../_services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Arena } from '../../_models/Arena';
import { CreateArenaService } from '../../_services/createArena.service';
import {CreateTournamentService} from '../../_services/createTournament.service';
import {Tournament} from '../../_models/Tournament';

@Component({
  templateUrl: './createTournament.component.html',
  styleUrls: ['./createTournament.component.scss']
})

export class CreateTournamentComponent implements OnInit {
  createTournamentForm: FormGroup;
  dataList: any[];
  user: User;
  isDataLoaded: boolean;
  submitted = false;
  error = '';

  constructor(private createTournamentService: CreateTournamentService, private loginService: LoginService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.user = loginService.currentUserValue;

    createTournamentService.getAllArena(this.user).pipe(first()).subscribe(data => {
      this.dataList = data.arenas;
      this.isDataLoaded = true;
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
  get f() { return this.createTournamentForm.controls; }

  onSubmit() {
    this.error = '';
    this.submitted = true;

    // stop here if form is invalid
    if (!this.createTournamentForm.invalid) {
      const arenaName = this.f.arenaName.value;
      let selectedArena;

      this.dataList.forEach(function (arena) {
        if (arena.name === arenaName) {
          selectedArena = arena;
        }
      });

      this.createTournamentService.createTournament(this.user, new Tournament(selectedArena, this.f.name.value, this.f.cashprize.value, this.f.sponsor.value)).pipe(first()).subscribe(data => {
        this.toastr.success(data.message, 'Succès', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.error = "";
      }, error => {
        this.error = error;
      });
    }
  }
}
