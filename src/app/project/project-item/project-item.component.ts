import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.styl']
})
export class ProjectItemComponent implements OnInit {

  @Input () item: object;

  // Can not prefixed with on, if you use onInvite
  @Output() inviteClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onInviteClick() {
    this.inviteClick.emit();
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }
}
