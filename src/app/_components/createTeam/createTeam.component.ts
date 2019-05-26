import {Component, OnInit} from '@angular/core';
import { CreateTeamService } from '../../_services/createTeam.service';
import { first } from 'rxjs/operators';
import { User } from '../../_models/User';
import { LoginService } from '../../_services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './createTeam.component.html',
  styleUrls: ['./createTeam.component.scss']
})

export class CreateTeamComponent implements OnInit {
  loginForm: FormGroup;
  dataList: string;
  user: User;
  isDataLoaded: boolean;
  submitted = false;
  error = '';

  constructor(private createTeamService: CreateTeamService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.user = loginService.currentUserValue;

    createTeamService.getAllPlayer(this.user).pipe(first()).subscribe(data => {
        this.dataList = data.players;
        this.isDataLoaded = true;
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      origin: ['', Validators.required],
      dt1: ['', Validators.required],
      dt2: ['', Validators.required],
      dt3: ['', Validators.required],
      dt4: ['', Validators.required],
      dt5: ['', Validators.required]
    });
    this.user = this.loginService.currentUserValue;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.error = '';
    this.submitted = true;

    // stop here if form is invalid
    if (!this.loginForm.invalid) {

    }
  }
}
