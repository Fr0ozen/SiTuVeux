/* tslint:disable:max-line-length */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {first} from 'rxjs/internal/operators/first';
import {CreatePlayerService} from '../../_services/createPlayer.service';
import {User} from '../../_models/User';
import {LoginService} from '../../_services/login.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './createPlayer.component.html',
  styleUrls: ['./createPlayer.component.scss']
})

export class CreatePlayerComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error = '';
  user: User;

  constructor(private formBuilder: FormBuilder, private router: Router, private createPlayerService: CreatePlayerService,
              private loginService: LoginService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      pseudo: ['', Validators.required],
      level: ['', Validators.required],
      origin: ['', Validators.required],
      sex: ['0', Validators.required]
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
      this.createPlayerService.createPlayer(this.user, this.f.fname.value, this.f.lname.value, this.f.pseudo.value, this.f.level.value, this.f.origin.value, parseInt(this.f.sex.value, 10)).pipe(first()).subscribe(data => {
        this.toastr.success(data.message, 'Succès', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      }, error => {
        this.error = error;
      });
    }
  }
}
