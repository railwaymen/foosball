import { Component } from '@angular/core';
import { UsersProvider } from '../../providers/users/users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersProvider]
})
export class HomePage {
  public subPage: string;
  public content: any;
  constructor() {
    this.subPage = 'Players'
  }

  onMenuChange(selected) {
    this.subPage = selected
  }

  get pages() {
    return ['Players', 'Tournaments'];
  }

}