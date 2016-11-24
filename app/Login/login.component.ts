import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {

  constructor(private router: Router) { }

  login(event: any, userName: string) {
    event.preventDefault();
    localStorage.setItem('userName', userName);
    this.router.navigate(['dashboard']);
    console.log('login as ' + userName);
  }
}

