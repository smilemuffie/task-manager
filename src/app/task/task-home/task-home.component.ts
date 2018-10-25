import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.styl']
})
export class TaskHomeComponent implements OnInit {

  lists = [
    {
      id: 1,
      name: '待办',
      completed: true,
      tasks: [
        {
          id: 1,
          desc: '任务1：买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: true,
          priority: 3,
        }, {
          id: 2,
          desc: '任务2：完成',
          owner: {
            id: 1,
            name: '张4',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          priority: 3
        }
      ]
    },
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务1：买咖啡',
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date(),
          completed: false,
          priority: 1
        }, {
          id: 2,
          desc: '任务2：完成',
          owner: {
            id: 1,
            name: '张4',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          completed: true,
          priority: 1
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
