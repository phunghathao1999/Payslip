import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from './../../Service/account.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Account } from './../../Models/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  submittedLogin = true;

  login(){
    const username = this.email.value;
    const password = this.password.value;
    const user: Account = { username, password } as Account;
    this.AccountService.login(user).subscribe(success => {
      if(success) {
        const redirectUrl = '/admin/timework';

        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        this.router.navigate([redirectUrl], navigationExtras);
      }
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private AccountService: AccountService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }
  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }

}
