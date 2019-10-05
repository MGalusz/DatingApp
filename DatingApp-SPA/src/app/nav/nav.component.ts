import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(private authService: AuthService
    , private alertifyService: AlertifyService
    , private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('Logged in sucessfully');
    }, error => {
      this.alertifyService.error('Failed to login');
    }, () => {
      this.router.navigate(['/members']);
    });
   console.log(this.model);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('logOut');
    this.router.navigate(['/home']);
  }
}
