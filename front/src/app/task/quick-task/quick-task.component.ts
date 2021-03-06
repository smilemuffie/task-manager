import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.styl']
})
export class QuickTaskComponent implements OnInit {
  desc: string;

  @Output() quickTask = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('keyup.enter')
  sendQuickTask() {
    // if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
    //   return;
    // }
    this.quickTask.emit(this.desc);

    this.desc = '';
  }

}
