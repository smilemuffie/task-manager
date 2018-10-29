import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animations/router.anim';
import { listAnimation } from '../../animations/list.anim';



@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.styl'],
  animations: [
    slideToRight,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projectList = [
    {id: 1, name: '1', desc: 'hello', coverImg: 'assets/img/covers/0.jpg'},
    {id: 2, name: '2', desc: 'world', coverImg: 'assets/img/covers/1.jpg' }
  ];
  constructor(public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新建项目'}});
    dialogRef.afterClosed().subscribe(res => {
      this.projectList = [...this.projectList,
        { id: 3, name: '一个新项目', desc: '这是一个心向明月', coverImg: 'assets/img/covers/0.jpg'},
        { id: 4, name: '又一个新项目', desc: '这是一个心向明月', coverImg: 'assets/img/covers/1.jpg' },
      ];
      this.cd.markForCheck();
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: '编辑项目' } });
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: '删除项目', content: '确认删除本项目？' } });
    dialogRef.afterClosed().subscribe(res => {
      this.projectList = this.projectList.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
}
