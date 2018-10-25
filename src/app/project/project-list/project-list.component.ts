import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.styl']
})
export class ProjectListComponent implements OnInit {
  projectList = [
    { name: '1', desc: 'hello', coverImg: 'assets/img/covers/0.jpg'},
    { name: '2', desc: 'world', coverImg: 'assets/img/covers/1.jpg' }
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: 'This is from project list'});
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
    dialogRef.afterClosed().subscribe(res => console.log(res));
  }
}
