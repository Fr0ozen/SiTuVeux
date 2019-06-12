/* tslint:disable:max-line-length */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/internal/operators/first';
import {PlayerService} from '../../_services/player.service';
import {User} from '../../_models/User';
import {LoginService} from '../../_services/login.service';

import {ToastrService} from 'ngx-toastr';
import {Player} from '../../_models/Player';

@Component({
    templateUrl: './createPlayer.component.html',
    styleUrls: ['./createPlayer.component.scss']
})

export class CreatePlayerComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    error = '';
    user: User;

    constructor(private formBuilder: FormBuilder, private router: Router, private playerService: PlayerService,
                private loginService: LoginService, private toastr: ToastrService) {
    }

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
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.error = '';
        this.submitted = true;

        // stop here if form is invalid
        if (!this.loginForm.invalid) {
            const player = new Player(this.f.fname.value, this.f.lname.value, this.f.pseudo.value, this.f.level.value, this.f.origin.value, parseInt(this.f.sex.value, 10));
            this.playerService.createPlayer(this.user, player).pipe(first()).subscribe(data => {
                this.toastr.success(data.message, 'Succès', {
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right'
                });
                this.error = '';
            }, error => {
                this.error = error;
            });
        }
    }
}
