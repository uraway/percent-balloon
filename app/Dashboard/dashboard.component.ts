import { Component, OnInit } from '@angular/core';

import { User } from '../User/user';
import { UserService } from '../User/user.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.componet.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = this.sortByScore(users));
  }

  sortByScore(users: User[]): User[] {
    users.sort((a: any, b: any) => {
      if (a.score > b.score) return -1;
      if (b.score > a.score) return 1;
      return 0;
    })
    return users;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
