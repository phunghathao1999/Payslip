import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
 
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
