import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../interfaces/user';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
    private userApiS: UserApiService,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : '', Validators.required),
      phone: new FormControl(this.data ? this.data.phone : '', Validators.required),
      email: new FormControl(this.data ? this.data.email : '', Validators.required),
      website: new FormControl(this.data ? this.data.website : '')
    });
  }
  updateUser() {
    const params = {
      name: this.userForm.value.name,
      phone: this.userForm.value.phone,
      email: this.userForm.value.email,
      website: this.userForm.value.website ? this.userForm.value.website : ''
    }
    if (this.data) {
      this.userApiS.updateUser(this.data.id, params).subscribe(
        (res: any) => {
          console.log(res);
          this.dialogRef.close('User updated sucessfully');

        },
        (error) => {
          console.log(error);
          this.dialogRef.close('Something went wrong. ' + (error.message || ''));
        }
      );
    } else {
      this.userApiS.addUser(params).subscribe(
        (res: any) => {
          console.log(res);
          this.dialogRef.close('User added sucessfully');

        },
        (error) => {
          console.log(error);
          this.dialogRef.close('Something went wrong. ' + (error.message || ''));
        }
      );
    }
  }
}
