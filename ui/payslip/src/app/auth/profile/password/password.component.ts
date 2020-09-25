import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/Service/account.service';
import { Account } from './../../../Models/account';
import { DialogsuccessComponent } from '../dialogsuccess/dialogsuccess.component';
import { MatDialog } from '@angular/material/dialog';
import { passwordValidator } from 'src/app/shared/Validator/passwordValidator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  formCrPassword: FormGroup;
  hideoldpassword = true;
  checkpassword = false;
  hide = true;
  hide1 = true;

  createPassword() {
    const password = this.password.value;
    const account: Account = { password } as Account;
    this.accountService.createPasswork(account)
      .subscribe(result => {
        if(result) {
          this.dialog.open(DialogsuccessComponent);
        }
      })
  }

  checkPassword() {
    const password = this.oldpassword.value;
    this.accountService.checkPassword(password)
      .subscribe(result => result ? this.checkpassword = false : this.checkpassword = true);
  }

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.formCrPassword = new FormGroup({
      oldpassword: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      configpassword: new FormControl(null, Validators.required),
    }, { validators: passwordValidator });
  }

  get oldpassword() {
    return this.formCrPassword.get('oldpassword');
  }
  get password() {
    return this.formCrPassword.get('password');
  }
  get configpassword() {
    return this.formCrPassword.get('configpassword');
  } 

}
