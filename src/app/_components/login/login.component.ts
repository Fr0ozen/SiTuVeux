﻿import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {LoginService} from '../../_services/login.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    error = '';

    constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (!this.loginForm.invalid) {
            this.loginService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
                data => {
                    this.router.navigate(['/tournaments']);
                },
                error => {
                    this.error = error;
                }
            );
        }
    }
}
