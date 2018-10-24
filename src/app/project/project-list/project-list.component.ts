import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';


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
    this.dialog.open(NewProjectComponent);
  }


}
