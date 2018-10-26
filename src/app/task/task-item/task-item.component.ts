import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.styl']
})
export class TaskItemComponent implements OnInit {

  @Input() task: any;
  @Input() avatar: string;
  @Output() taskClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    console.log(this.task);
    this.avatar = this.task.owner ? this.task.owner.avatar : 'unassigned';
  }

  onTaskClick() {
    this.taskClick.emit();
  }

  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }

}
