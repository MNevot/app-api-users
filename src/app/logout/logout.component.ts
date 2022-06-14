import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    
    
  }

  ngOnInit(): void {
    console.log("entra on init");
    this.authService.logout();
    this.router.navigate(['/sign-up']);

  }

}
