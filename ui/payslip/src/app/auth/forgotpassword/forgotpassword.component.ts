import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from './../../shared/Validator/passwordValidator';
import { AccountService } from 'src/app/Service/account.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  formEmail: FormGroup;
  formverifyEmail: FormGroup;
  formCrPass: FormGroup;
  hide = true;
  hide1 = true;
  Email: boolean = false;
  token: boolean = false;

  verifyEmail(stepper: MatStepper) {
    const email = this.email.value;
    this.accountService.checkMail(email)
      .subscribe(result => {
        if(result) {
          this.Email = false;
          stepper.next();
        } else {
          this.Email = true;
        }
      })
  }

  verifyToken(stepper: MatStepper) {
    const token = this.verifytoken.value;
    this.accountService.verifyToken(token)
      .subscribe(result => {
        if(result) {
          this.token = false;
          stepper.next();
        } else {
          this.token = true;
        }
      })
  }

  createPassword(stepper: MatStepper) {
    const password = this.configpassword.value;
    this.accountService.createPasswork(password)
      .subscribe(result => {
        if(result) {
          stepper.next();
        }
      })
  }

  constructor(
    private _formBuilder: FormBuilder,
    private accountService: AccountService,
    ) {}

  ngOnInit() {
    this.formEmail = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.formverifyEmail = this._formBuilder.group({
      verifytoken: ['', Validators.required],
    });
    this.formCrPass = this._formBuilder.group({
      password: ['', Validators.required],
      configpassword: ['', Validators.required],
    }, { validators: passwordValidator });
  }

  get email() {
    return this.formEmail.get('email');
  }
  get verifytoken() {
    return this.formverifyEmail.get('verifytoken');
  }
  get password() {
    return this.formCrPass.get('password');
  }
  get configpassword() {
    return this.formCrPass.get('configpassword');
  }

}
