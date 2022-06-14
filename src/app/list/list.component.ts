import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user-model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users!: User[];
  mostrar!: boolean;
  showId!: number;
  edit!: boolean;
  updateForm!: FormGroup;
  userUpdate!: User;
  idEditUser!: string;

  constructor(private userService: UserService) {
    this.mostrar = false;
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
    this.userUpdate = {
      name: '',
      surname: '',
      email: '',
      password: '',
      id: '',
    };
  }

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  showUser(id: number) {
    this.showId = id;
  }

  deleteUser(id2: string) {
    let confirmation: boolean;
    confirmation = confirm('¿Está seguro de eliminar este usuario?');

    if (confirmation) {
      this.userService.deleteUser(id2);
      this.users = this.users.filter((user) => user.id !== id2);
    }
  }

  editUser(id: string) {
    this.edit = true;
    this.idEditUser = id;
  }
  closeEdit() {
    this.edit = false;
  }

  updateUser() {
    this.edit = true;
    this.userUpdate.name = this.updateForm.get('name')?.value;
    this.userUpdate.surname = this.updateForm.get('surname')?.value;
    this.userUpdate.email = this.updateForm.get('email')?.value;
    this.userUpdate.password = this.updateForm.get('password')?.value;
    this.userUpdate.id = this.idEditUser;
    this.userService.updateUser(this.idEditUser, this.userUpdate);
    this.users = this.users.map((user) => {
      if (user.id === this.idEditUser) {
        user = this.userUpdate;
      }
      return user;
    });
    this.updateForm.reset();
  }
}
