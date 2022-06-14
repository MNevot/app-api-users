import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './singup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  SignupRequestPayload!: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.SignupRequestPayload = {
      name: '',
      surname: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.SignupRequestPayload.name = this.signupForm.get('name')?.value;
    this.SignupRequestPayload.surname = this.signupForm.get('surname')?.value;
    this.SignupRequestPayload.email = this.signupForm.get('email')?.value;
    this.SignupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.SignupRequestPayload).subscribe((data) => {
      this.toastr.success('Registro completado');
      this.router.navigate(['/login']), { quaryParams: { registered: 'true' } };
    });
  }
}
