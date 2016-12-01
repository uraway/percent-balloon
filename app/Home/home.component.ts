import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'Home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {

  constructor(private router: Router) { }
}

