import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../_models/User';
import { LoginService } from '../../_services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Arena } from '../../_models/Arena';
import { CreateArenaService } from '../../_services/createArena.service';

@Component({
  templateUrl: './createArena.component.html',
  styleUrls: ['./createArena.component.scss']
})

export class CreateArenaComponent implements OnInit {
  createArenaForm: FormGroup;
  user: User;
  submitted = false;
  error = '';

  constructor(private createArenaService: CreateArenaService, private loginService: LoginService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.user = loginService.currentUserValue;
  }

  ngOnInit() {
    this.createArenaForm = this.formBuilder.group({
      town: ['', Validators.required],
      arenaName: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createArenaForm.controls; }

  onSubmit() {
    this.error = '';
    this.submitted = true;

    // stop here if form is invalid
    if (!this.createArenaForm.invalid) {
      this.createArenaService.createArena(this.user, new Arena(this.f.town.value, this.f.arenaName.value)).pipe(first()).subscribe(data => {
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
