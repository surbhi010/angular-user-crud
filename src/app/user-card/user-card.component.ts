import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { User } from '../interfaces/user';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() editUser: EventEmitter<User> = new EventEmitter<User>();
  constructor(private userApiS: UserApiService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openDialog() {
    this.editUser.emit(this.user);
  }

  deleteUser() {
    this.userApiS.deleteUser(this.user.id).subscribe(
      (res: any) => {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 10000
        });
      },
      (error) => {
        this._snackBar.open("Something went wrong", '', {
          duration: 10000
        });
      }
    );
  }
}
