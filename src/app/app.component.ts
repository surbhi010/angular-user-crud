import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { User } from './interfaces/user';
import { UserApiService } from './user-api.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'assessment2';
  users: Array<User>;
  formDialog;
  alertMessage: string;
  constructor(private userApiS: UserApiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.userApiS.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  UpdateUser(user) {
    this.formDialog = this.dialog.open(UserFormComponent, {
      data: user,
    });
    this.formDialog.afterClosed().subscribe(result => {
     this._snackBar.open(result, '', {
       duration: 2000
     });
    })
  }

  addUser() {
    this.formDialog = this.dialog.open(UserFormComponent, {
      
    });
    this.formDialog.afterClosed().subscribe(result => {
     this._snackBar.open(result, '', {
       duration: 2000
     });
    })
  }
}
