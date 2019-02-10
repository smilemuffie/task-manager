import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnim } from '../../animations/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.styl'],
  animations: [
    itemAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  @Input() task: any;
  @Input() avatar: string;
  @Output() taskClick = new EventEmitter<void>();

  widerPriority = 'in';

  // 宿主的动画使用HostBinding, 组件的动画直接绑定
  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in';
  }

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
