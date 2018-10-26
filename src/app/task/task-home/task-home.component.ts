import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';

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
          desc: '任务2：完成l 好多 好多 好多 好多 好多',
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

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '新建任务列表'} });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, { data: {lists: this.lists} });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, { data: { title: '修改任务', task: task } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除任务列表', content: '确认删除本任务列表？' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, { data: { title: '更改列表名称' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

}
