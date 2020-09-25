import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: string;
  logout() {
    this.accountService.logout().subscribe(success => {
      window.location.reload();
    })
  }

  getUser() {
    if(this.accountService.getJwtUser()) {
      this.user = this.accountService.getJwtUser();
    }
  }

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

}
