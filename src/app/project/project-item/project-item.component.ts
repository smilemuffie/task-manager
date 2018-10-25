import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.styl']
})
export class ProjectItemComponent implements OnInit {

  @Input () item: object;

  // Can not prefixed with on, if you use onInvite
  @Output() invite = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onInviteClick() {
    this.invite.emit();
  }
}
