import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.styl']
})
export class TaskItemComponent implements OnInit {

  @Input() item: any;
  @Input() avatar: string;

  constructor() { }

  ngOnInit() {
    console.log(this.item);
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

}