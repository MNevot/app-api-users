import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, observable } from 'rxjs';
import { User } from './user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http
      .get('http://51.38.51.187:5050/api/v1/users')
      .pipe(map((res: any) => res.items));
  }

  deleteUser(id: string) {
    console.log('delete user servicio');
    return this.http
      .delete('http://51.38.51.187:5050/api/v1/users/' + id)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
  updateUser(id: string, user: User) {
    console.log('update user servicio');
    return this.http
      .put('http://51.38.51.187:5050/api/v1/users/' + id, user)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
