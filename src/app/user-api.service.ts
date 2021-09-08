import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './interfaces/user';


@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  users: Array<User> = [];

  usersSubject: Subject<Array<User>>;

  constructor( private httpClient: HttpClient) {
    this.usersSubject = new Subject<Array<User>>();
  }

  private loadUsers() {
    this.httpClient.get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .subscribe((response) => {
        this.users = response;
        this.usersSubject.next(this.users);
      });
  }
  
  getUsers(): Observable<Array<User>> {
    this.loadUsers();
    return this.usersSubject;
  }

  addUser(param) {
    return this.httpClient
      .post<User>("https://jsonplaceholder.typicode.com/users", param)
      .pipe(map(response => {
        this.users.push(response);
        this.usersSubject.next(this.users);
        return response;
      }));
  }

  updateUser(userID, param) {
    return this.httpClient
      .put<User>("https://jsonplaceholder.typicode.com/users/"+ userID, param)
      .pipe(map(response => {
        this.users = this.users.map(user => {
          if (user.id === response.id) {
            return response;
          }
          return user;
        });
        this.usersSubject.next(this.users);
        return response;
      }));
  }

  deleteUser(userID){
    return this.httpClient.delete("https://jsonplaceholder.typicode.com/users/"+ userID)
      .pipe(map(response => {
        this.users = this.users.filter(user => user.id != userID);
        this.usersSubject.next(this.users);
        return response;
      }));
  }
}
