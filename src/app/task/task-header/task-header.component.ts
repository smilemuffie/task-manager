import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.styl']
})
export class TaskHeaderComponent implements OnInit {

  @Input() header: string;
  @Output() newTaskClick = new EventEmitter<void>();
  @Output() moveAllClick = new EventEmitter<void>();
  @Output() deleteAllClick = new EventEmitter<void>();
  @Output() editListClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTaskClick.emit();
  }

  onMoveAllClick() {
    this.moveAllClick.emit();
  }

  onDeleteAllClick() {
    this.deleteAllClick.emit();
  }

  onEditListClick() {
    this.editListClick.emit();
  }

}
