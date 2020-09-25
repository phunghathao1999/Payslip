import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/Service/file.service';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-dialogavatar',
  templateUrl: './dialogavatar.component.html',
  styleUrls: ['./dialogavatar.component.scss']
})
export class DialogavatarComponent implements OnInit {
  @ViewChild('file') file
  username = this.accountService.getJwtUser();
  idEmployee: number = 1;
  img =  'http://localhost:8080/api/employees/avatar/' + this.username;

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: File = this.file.nativeElement.files;
    if(files) {
      this.fileService.saveavatar(this.idEmployee, files)
      .subscribe();
    }
  }
  
  constructor(
    private fileService: FileService,
    private accountService: AccountService,
  ) { }
  
  ngOnInit(): void {
    console.log(this.img)
  }

}
