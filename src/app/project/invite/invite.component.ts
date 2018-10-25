import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.styl']
})
export class InviteComponent implements OnInit {

  options = [
    {
      id: 1,
      name: 'zhangsan'
    }, {
      id: 2,
      name: 'wangwu'
    }, {
      id: 3,
      name: 'lisi'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }

}
